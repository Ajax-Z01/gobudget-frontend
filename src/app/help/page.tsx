import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const HelpPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] p-4 sm:p-6">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto py-12 text-center">
        <h1 className="text-4xl font-bold title-name">Help & Support</h1>
        <p className="mt-4 text-lg text-[var(--foreground)]">
          Find answers to common questions and get support for GoBudget.
        </p>

        <div className="mt-10 space-y-8 text-left">
          <div className="p-6 bg-[var(--card-bg)] shadow-md rounded-lg">
            <h2 className="text-xl font-semibold title-name">How do I create an account?</h2>
            <p className="mt-2 text-[var(--foreground)]">
              To create an account, go to the <Link href="/register" className="text-[var(--secondary)] hover:underline">Sign Up</Link> page and fill in your details.
            </p>
          </div>

          <div className="p-6 bg-[var(--card-bg)] shadow-md rounded-lg">
            <h2 className="text-xl font-semibold title-name">How do I reset my password?</h2>
            <p className="mt-2 text-[var(--foreground)]">
              If you forgot your password, go to the <Link href="/forgot-password" className="text-[var(--secondary)] hover:underline">Forgot Password</Link> page and follow the instructions.
            </p>
          </div>

          <div className="p-6 bg-[var(--card-bg)] shadow-md rounded-lg">
            <h2 className="text-xl font-semibold title-name">How can I contact support?</h2>
            <p className="mt-2 text-[var(--foreground)]">
              You can reach our support team via email at <span className="font-medium text-[var(--secondary)]">support@gobudget.com</span>.
            </p>
          </div>

          <div className="p-6 bg-[var(--card-bg)] shadow-md rounded-lg">
            <h2 className="text-xl font-semibold title-name">Where can I find tutorials?</h2>
            <p className="mt-2 text-[var(--foreground)]">
              Visit our <Link href="/blog" className="text-[var(--secondary)] hover:underline">Blog</Link> for guides and tips on using GoBudget.
            </p>
          </div>
        </div>

        <p className="mt-10 text-[var(--foreground)]">
          Need further assistance? <Link href="/contact" className="text-[var(--secondary)] hover:underline">Contact us</Link>.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HelpPage;
