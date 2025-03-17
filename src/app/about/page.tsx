import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">About GoBudget</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          GoBudget is a simple and efficient personal finance management application
          designed to help you track your income, expenses, and savings with ease.
          Our goal is to provide you with the tools to take control of your finances
          and make better financial decisions.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          With GoBudget, you can categorize expenses, set budgets, view financial
          reports, and analyze spending trends. Whether you're saving for a big goal
          or just want to manage your daily expenses, GoBudget has got you covered.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Built using modern web technologies, GoBudget ensures a fast, secure, and
          seamless user experience. We are continuously improving our platform to
          better serve our users.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;