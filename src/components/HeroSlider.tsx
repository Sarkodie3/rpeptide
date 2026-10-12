'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/assets/images/banner-preformed-fibrils-color.jpg',
    title: 'Preformed Fibrils',
    subtitle: 'Available now - ready to ship',
    buttonText: 'View Products',
    link: '/products/preformed-fibrils',
  },
  {
    id: 2,
    image: '/assets/images/banner-welcome-color.jpg',
    title: 'Welcome to rPeptide | Peptide & Protein Specialist',
    subtitle: "We provide high quality recombinant reagents, peptides, proteins, antibodies, custom services, and more for Alzheimer's, Parkinson's and other neurodegenerative research worldwide.",
    buttonText: 'Shop All Products',
    link: '/products',
  },
  {
    id: 3,
    image: '/assets/images/adobestock_285273048-scaled.jpeg',
    title: 'Your R&D Partner',
    subtitle: 'We specialize in hard to express protein synthesis - rPeptide offers a wide range of custom services, including molecular biology, protein expression and purification, and uniform C13 and N15 labeling of peptides and proteins.',
    buttonText: 'Contact Us',
    link: '/about-us/contact-information',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden bg-brand-charcoal">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center brightness-[0.70]"
            />
          </div>

          {/* Caption */}
          <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
            <div className="max-w-3xl text-white">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-md text-white font-display">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-100 drop-shadow max-w-2xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>
              <div>
                <Link
                  href={slide.link}
                  className="bg-brand-gold hover:bg-brand-gold-hover text-white font-bold text-sm uppercase tracking-wider py-3.5 px-8 inline-block shadow-lg transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/30 hover:bg-black/60 text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/30 hover:bg-black/60 text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bullet Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? 'bg-brand-gold w-6' : 'bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
