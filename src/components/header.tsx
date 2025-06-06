import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full py-2 px-2">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/gobudget-logo.svg"
            alt="GoBudget Logo"
            width={40}
            height={40}
            style={{ width: "auto", height: "70px" }}
            className="logo-homepage cursor-pointer"
          />
        </Link>
      </div>
      
      <nav className="hidden sm:flex gap-6">
        <Link href="/features" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Features</Link>
        <Link href="/blog" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Blog</Link>
        <Link href="/about" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">About</Link>
        <Link href="/help" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Help</Link>
        <Link href="/contact" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Contact</Link>
      </nav>
      <div className="flex gap-3">
        <Link href="/login" className="bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white px-4 py-2 rounded-full text-sm transition-colors">Get Started</Link>
      </div>
    </header>
  );
}
