import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Clock, Award } from 'lucide-react';

interface HeroProps {
  onOpenConfigurator: () => void;
  onExploreCollections: () => void;
  onOpenSwatchModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConfigurator,
  onExploreCollections,
  onOpenSwatchModal
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed editorial kicker */}
        <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#8A5B38] mb-4">
          <span>Bespoke Manufacturer</span>
          <span aria-hidden="true">·</span>
          <span>Porto & Copenhagen Ateliers</span>
          <span aria-hidden="true">·</span>
          <span>Est. 1984</span>
        </div>

        {/* Hero Title & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal tracking-tight text-[#1E1B18] leading-[1.08] [text-wrap:balance]">
              Heirloom Seating. Built by Hand, One Frame at a Time.
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-[#5A544C] leading-relaxed mb-6 font-light">
              We engineer luxury sofas without retail markups. Kiln-dried European hardwood, eight-way hand-tied steel coils, and bespoke Italian tailoring—shipped directly from our workshop to your home.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenConfigurator}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1E1B18] hover:bg-[#322D28] rounded-md transition-all shadow-sm"
              >
                <span>Launch Custom Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreCollections}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1E1B18] bg-transparent hover:bg-[#F2EDE4] rounded-md border border-[#D5CEBF] transition-all"
              >
                Explore Collections
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#E8E2D7] bg-[#F0ECE3] aspect-[16/9] max-h-[640px]">
          <img
            src="/src/assets/images/hero_luxury_sofa_1791286225430.jpg"
            alt="The Elysian curved modular sofa in an architectural living room"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
          />
          
          {/* Subtle media gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Context Plaque on bottom left */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#1E1B18]/90 backdrop-blur-md text-white p-5 rounded-lg border border-white/10 max-w-md">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs uppercase tracking-widest text-[#D8CBB7] font-semibold">
                Featured Commission
              </span>
              <span className="text-xs font-mono tabular-nums text-white/70">
                Spec: 320cm Modular
              </span>
            </div>
            <div className="text-lg font-serif text-white mb-1">
              The Elysian in Bouclé de Lyon
            </div>
            <p className="text-xs text-[#E1DCD3] leading-relaxed mb-3 font-light">
              Architectural curved silhouette with concealed magnetic joinery and plush Belgian down wrapping.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <button
                onClick={onOpenConfigurator}
                className="text-[#E0C097] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>Customize This Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenSwatchModal}
                className="text-white/70 hover:text-white underline underline-offset-4 transition-colors"
              >
                Sample Bouclé Swatch
              </button>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Metric Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E8E2D7]">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#7A7267] font-medium mb-1">
              <ShieldCheck className="w-4 h-4 text-[#8A5B38]" />
              <span>Guarantee</span>
            </div>
            <div className="text-2xl font-serif font-medium text-[#1E1B18]">25-Year Warranty</div>
            <div className="text-xs text-[#6B6358] mt-0.5 font-light">Solid European beech internal frames</div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#7A7267] font-medium mb-1">
              <Award className="w-4 h-4 text-[#8A5B38]" />
              <span>Spring System</span>
            </div>
            <div className="text-2xl font-serif font-medium text-[#1E1B18]">8-Way Hand-Tied</div>
            <div className="text-xs text-[#6B6358] mt-0.5 font-light">Tempered steel coils tied to Italian jute</div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#7A7267] font-medium mb-1">
              <Clock className="w-4 h-4 text-[#8A5B38]" />
              <span>Lead Time</span>
            </div>
            <div className="text-2xl font-serif font-medium text-[#1E1B18]">4–6 Weeks</div>
            <div className="text-xs text-[#6B6358] mt-0.5 font-light">Direct from workshop, no retail storage</div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#7A7267] font-medium mb-1">
              <Compass className="w-4 h-4 text-[#8A5B38]" />
              <span>In-Home Trial</span>
            </div>
            <div className="text-2xl font-serif font-medium text-[#1E1B18]">100 Days</div>
            <div className="text-xs text-[#6B6358] mt-0.5 font-light">Risk-free trial with free white-glove returns</div>
          </div>
        </div>

      </div>
    </section>
  );
};
