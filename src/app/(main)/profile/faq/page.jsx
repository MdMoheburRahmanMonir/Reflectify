'use client';
import { useState } from "react";

const FAQPage = () => {
  const [expandedId, setExpandedId] = useState(0);

  const faqs = [
    {
      id: 0,
      category: "Account",
      question: "How do I reset my password?",
      answer: "You can reset your password by going to the Edit Profile section. Enter your current password, then set a new password following our security requirements. Make sure both password fields match before saving.",
    },
    {
      id: 1,
      category: "Account",
      question: "How do I change my display name?",
      answer: "Navigate to the Edit Profile page and update your first and last name in the Personal Information section. Click 'Save Changes' to apply the updates to your account.",
    },
    {
      id: 2,
      category: "Account",
      question: "Can I have multiple accounts?",
      answer: "Each email address can only be associated with one account. If you need a separate account, please use a different email address to sign up.",
    },
    {
      id: 3,
      category: "Security",
      question: "What are the password security requirements?",
      answer: "Our password requirements include: minimum 8 characters, uppercase and lowercase letters, at least one number, and one special character (@, #, $, %, etc.). This ensures your account remains secure.",
    },
    {
      id: 4,
      category: "Security",
      question: "How often should I change my password?",
      answer: "We recommend changing your password every 3-6 months for optimal security. If you notice any suspicious activity, change it immediately and contact our support team.",
    },
    {
      id: 5,
      category: "Account",
      question: "How do I delete my account?",
      answer: "Account deletion is a permanent action. To delete your account, please contact our support team with your email address. We'll guide you through the process and ensure all your data is properly handled.",
    },
    {
      id: 6,
      category: "Privacy",
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption to protect your data. All passwords are hashed and stored securely. Your information is never shared with third parties without your consent.",
    },
    {
      id: 7,
      category: "Privacy",
      question: "What data do you collect?",
      answer: "We collect only essential information needed for your account and profile. This includes your name, email, and any information you choose to add to your profile. You control what information is visible to others.",
    },
  ];

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">FAQ</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Frequently asked questions and help resources</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Common Questions</p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Find answers to your questions</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Click on any question to expand and view the answer. If you need further assistance, please contact our support team.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-3xl border border-slate-200 overflow-hidden transition dark:border-slate-700"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition ${
                  expandedId === faq.id
                    ? "bg-blue-50 dark:bg-blue-950/20"
                    : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex-1">
                  <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-slate-700 dark:text-slate-300 mb-2">
                    {faq.category}
                  </span>
                  <p className={`text-sm font-semibold ${expandedId === faq.id ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-slate-100"}`}>
                    {faq.question}
                  </p>
                </div>
                <svg
                  className={`h-5 w-5 text-slate-500 ml-4 flex-shrink-0 transition transform -rotate-90 ${
                    expandedId === faq.id ? "-rotate-180 text-blue-600 dark:text-blue-400" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedId === faq.id && (
                <div className="border-t border-slate-200 bg-white px-6 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 dark:from-blue-950/20 dark:to-cyan-950/20 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Still need help?</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          If you couldn't find the answer you're looking for, please don't hesitate to contact our support team.
        </p>
        <div className="flex gap-3">
          <button className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Contact Support
          </button>
          <button className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
