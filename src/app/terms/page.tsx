import Header from "@/components/header";
import Footer from "@/components/footer";

const TermsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] p-4 sm:p-6">
      {/* Header */}
      <Header />

      <main className="flex-1 max-w-3xl mx-auto py-12 px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-6">Terms of Service</h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p className="mt-2">Welcome to GoBudget! These terms govern your use of our application and services.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
          <p className="mt-2">By using GoBudget, you agree to provide accurate information and comply with all applicable laws.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">3. Privacy and Data Security</h2>
          <p className="mt-2">
            Your data privacy is important to us. Please review our {" "}
            <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a> for details.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">4. Changes to Terms</h2>
          <p className="mt-2">We may update these Terms of Service from time to time. Continued use of GoBudget means you accept the changes.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">5. Contact Information</h2>
          <p className="mt-2">
            If you have any questions, feel free to contact us at {" "}
            <a href="mailto:support@gobudget.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@gobudget.com</a>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsPage;
