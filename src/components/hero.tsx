import Link from "next/link";

export default function Hero() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-12 sm:py-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[var(--primary)] mb-6">
        Take Control of Your <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Finances</span>
      </h1>
      <p className="text-lg sm:text-xl text-[var(--foreground)] mb-8 max-w-2xl">
        GoBudget helps you track expenses, set goals, and build better financial habits. Start your journey to financial freedom today.
      </p>
      
      <div className="flex gap-4 flex-col sm:flex-row mb-12">
        <Link href="/register" className="bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-[var(--text-white)] font-medium rounded-full px-6 py-3 transition-colors">
          Create Free Account
        </Link>
        <Link href="/features" className="bg-transparent border border-[var(--logo-color)] hover:bg-[var(--bg-invert)] text-[var(--primary)] font-semibold rounded-full px-6 py-3 transition-colors">
          Learn More
        </Link>
      </div>
    </main>
  );
}