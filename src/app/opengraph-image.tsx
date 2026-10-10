/* eslint-disable @next/next/no-img-element -- ImageResponse renders embedded assets, not browser images. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Edify — Study smart. Ace your exams. Weekly notes and exam-style practice for secondary school students in Nigeria, JSS1–SS3.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fredoka = readFile(join(process.cwd(), "src/assets/fonts/Fredoka-Bold.ttf"));
const nunito = readFile(join(process.cwd(), "src/assets/fonts/Nunito-SemiBold.ttf"));
const mark = readFile(join(process.cwd(), "src/app/icon.svg"));

export default async function Image() {
  const [headingFont, bodyFont, logo] = await Promise.all([fredoka, nunito, mark]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fdf0d5", color: "#003049", padding: "48px 64px", fontFamily: "Nunito" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={`data:image/svg+xml;base64,${logo.toString("base64")}`} width={100} height={100} alt="" />
            <div style={{ display: "flex", fontFamily: "Fredoka", fontWeight: 700, fontSize: 76, letterSpacing: -3 }}>
              ed
              <span style={{ display: "flex", position: "relative" }}>
                ı
                <svg width="26" height="26" viewBox="0 0 24 24" style={{ position: "absolute", top: 7, left: -3 }}>
                  <path d="M12 1.5l3.1 6.6 7.2.9-5.3 5 1.3 7.1L12 17.6 5.7 21.1 7 14l-5.3-5 7.2-.9z" fill="#c1121f" />
                </svg>
              </span>
              fy
            </div>
          </div>
          <div style={{ display: "flex", background: "#003049", color: "#fdf0d5", borderRadius: 24, padding: "16px 26px", fontSize: 26 }}>JSS1–SS3</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 42, fontFamily: "Fredoka", fontWeight: 700, fontSize: 86, lineHeight: 1.05, letterSpacing: -2 }}>
          <span>Study smart.</span>
          <span style={{ color: "#c1121f" }}>Ace your exams.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 26 }}>Weekly notes. Quick summaries. Exam-style practice.</div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "auto", paddingTop: 22, borderTop: "2px solid #669bbc", fontSize: 25 }}>For secondary school students in Nigeria.</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fredoka", data: headingFont, weight: 700, style: "normal" },
        { name: "Nunito", data: bodyFont, weight: 600, style: "normal" },
      ],
    },
  );
}
