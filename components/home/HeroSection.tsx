'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
            >
              <Zap className="w-4 h-4" />
              <span className="font-semibold text-sm">AI-Powered Loan Approval</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-balance text-foreground mb-6 leading-tight"
            >
              Fast Loans,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Better Terms
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted mb-8 leading-relaxed"
            >
              Get instant loan eligibility predictions with our advanced AI model. No hidden charges, transparent process, and fast approval in minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-colors">
                Check Eligibility
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-foreground/10"
            >
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <p className="text-sm text-muted mt-1">Happy Customers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">₹500Cr</div>
                <p className="text-sm text-muted mt-1">Loans Disbursed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">24/7</div>
                <p className="text-sm text-muted mt-1">Support Available</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-96 hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Animated card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-0 w-64 bg-white rounded-2xl shadow-2xl p-6 border border-primary/20"
              >
                <div className="text-sm font-semibold text-foreground mb-2">Loan Amount</div>
                <div className="text-3xl font-bold text-primary mb-4">₹5,00,000</div>
                <div className="w-full bg-foreground/10 rounded-full h-2 mb-4">
                  <div className="bg-primary rounded-full h-2 w-2/3" />
                </div>
                <div className="flex justify-between text-xs text-muted">
                  <span>Processing...</span>
                  <span>67%</span>
                </div>
              </motion.div>

              {/* Status indicator */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-20 left-0 flex items-center gap-3 bg-accent/20 text-accent px-4 py-3 rounded-full"
              >
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Approved</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
