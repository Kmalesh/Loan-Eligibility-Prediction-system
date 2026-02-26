'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    name: 'Personal Loan',
    description: 'Perfect for personal expenses and emergencies',
    amount: '₹1,00,000 - ₹25,00,000',
    duration: '1 - 5 years',
    rate: '8% - 15% p.a.',
    features: [
      'Instant approval in 30 minutes',
      'No collateral required',
      'Flexible repayment terms',
      'Balance transfer option',
    ],
    color: 'from-primary to-secondary',
  },
  {
    name: 'Business Loan',
    description: 'Grow your business with flexible financing',
    amount: '₹50,000 - ₹1,00,00,000',
    duration: '1 - 7 years',
    rate: '6% - 12% p.a.',
    features: [
      'Quick approval process',
      'Minimal documentation',
      'Dedicated account manager',
      'Working capital support',
    ],
    color: 'from-secondary to-accent',
    featured: true,
  },
  {
    name: 'Home Loan',
    description: 'Your dream home is just one step away',
    amount: '₹5,00,000 - ₹10,00,00,000',
    duration: '5 - 20 years',
    rate: '4% - 9% p.a.',
    features: [
      'Competitive interest rates',
      'Loan against property',
      'Easy document verification',
      'Top-up facility',
    ],
    color: 'from-accent to-primary',
  },
];

export default function LoanProductsSection() {
  return (
    <section id="products" className="py-20 md:py-32 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Loan Products
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Choose the perfect loan product that fits your financial needs.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden ${
                product.featured ? 'md:scale-105 md:row-span-2' : ''
              }`}
            >
              <div
                className={`bg-gradient-to-br ${product.color} p-8 rounded-2xl h-full flex flex-col text-white relative overflow-hidden group`}
              >
                {/* Badge */}
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-accent text-foreground px-3 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}

                {/* Animated background */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                  <p className="text-white/80 mb-8">{product.description}</p>

                  {/* Details */}
                  <div className="space-y-4 mb-8 pb-8 border-b border-white/20">
                    <div>
                      <div className="text-sm opacity-80">Loan Amount</div>
                      <div className="font-semibold text-lg">{product.amount}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80">Duration</div>
                      <div className="font-semibold text-lg">{product.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80">Interest Rate</div>
                      <div className="font-semibold text-lg">{product.rate}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/apply"
                    className="block text-center bg-white text-foreground py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
