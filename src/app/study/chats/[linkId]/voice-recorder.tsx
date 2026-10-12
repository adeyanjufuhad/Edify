"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Mic, Send, Stop, Trash } from "@/components/icons";
import type { Message } from "./chat-room";

type Props = { linkId: string; maxSeconds: number; onSent: (message: Message) => void; onCancel: () => void };
type Phase = "idle" | "requesting" | "recording" | "recorded" | "sending";

// The best format this browser can record: Chrome and Android give webm, iPhone Safari gives mp4, Firefox gives ogg.
const noSubscribe = () => () => {};
const FORMATS = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];

// Record in the browser, listen back, then choose to send or throw it away. Nothing leaves the device until Send.
// Opened from the mic button, so it starts recording straight away; Cancel goes back to typing.
export default function VoiceRecorder({ linkId, maxSeconds, onSent, onCancel }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{ url: string; blob: Blob; seconds: number } | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const requestId = useRef(0);
  // The browser decides what it can record, so this is only known after the page has loaded.
  const supported = useSyncExternalStore(noSubscribe, () => typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia, () => false);

  const release = useCallback(() => {
    clearInterval(timer.current);
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
  }, []);

  // Invalidate pending microphone requests too: permission can arrive after Cancel or navigation.
  const cancelRecording = useCallback(() => {
    requestId.current += 1;
    const rec = recorder.current;
    recorder.current = null;
    if (rec) {
      rec.onstop = null;
      rec.ondataavailable = null;
      rec.onerror = null;
      if (rec.state !== "inactive") rec.stop();
    }
    release();
  }, [release]);
  useEffect(() => cancelRecording, [cancelRecording]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview.url); }, [preview]);

  const stop = useCallback(() => { if (recorder.current?.state === "recording") recorder.current.stop(); }, []);

  async function start() {
    if (typeof MediaRecorder === "undefined" || !navigator.mediaDevices?.getUserMedia) return;
    const request = ++requestId.current;
    setError("");
    setPhase("requesting");
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (request !== requestId.current) {
        media.getTracks().forEach((track) => track.stop());
        return;
      }
      stream.current = media;
      const type = FORMATS.find((format) => MediaRecorder.isTypeSupported(format));
      const rec = new MediaRecorder(media, type ? { mimeType: type, audioBitsPerSecond: 24000 } : { audioBitsPerSecond: 24000 });
      chunks.current = [];
      rec.ondataavailable = (event) => { if (event.data.size) chunks.current.push(event.data); };
      rec.onstop = () => {
        if (request !== requestId.current) return;
        release();
        const taken = Math.min(maxSeconds, Math.max(1, Math.round((Date.now() - started.current) / 1000)));
        const blob = new Blob(chunks.current, { type: rec.mimeType || type || "audio/webm" });
        if (!blob.size) {
          setError("No audio was recorded. Try recording again.");
          setPhase("idle");
          return;
        }
        setPreview({ url: URL.createObjectURL(blob), blob, seconds: taken });
        setPhase("recorded");
      };
      rec.onerror = () => {
        if (request !== requestId.current) return;
        cancelRecording();
        setError("Recording stopped unexpectedly. Try recording again.");
        setPhase("idle");
      };
      recorder.current = rec;
      started.current = Date.now();
      setSeconds(0);
      rec.start();
      setPhase("recording");
      timer.current = setInterval(() => {
        const elapsed = Math.round((Date.now() - started.current) / 1000);
        setSeconds(elapsed);
        if (elapsed >= maxSeconds) stop();
      }, 250);
    } catch {
      if (request !== requestId.current) return;
      cancelRecording();
      setError("We couldn’t use your microphone. Allow microphone access in your browser, then try again.");
      setPhase("idle");
    }
  }

  const startRef = useRef(start);
  useEffect(() => { startRef.current = start; });
  useEffect(() => { void startRef.current(); }, []);

  function discard() {
    setPreview(null);
    setPhase("idle");
    setSeconds(0);
  }

  async function send() {
    if (!preview) return;
    setPhase("sending");
    setError("");
    try {
      const response = await fetch(`/api/social/chat/${linkId}/voice?seconds=${preview.seconds}`, { method: "POST", headers: { "Content-Type": preview.blob.type || "audio/webm" }, body: preview.blob });
      const data = (await response.json().catch(() => ({}))) as { message?: Message; error?: string };
      if (!response.ok || !data.message) { setError(data.error ?? "Your voice note could not be sent."); setPhase("recorded"); return; }
      onSent(data.message);
      discard();
    } catch {
      setError("Your voice note could not be sent. Check your connection and try again.");
      setPhase("recorded");
    }
  }

  if (!supported) return <div className="voice-bar"><p className="chat-hint">Voice recording isn’t available in this browser. Try a newer browser with microphone access.</p><button type="button" className="text-button small" onClick={onCancel}>Back to typing</button></div>;

  return (
    <div className="voice-bar" aria-label="Voice note">
      {phase === "idle" && <button type="button" className="pill-outline small" onClick={() => void start()}><Mic size={16} /> Record again</button>}
      {phase !== "sending" && <button type="button" className="text-button small" onClick={() => { cancelRecording(); onCancel(); }}>Cancel</button>}
      {phase === "requesting" && <p role="status">Waiting for microphone access…</p>}
      {phase === "recording" && <>
        <span className="rec-dot" aria-hidden="true" />
        <span className="rec-time" role="timer" aria-label={`Recording, ${seconds} seconds of ${maxSeconds}`}>{seconds}s / {maxSeconds}s</span>
        <button type="button" className="pill-button small" onClick={stop}><Stop size={16} /> Stop</button>
      </>}
      {(phase === "recorded" || phase === "sending") && preview && <>
        <audio controls src={preview.url} aria-label="Listen to your voice note before sending" />
        <button type="button" className="pill-button small" disabled={phase === "sending"} onClick={() => void send()}><Send size={16} /> {phase === "sending" ? "Sending…" : "Send"}</button>
        <button type="button" className="text-button small" disabled={phase === "sending"} onClick={discard}><Trash size={14} /> Throw away</button>
      </>}
      <p>Up to {maxSeconds} seconds. Your parents can listen to voice notes. Don’t share personal details.</p>
      {error && <p role="alert" className="form-error">{error}</p>}
    </div>
  );
}
