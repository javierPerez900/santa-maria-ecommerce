"use client";
import { initAmplify } from "@/utils";

initAmplify();

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
