import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact DevByte - Developer Tool Suggestions & Partnerships",
  description:
    "Get in touch with the DevByte team. Suggest new developer tools, report bugs, share feedback on Flutter and Dart generators, or explore partnership opportunities.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
