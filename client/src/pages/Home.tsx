import React from 'react';
import Header from '@/components/Header';
import Hero3DScene from '@/components/Hero3DScene';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import ProcessSection from '@/components/ProcessSection';
import DifferentiatorsSection from '@/components/DifferentiatorsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

/**
 * Home Page
 * Premium 3D portfolio website with all sections
 * Design: Futuristic Minimalism with AI-Age Sophistication
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
      <Header />

      {/* Hero Section with 3D Scene */}
      <Hero3DScene />

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* Case Studies Section */}
      <section id="case-studies">
        <CaseStudiesSection />
      </section>

      {/* Process Section */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* Differentiators Section */}
      <section id="differentiators">
        <DifferentiatorsSection />
      </section>

      {/* CTA Section */}
      <section id="contact">
        <CTASection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
