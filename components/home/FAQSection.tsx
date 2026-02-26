'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How long does it take to get loan approval?',
    answer: 'With our AI-powered system, most applications receive approval decision within 30 minutes. In some cases, it can be as quick as 5 minutes.',
  },
  {
    question: 'What documents do I need to provide?',
    answer: 'Basic documents include PAN card, Aadhaar card, bank statements (last 3 months), and salary slips. Requirements may vary based on loan type.',
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Yes, we use bank-level encryption and follow all RBI guidelines. Your data is stored securely and never shared without your consent.',
  },
  {
    question: 'Can I prepay my loan without penalties?',
    answer: 'Yes, you can prepay your loan at any time without prepayment penalties. This helps reduce your overall interest burden.',
  },
  {
    question: 'What if my application is rejected?',
    answer: 'If rejected, our team will provide you with detailed feedback. You can reapply after 30 days or contact our support for guidance.',
  },
  {
    question: 'Is there a minimum income requirement?',
    answer: 'Minimum income requirements vary by loan type. For personal loans, we typically require a minimum of ₹20,000 monthly income.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-background/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted">
            Find answers to common questions about our loan products and application process.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-foreground/10 rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 bg-white hover:bg-foreground/2 transition-colors flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-foreground text-left">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-primary" />
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openIndex === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-foreground/2 text-muted border-t border-foreground/10">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
