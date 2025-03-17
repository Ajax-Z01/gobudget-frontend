import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full py-2 px-2">
      <div className="flex items-center gap-2">
        <Image
          src="/gobudget-logo.svg"
          alt="GoBudget Logo"
          width={40}
          height={40}
          style={{ width: "auto", height: "70px" }}
          className="logo-sidebar"
        />
      </div>
      
      <nav className="hidden sm:flex gap-6">
        <Link href="/features" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Features</Link>
        <Link href="/help" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Help</Link>
        <Link href="/about" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">About</Link>
      </nav>
      <div className="flex gap-3">
        <Link href="/login" className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] px-4 py-1 hidden sm:block">Sign In</Link>
        <Link href="/register" className="bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white px-4 py-2 rounded-full text-sm transition-colors">Get Started</Link>
      </div>
    </header>
  );
}