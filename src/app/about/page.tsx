import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] p-4 sm:p-6">
      {/* Header */}
      <Header />

      {/* About Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-12 sm:py-20">
        <h1 className="text-4xl font-bold mb-6 title-name">About GoBudget</h1>
        <p className="text-lg text-[var(--foreground)] max-w-2xl">
          GoBudget is a simple and efficient personal finance management application
          designed to help you track your income, expenses, and savings with ease.
          Our goal is to provide you with the tools to take control of your finances
          and make better financial decisions.
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl">
          With GoBudget, you can categorize expenses, set budgets, view financial
          reports, and analyze spending trends. Whether you&apos;re saving for a big goal
          or just want to manage your daily expenses, GoBudget has got you covered.
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Built using modern web technologies, GoBudget ensures a fast, secure, and
          seamless user experience. We are continuously improving our platform to
          better serve our users.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
