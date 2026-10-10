import Link from "next/link";
import type { ChangeEventHandler } from "react";

// The required, unticked-by-default agreement box on sign-up and on the agreement screen for existing accounts.
// Controlled when `checked` is given, otherwise the form reads it as `agree`.
export default function ConsentField({ id = "agree", checked, onChange }: { id?: string; checked?: boolean; onChange?: ChangeEventHandler<HTMLInputElement> }) {
  return (
    <label className="consent-check" htmlFor={id}>
      <input id={id} name="agree" type="checkbox" required checked={checked} onChange={onChange} />
      <span>
        I am the parent or guardian of the learners I add, and I have read and agree to the{" "}
        <Link className="text-link" href="/privacy" target="_blank" rel="noopener">Privacy policy</Link> and{" "}
        <Link className="text-link" href="/terms" target="_blank" rel="noopener">Terms of use</Link>.
        <span className="sr-only"> Both open in a new tab.</span>
      </span>
    </label>
  );
}
