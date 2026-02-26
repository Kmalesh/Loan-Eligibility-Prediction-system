'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, TrendingUp, Percent } from 'lucide-react';
import { PredictionResult } from './LoanApplicationForm';
import Link from 'next/link';

interface ResultCardProps {
  result: PredictionResult;
  onNewApplication: () => void;
}

export default function ResultCard({ result, onNewApplication }: ResultCardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Animated Result Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header Section */}
          <div
            className={`px-8 py-12 text-center text-white ${
              result.approved
                ? 'bg-gradient-to-r from-accent to-green-500'
                : 'bg-gradient-to-r from-orange-500 to-red-500'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              {result.approved ? (
                <CheckCircle className="w-24 h-24" />
              ) : (
                <AlertCircle className="w-24 h-24" />
              )}
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {result.approved ? 'Approved!' : 'Under Review'}
            </h1>
            <p className="text-xl opacity-90">{result.message}</p>

            {/* Confidence Score */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 inline-block bg-white/20 backdrop-blur px-6 py-3 rounded-full"
            >
              <span className="text-lg font-semibold">
                Confidence Score: {Math.round(result.confidence * 100)}%
              </span>
            </motion.div>
          </div>

          {/* Details Section */}
          <div className="bg-white p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">Loan Details</h2>

            {/* EMI and Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <p className="text-sm font-semibold text-muted">Monthly EMI</p>
                </div>
                <div className="text-4xl font-bold text-primary">
                  ₹{result.emi.toLocaleString()}
                </div>
                <p className="text-sm text-muted mt-2">Fixed monthly payment</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Percent className="w-6 h-6 text-secondary" />
                  <p className="text-sm font-semibold text-muted">Debt-to-Income Ratio</p>
                </div>
                <div className="text-4xl font-bold text-secondary">
                  {result.debtToIncomeRatio}%
                </div>
                <p className="text-sm text-muted mt-2">Healthy financial ratio</p>
              </motion.div>
            </div>

            {/* Repayment Summary */}
            <div className="bg-foreground/5 rounded-2xl p-6 mb-10">
              <h3 className="font-semibold text-foreground mb-6">Repayment Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-foreground/10">
                  <span className="text-foreground">Total Amount to Pay</span>
                  <span className="font-bold text-foreground">
                    ₹{result.totalPayable.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-foreground/10">
                  <span className="text-foreground">Principal Amount</span>
                  <span className="font-bold text-foreground">
                    ₹{(result.totalPayable - result.totalInterest).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Total Interest</span>
                  <span className="font-bold text-accent">
                    ₹{result.totalInterest.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mb-10">
              <h3 className="font-semibold text-foreground mb-3">Next Steps</h3>
              <ol className="space-y-2 text-foreground list-decimal list-inside">
                {result.approved ? (
                  <>
                    <li>Verify your documents and bank details</li>
                    <li>E-sign the loan agreement</li>
                    <li>Get approval confirmation</li>
                    <li>Funds will be disbursed within 24 hours</li>
                  </>
                ) : (
                  <>
                    <li>Our team will review your application</li>
                    <li>You'll receive updates via email/SMS</li>
                    <li>Additional documents may be requested</li>
                    <li>Final decision within 48 hours</li>
                  </>
                )}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={onNewApplication}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                New Application
              </motion.button>

              <motion.a
                href="/"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
              >
                Back to Home
              </motion.a>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted text-center mt-6">
              This is an indicative prediction based on AI analysis. Final approval is subject to
              document verification and bank policies.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
