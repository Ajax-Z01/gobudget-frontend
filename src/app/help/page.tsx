import React from "react";
import Link from "next/link";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">Help & Support</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 text-center">
          Find answers to common questions and get support for GoBudget.
        </p>

        <div className="mt-10 space-y-8">
          <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How do I create an account?</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              To create an account, go to the <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Sign Up</Link> page and fill in your details.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How do I reset my password?</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              If you forgot your password, go to the <Link href="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">Forgot Password</Link> page and follow the instructions.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How can I contact support?</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              You can reach our support team via email at <span className="font-medium text-blue-600 dark:text-blue-400">support@gobudget.com</span>.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Where can I find tutorials?</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Visit our <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">Blog</Link> for guides and tips on using GoBudget.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-gray-700 dark:text-gray-300">
          Need further assistance? <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</Link>.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
