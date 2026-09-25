import { JoinLayout as JoinLayoutProvider } from "@/app/components/Layouts";

export default function JoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <JoinLayoutProvider>{children}</JoinLayoutProvider>;
}
