import Footer from "@/components/footer";
import Header from "@/components/header";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    title: "Managing Your Budget Effectively",
    description: "Learn the best practices to keep your finances in check and achieve financial freedom.",
    date: "March 18, 2025",
  },
  {
    title: "Top 5 Expense Tracking Apps",
    description: "A comparison of the best tools to monitor and analyze your spending habits.",
    date: "March 10, 2025",
  },
  {
    title: "How to Save Money Smartly",
    description: "Simple and effective strategies to grow your savings effortlessly.",
    date: "March 5, 2025",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] p-4 sm:p-6">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 max-w-3xl mx-auto py-12 px-6 text-[var(--foreground)]">
            <h1 className="text-3xl font-bold text-center mb-8 title-name">Our Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post, index) => (
                <Card key={index} className="p-6 bg-[var(--card-bg)] shadow-md rounded-lg">
                    <CardHeader>
                    <CardTitle className="text-xl font-semibold title-name">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-[var(--foreground)]">{post.description}</p>
                    <p className="text-sm text-[var(--gray)] mt-2">Published on {post.date}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </main>
        
        {/* Footer */}
        <Footer />
    </div>
  );
}
