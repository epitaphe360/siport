import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedExhibitors } from '../components/home/FeaturedExhibitors';
import { NetworkingSection } from '../components/home/NetworkingSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedExhibitors />
      <NetworkingSection />
    </div>
  );
};