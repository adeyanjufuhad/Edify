import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edify — Study with clarity",
  description: "A thoughtful study space for SS1 learners at Brainfield School.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
