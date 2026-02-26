import LoanApplicationForm from '@/components/loan-application/LoanApplicationForm';

export const metadata = {
  title: 'Loan Application - RK Foundation',
  description: 'Apply for a loan with instant AI-powered eligibility prediction',
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoanApplicationForm />
      </div>
    </div>
  );
}
