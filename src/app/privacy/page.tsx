import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] p-4 sm:p-6">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto py-12 px-6 text-[var(--foreground)]">
        <h1 className="text-3xl font-bold mb-6 text-center title-name">Privacy Policy</h1>
        <p className="mb-4 px-4 text-center">Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use GoBudget.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 title-name">1. Information We Collect</h2>
        <p className="mb-4">We collect personal information such as your name, email address, and transaction details to provide a personalized experience.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 title-name">2. How We Use Your Information</h2>
        <p className="mb-4">We use your data to enhance user experience, improve features, and ensure security within the GoBudget platform.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 title-name">3. Data Security</h2>
        <p className="mb-4">We implement strict security measures to protect your data from unauthorized access and misuse.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 title-name">4. Third-Party Services</h2>
        <p className="mb-4">We may use third-party services for analytics and functionality improvements. These services have their own privacy policies.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 title-name">5. Your Rights</h2>
        <p className="mb-4">You have the right to request access, modification, or deletion of your personal data stored within GoBudget.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2 title-name">6. Updates to This Policy</h2>
        <p className="mb-4">We may update this Privacy Policy periodically. Any changes will be reflected on this page.</p>
        
        <p className="mt-6 px-4 text-center">If you have any questions about this Privacy Policy, please contact us at <span className="font-semibold text-[var(--secondary)]">support@gobudget.com</span>.</p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}