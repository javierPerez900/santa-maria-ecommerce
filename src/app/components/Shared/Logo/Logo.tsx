import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo-texto.png"
        alt="santa-maria-logo"
        width={200}
        height={50}
        style={{ height: 50, width: "auto" }}
        loading="eager"
      />
    </Link>
  );
}
