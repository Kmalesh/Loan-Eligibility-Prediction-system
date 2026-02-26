'use client';

import { motion } from 'framer-motion';
import { FileText, Smartphone, CheckCircle, DollarSign } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Fill Application',
    description: 'Complete a simple online form with your basic information in less than 5 minutes.',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'AI Prediction',
    description: 'Our advanced AI model instantly predicts your loan eligibility with real-time accuracy.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Get Approval',
    description: 'Receive instant approval decision with personalized loan offers tailored for you.',
  },
  {
    number: '04',
    icon: DollarSign,
    title: 'Quick Disbursal',
    description: 'Get funds directly to your bank account within 24 hours of approval.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold">HOW IT WORKS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Simple 4-Step Process
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Get your loan approved in just 4 simple steps. Fast, transparent, and hassle-free.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}

              <div className="bg-foreground/5 rounded-2xl p-8 hover:bg-primary/10 transition-colors duration-300">
                {/* Number */}
                <div className="text-6xl font-bold text-primary/20 mb-4">{step.number}</div>

                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 -mt-12">
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
