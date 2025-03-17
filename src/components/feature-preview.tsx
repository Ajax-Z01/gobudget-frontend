export default function FeaturePreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {features.map((feature, index) => (
        <div key={index} className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[var(--secondary)] flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">{feature.title}</h3>
          <p className="text-[var(--foreground)]">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

const features = [
    {
      title: "Expense Tracking",
      description: "Easily log and categorize your expenses to understand your spending habits.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--text-white)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: "Budgeting Tools",
      description: "Create personalized budgets and get alerts when you're approaching your limits.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--text-white)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      title: "Financial Insights",
      description: "Get visual reports and analysis to help you make better financial decisions.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--text-white)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    }
  ];
  