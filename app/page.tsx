import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import LoanProductsSection from '@/components/home/LoanProductsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LoanProductsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
