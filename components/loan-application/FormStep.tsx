'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface FormStepProps {
  stepNumber: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function FormStep({
  stepNumber,
  title,
  description,
  children,
}: FormStepProps) {
  return (
    <motion.div
      key={stepNumber}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-lg text-muted">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}
