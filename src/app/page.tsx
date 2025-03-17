import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturePreview from "@/components/feature-preview";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] p-4 sm:p-6">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-12 sm:py-20">
        <Hero />
        
        {/* Features Preview */}
        <FeaturePreview />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}