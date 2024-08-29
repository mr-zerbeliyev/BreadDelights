import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <nav className="flex justify-around">
        <Image
          src="/images/sezar.jpg"
          alt="Bread logo"
          className="cursor-pointer h-[960px] object-cover object-center"
          width={1920}
          height={700}
        />
        
      </nav>
    </div>
  );
}
