import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What are your delivery hours?",
      answer: "We deliver from 11:00 AM to 9:30 PM every day. Last orders are accepted 30 minutes before closing time."
    },
    {
      question: "Do you cater for large events?",
      answer: "Yes! We offer catering services for events of all sizes. Please contact us at least 48 hours in advance for catering orders."
    },
    {
      question: "Are your ingredients halal?",
      answer: "Yes, all our meat products are certified halal. We can provide certification upon request."
    },
    {
      question: "Do you offer vegetarian options?",
      answer: "Absolutely! We have a wide range of vegetarian options available on our menu, including veggie burgers, salads, and sides."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you'll receive a tracking link via email and SMS to monitor your delivery in real-time."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}