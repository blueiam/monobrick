import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Art" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
];

type Props = {
  transparent?: boolean;
};

export function SiteHeader({ transparent }: Props) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b border-white/5 transition-colors ${
        transparent ? "bg-transparent backdrop-blur-xl" : "bg-stone-900/70 backdrop-blur-2xl"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <Image
            src="/logo.svg"
            alt="Monobrick logo"
            width={120}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wide text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-amber-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}


