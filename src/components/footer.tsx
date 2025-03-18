import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <Link href="/">
            <Image
              src="/gobudget-logo.svg"
              alt="GoBudget Logo"
              width={30}
              height={30}
              style={{ width: "auto", height: "40px" }}
              className="logo-homepage"
            />
          </Link>
          <span className="text-sm font-medium text-[var(--foreground)]">
            © 2025 <Link href="/" className="text-[var(--primary)] hover:text-[var(--primary-hover)]">GoBudget</Link>. All rights reserved.
          </span>
        </div>
        
        <div className="flex gap-6">
          <Link href="/help" className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">
            Help
          </Link>
          <Link href="/privacy" className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}