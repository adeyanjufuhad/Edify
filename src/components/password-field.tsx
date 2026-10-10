"use client";

import { useState, type ChangeEvent } from "react";

type PasswordFieldProps = {
  id: string;
  name: string;
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
  placeholder?: string;
  minLength?: number;
};

export default function PasswordField({ id, name, label = "password", value, onChange, autoComplete, placeholder, minLength }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input id={id} name={name} type={visible ? "text" : "password"} autoComplete={autoComplete} minLength={minLength} required value={value} onChange={onChange} placeholder={placeholder} spellCheck={false} />
      <button className="password-toggle" type="button" aria-label={`${visible ? "Hide" : "Show"} ${label}`} aria-pressed={visible} aria-controls={id} onClick={() => setVisible((current) => !current)}>
        {visible ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 3l18 18" />
            <path d="M10.6 5.2A10.8 10.8 0 0 1 12 5c5 0 8.8 4.1 10 7a11.7 11.7 0 0 1-3.1 4.5" />
            <path d="M6.1 6.1A11.7 11.7 0 0 0 2 12c1.2 2.9 5 7 10 7 1.7 0 3.2-.5 4.5-1.2" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
