import React from 'react';
import Image from 'next/image';
import HeroSection from './home/hero-section';
import AboutSection from "./home/about-section"
import Achievements from "./home/achievement-section"
import MissionVisionSection from './home/mission-vission';
import WhyChooseAbacus from './home/why-choose-us';
import FounderSection from './home/founder-section';
import Testimonials  from './home/testimonials';
import ContactSection from './home/contact-section';
import BlogSections from './home/blog-section';

const Page = () => {
  return (
    <div className="min-h-screen py-10 ">
      <HeroSection />
      <AboutSection/>
      <BlogSections/>
      <Achievements/>
      <FounderSection />
      <MissionVisionSection/>
      <WhyChooseAbacus/>
      <Testimonials/>
      <ContactSection/>
      
    </div>
  );
};

export default Page;
