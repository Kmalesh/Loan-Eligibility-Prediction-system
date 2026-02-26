'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormStep from './FormStep';
import ResultCard from './ResultCard';

export interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Financial Information
  income: string;
  employmentYears: string;
  existingDebts: string;
  creditScore: string;

  // Loan Information
  loanAmount: string;
  loanDuration: string;
  loanType: string;
  loanPurpose: string;
}

export interface PredictionResult {
  approved: boolean;
  confidence: number;
  emi: number;
  totalPayable: number;
  totalInterest: number;
  debtToIncomeRatio: number;
  message: string;
}

export default function LoanApplicationForm() {
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    income: '',
    employmentYears: '',
    existingDebts: '',
    creditScore: '',
    loanAmount: '',
    loanDuration: '5',
    loanType: 'personal',
    loanPurpose: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName.trim() !== '' &&
          formData.lastName.trim() !== '' &&
          formData.email.includes('@') &&
          formData.phone.length >= 10
        );
      case 2:
        return (
          formData.loanType !== '' &&
          formData.loanAmount !== '' &&
          parseFloat(formData.loanAmount) > 0 &&
          formData.loanDuration !== ''
        );
      case 3:
        return (
          formData.income !== '' &&
          parseFloat(formData.income) > 0 &&
          formData.creditScore !== '' &&
          parseFloat(formData.creditScore) > 0 &&
          formData.existingDebts !== '' &&
          formData.employmentYears !== ''
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      alert('Please fill all required fields correctly');
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) {
      alert('Please fill all required financial information');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: 30, // You can add age field to form
          income: parseFloat(formData.income),
          credit_score: parseInt(formData.creditScore),
          employment_years: parseInt(formData.employmentYears),
          existing_debts: parseFloat(formData.existingDebts),
          loan_amount: parseFloat(formData.loanAmount),
          loan_duration: parseInt(formData.loanDuration),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process application');
      }

      const data = await response.json();
      setResult(data);
      setStep(4); // Show result step
    } catch (error) {
      console.error('[v0] Application error:', error);
      alert('Failed to process your application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setResult(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      income: '',
      employmentYears: '',
      existingDebts: '',
      creditScore: '',
      loanAmount: '',
      loanDuration: '5',
      loanType: 'personal',
      loanPurpose: '',
    });
  };

  if (result) {
    return <ResultCard result={result} onNewApplication={resetForm} />;
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Loan Application
        </h1>
        <p className="text-xl text-muted">
          Fill out the form below to check your loan eligibility instantly
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center flex-1">
              <motion.div
                animate={{
                  backgroundColor: step >= num ? '#0052CC' : '#E0E0E0',
                  scale: step === num ? 1.1 : 1,
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-2"
              >
                {num}
              </motion.div>
              <div className="text-sm font-medium text-foreground">
                {num === 1 && 'Personal'}
                {num === 2 && 'Loan'}
                {num === 3 && 'Financial'}
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((step - 1) / 2) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <FormStep
                stepNumber={1}
                title="Personal Information"
                description="Tell us about yourself"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </FormStep>
            )}

            {/* Step 2: Loan Information */}
            {step === 2 && (
              <FormStep
                stepNumber={2}
                title="Loan Information"
                description="Tell us about the loan you need"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Loan Type *
                    </label>
                    <select
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="personal">Personal Loan</option>
                      <option value="business">Business Loan</option>
                      <option value="home">Home Loan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Loan Amount (₹) *
                    </label>
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      placeholder="500000"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Loan Duration (Years) *
                    </label>
                    <input
                      type="number"
                      name="loanDuration"
                      value={formData.loanDuration}
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Loan Purpose
                    </label>
                    <input
                      type="text"
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleInputChange}
                      placeholder="e.g., Business expansion, Education, etc."
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </FormStep>
            )}

            {/* Step 3: Financial Information */}
            {step === 3 && (
              <FormStep
                stepNumber={3}
                title="Financial Information"
                description="Help us assess your eligibility"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Monthly Income (₹) *
                    </label>
                    <input
                      type="number"
                      name="income"
                      value={formData.income}
                      onChange={handleInputChange}
                      placeholder="50000"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Credit Score *
                    </label>
                    <input
                      type="number"
                      name="creditScore"
                      value={formData.creditScore}
                      onChange={handleInputChange}
                      placeholder="750"
                      min="300"
                      max="900"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Years of Employment *
                    </label>
                    <input
                      type="number"
                      name="employmentYears"
                      value={formData.employmentYears}
                      onChange={handleInputChange}
                      placeholder="3"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Existing Monthly Debts (₹) *
                    </label>
                    <input
                      type="number"
                      name="existingDebts"
                      value={formData.existingDebts}
                      onChange={handleInputChange}
                      placeholder="10000"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-foreground/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </FormStep>
            )}
          </AnimatePresence>

          {/* Button Container */}
          <div className="flex justify-between gap-4 mt-8">
            {step > 1 && (
              <motion.button
                type="button"
                onClick={handlePrevious}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Previous
              </motion.button>
            )}

            {step < 3 && (
              <motion.button
                type="button"
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ml-auto px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Next
              </motion.button>
            )}

            {step === 3 && (
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Check Eligibility'}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
