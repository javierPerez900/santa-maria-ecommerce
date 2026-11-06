import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo-santa-maria.jpeg"
        alt="santa-maria-logo"
        width={256}
        height={171}
        style={{ height: 85.33, width: "auto" }}
        loading="eager"
      />
    </Link>
  );
}
