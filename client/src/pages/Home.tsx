/*
 * Home Page - OptionTech OS Elite Intelligence
 * Main landing page combining all sections
 */

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import UnitsSection from '@/components/UnitsSection';
import ComparisonSection from '@/components/ComparisonSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#050810]">
      <Navigation />
      <main>
        <HeroSection />
        <UnitsSection />
        <ComparisonSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
