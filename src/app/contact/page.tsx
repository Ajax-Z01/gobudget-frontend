import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] p-4 sm:p-6">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 max-w-3xl mx-auto py-12 px-6 text-[var(--foreground)]">
            <h1 className="text-3xl font-bold text-center mb-8 title-name">Contact Us</h1>
            <Card className="max-w-lg mx-auto p-6">
                <CardHeader>
                <CardTitle className="text-xl font-semibold title-name">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                <form className="space-y-4">
                    <Input type="text" placeholder="Your Name" className="w-full" required />
                    <Input type="email" placeholder="Your Email" className="w-full" required />
                    <Textarea placeholder="Your Message" className="w-full" rows={4} required />
                    <Button type="submit" className="w-full">Send Message</Button>
                </form>
                </CardContent>
            </Card>
        </main>
        
        {/* Footer */}
        <Footer />
    </div>
  );
}
