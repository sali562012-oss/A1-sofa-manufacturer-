import React from 'react';
import { CLIENT_STORIES } from '../data/furnitureData';
import { Quote, Star, MapPin } from 'lucide-react';

export const ReviewsAndSpaces: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#8A5B38] mb-2">
              <span>Installed Commissions</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Living</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1B18] tracking-tight">
              In Residence Across the Globe
            </h2>
            <p className="text-sm sm:text-base text-[#615A52] mt-2 max-w-xl font-light">
              Over 4,200 bespoke sofas delivered directly from our workshops to private residences and boutique hotels in 28 countries.
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-[#8A5B38] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs font-mono text-[#6E675D]">
              4.96 / 5.0 Average Verification Score
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLIENT_STORIES.map((story, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl border border-[#E8E2D6] shadow-sm flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#D8CEBC] mb-4" />
                <p className="text-sm text-[#38322B] leading-relaxed font-light italic mb-6">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EBE2]">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#1E1B18]">
                  {story.author}
                </div>
                <div className="text-[11px] text-[#787166] mt-0.5">
                  {story.role}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8A5B38] mt-2 pt-2 border-t border-dashed border-[#EAE3D5]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {story.location}
                  </span>
                  <span>{story.sofaModel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Photo Strip */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-[#EFE9E0] group">
            <img
              src="/src/assets/images/hero_luxury_sofa_1791286225430.jpg"
              alt="The Elysian in modern villa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-xs text-white font-medium">Villa Cascais, Lisbon</span>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-[#EFE9E0] group">
            <img
              src="/src/assets/images/sofa_marlo_leather_1791286239034.jpg"
              alt="The Marlo in Milan penthouse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-xs text-white font-medium">Brera Loft, Milan</span>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-[#EFE9E0] group">
            <img
              src="/src/assets/images/sofa_elysian_linen_1791286249996.jpg"
              alt="The Sorensen in Copenhagen townhouse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-xs text-white font-medium">Bredgade Residence, Copenhagen</span>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-[#EFE9E0] group">
            <img
              src="/src/assets/images/workshop_craftsmanship_1791286262332.jpg"
              alt="Artisan final inspection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-xs text-white font-medium">Porto Workshop Final QA</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
