'use client';
import { Link } from "lucide-react";
import { useState } from "react";

const FAQPage = () => {
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 0,
      category: "Account",
      question: "How do I reset my password?",
      answer:
        "You can reset your password from profile settings by entering your current and new password securely.",
    },
    {
      id: 1,
      category: "Security",
      question: "What are the password requirements?",
      answer:
        "Minimum 8 characters, including uppercase, lowercase, number, and special character.",
    },
    {
      id: 2,
      category: "Privacy",
      question: "Is my data secure?",
      answer:
        "Yes, all data is encrypted and securely stored. We never share personal information without consent.",
    },
  ];

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-300">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Find answers to the most common questions about your account and usage
        </p>
      </div>

      {/* FAQ Container */}
      <div className="max-w-4xl mx-auto space-y-4">

        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-md hover:shadow-lg transition"
          >

            {/* Question */}
            <button
              onClick={() => toggleAccordion(faq.id)}
              className={`w-full flex justify-between items-center px-6 py-5 text-left transition ${expandedId === faq.id
                  ? "bg-indigo-100 dark:bg-slate-800"
                  : "hover:bg-gray-50 dark:hover:bg-slate-800/60"
                }`}
            >
              <div>
                <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  {faq.category}
                </span>

                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {faq.question}
                </p>
              </div>

              <span
                className={`text-xl transition-transform duration-300 text-gray-500 dark:text-gray-300 ${expandedId === faq.id ? "rotate-180" : ""
                  }`}
              >
                ⌄
              </span>
            </button>

            {/* Answer */}
            {expandedId === faq.id && (
              <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="rounded-3xl p-8 text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl">
          <h2 className="text-2xl font-bold">Still need help?</h2>
          <p className="mt-2 opacity-90">
            Contact our support team for further assistance
          </p>

          <Link href='/contact'>
            <button className="px-6 py-2.5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;