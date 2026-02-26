'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Lock, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Approval',
    description: 'Get loan approval in minutes with our AI-powered eligibility prediction system.',
    color: 'from-primary to-secondary',
  },
  {
    icon: Lock,
    title: 'Secure & Safe',
    description: 'Bank-level encryption and secure data handling for your peace of mind.',
    color: 'from-secondary to-accent',
  },
  {
    icon: Award,
    title: 'Transparent Terms',
    description: 'No hidden charges, clear EMI calculations, and transparent loan terms.',
    color: 'from-accent to-primary',
  },
  {
    icon: Check,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to assist you with any queries.',
    color: 'from-primary to-accent',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-background/50">
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
            Why Choose RK Foundation?
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            We combine cutting-edge technology with personalized service to deliver the best loan experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-8 bg-white rounded-2xl border border-foreground/10 hover:border-primary/30 transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6`}>
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <motion.div
                  className="inline-flex items-center gap-2 mt-6 text-primary font-semibold"
                  whileHover={{ x: 5 }}
                >
                  Learn more <span>→</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
