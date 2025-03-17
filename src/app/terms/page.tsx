"use client";

import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          Terms of Service
        </h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">1. Introduction</h2>
          <p className="text-gray-700 dark:text-gray-400 mt-2">
            Welcome to GoBudget! These terms govern your use of our application and services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">2. User Responsibilities</h2>
          <p className="text-gray-700 dark:text-gray-400 mt-2">
            By using GoBudget, you agree to provide accurate information and comply with all applicable laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">3. Privacy and Data Security</h2>
          <p className="text-gray-700 dark:text-gray-400 mt-2">
            Your data privacy is important to us. Please review our <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a> for details.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">4. Changes to Terms</h2>
          <p className="text-gray-700 dark:text-gray-400 mt-2">
            We may update these Terms of Service from time to time. Continued use of GoBudget means you accept the changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">5. Contact Information</h2>
          <p className="text-gray-700 dark:text-gray-400 mt-2">
            If you have any questions, feel free to contact us at <a href="mailto:support@gobudget.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@gobudget.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
