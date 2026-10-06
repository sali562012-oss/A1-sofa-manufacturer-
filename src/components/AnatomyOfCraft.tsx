import React, { useState } from 'react';
import { WORKSHOP_STEPS } from '../data/furnitureData';
import { Check, ShieldCheck, Hammer, Sparkles, Award, Trees, Feather } from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  x: number; // percentage
  y: number; // percentage
  subtitle: string;
  detail: string;
  spec: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'frame',
    title: 'Kiln-Dried European Beech Frame',
    x: 28,
    y: 65,
    subtitle: 'Zero Particle Board or Softwood',
    detail: 'Internal frames are cut from FSC-certified 35mm solid European beech. Kiln-dried to 8% moisture content to prevent seasonal warping, creaking, or joint failure over decades.',
    spec: '25-Year Structural Guarantee'
  },
  {
    id: 'springs',
    title: '8-Way Hand-Tied Coil Suspension',
    x: 50,
    y: 52,
    subtitle: 'The Benchmark of Traditional Upholstery',
    detail: 'Instead of cheap elastic webbing or mass-market zigzag sinuous wire, each tempered carbon-steel coil is tied by hand with waxed Italian hemp twine in eight directions to Italian jute webbing.',
    spec: '96 Hand Knots Per Seat'
  },
  {
    id: 'fill',
    title: 'Layered Dual-Core Cushion Ergonomics',
    x: 68,
    y: 42,
    subtitle: 'Multi-Baffle Featherdown Wrapping',
    detail: 'A high-resilience soy-based cold-foam core is encapsulated inside compartmentalized down chambers filled with sterilized European duck down, eliminating shifting or permanent lumpiness.',
    spec: 'OEKO-TEX Standard 100'
  },
  {
    id: 'tailoring',
    title: 'French Seams & Bonded Nylon Thread',
    x: 78,
    y: 72,
    subtitle: 'Sub-Millimeter Edge Alignment',
    detail: 'Every seam is stitched with #69 bonded continuous filament nylon thread. French flange seams encase raw fabric edges internally to prevent fraying and withstand over 40 lbs of shear force.',
    spec: 'Tested to 100,000 Double Rubs'
  }
];

export const AnatomyOfCraft: React.FC = () => {
  const [activeHotspotId, setActiveHotspotId] = useState<string>('frame');
  const activeHotspot = HOTSPOTS.find(h => h.id === activeHotspotId) || HOTSPOTS[0];
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section id="craft" className="py-20 lg:py-28 bg-[#1A1816] text-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#D4A373] mb-3">
            <span>The Manufacturer Standard</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Joinery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight [text-wrap:balance]">
            Anatomy of a 25-Year Sofa: What Retail Stores Hide Inside
          </h2>
          <p className="text-sm sm:text-base text-[#B3ACA0] mt-3 font-light leading-relaxed">
            Most commercial sofas degrade within 3 years due to glued chipboard, cheap elastic webbing, and polyester batting. Explore the internal engineering behind every KRONOS frame.
          </p>
        </div>

        {/* Interactive Anatomy Hotspot Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24">
          
          {/* Visual Canvas with Hotspots (7 cols) */}
          <div className="lg:col-span-7 relative bg-[#24211D] rounded-xl overflow-hidden border border-[#3A352E] shadow-2xl aspect-[16/10]">
            <img
              src="/src/assets/images/workshop_craftsmanship_1791286262332.jpg"
              alt="Craftsman hand-stitching sofa upholstery frame in Porto workshop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-[#1A1816]/30 to-transparent" />

            {/* Hotspot Pins */}
            {HOTSPOTS.map((hotspot) => {
              const isActive = activeHotspotId === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspotId(hotspot.id)}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none`}
                  aria-label={`Inspect ${hotspot.title}`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isActive ? 'bg-[#D4A373]' : 'bg-white/40'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center text-xs font-bold transition-all shadow-lg ${
                        isActive
                          ? 'bg-[#D4A373] text-[#1A1816] scale-110 ring-4 ring-[#D4A373]/30'
                          : 'bg-white/90 text-[#1A1816] hover:bg-white'
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Caption in bottom corner */}
            <div className="absolute bottom-4 left-4 text-xs text-[#D5CEBF] font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
              Interactive Cross-Section · Tap (+) to dissect components
            </div>
          </div>

          {/* Hotspot Detail Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#25221E] border border-[#3D372F] p-6 sm:p-8 rounded-xl shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-[#D4A373] mb-2">
              <span className="uppercase tracking-widest">Internal Component Audit</span>
              <span>{activeHotspot.spec}</span>
            </div>

            <h3 className="text-2xl font-serif text-white mb-1">
              {activeHotspot.title}
            </h3>
            <div className="text-xs text-[#C5BDB0] uppercase tracking-wider mb-4 font-medium">
              {activeHotspot.subtitle}
            </div>

            <p className="text-sm text-[#D1C9BE] leading-relaxed font-light mb-6">
              {activeHotspot.detail}
            </p>

            {/* Comparison matrix */}
            <div className="border-t border-[#3B352D] pt-4 mt-4 space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-[#EFEBE4]">
                <Check className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span>
                  <strong>KRONOS Standard:</strong> {activeHotspot.spec} with lifetime repairability.
                </span>
              </div>
              <div className="flex items-start gap-2 text-[#9A9184]">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span>
                  <strong>Retail Industry Shortcut:</strong> Plywood, stapled sinuous wire, and non-recyclable spray adhesives.
                </span>
              </div>
            </div>

            {/* Hotspot Selector Pills (buttons) */}
            <div className="mt-6 pt-4 border-t border-[#3B352D] flex flex-wrap gap-2">
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHotspotId(h.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    activeHotspotId === h.id
                      ? 'bg-[#D4A373] text-[#1A1816]'
                      : 'bg-[#302C26] text-[#B0A79A] hover:text-white'
                  }`}
                >
                  {h.title.split(' ')[0]}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* 5-Step Factory Manufacturing Journey */}
        <div className="border-t border-[#332E27] pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold mb-1">
                From Raw Timber to Heirloom
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                Our 5-Stage Workshop Protocol
              </h3>
            </div>
            <div className="text-xs font-mono text-[#A8A093]">
              Porto Workshop: 28 Days Average Build Cycle
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {WORKSHOP_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`cursor-pointer p-5 rounded-lg border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#2B2721] border-[#D4A373] shadow-md'
                      : 'bg-[#201D1A] border-[#332E27] hover:border-[#4E473D]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#D4A373] mb-3">
                      <span className="text-lg font-serif">{step.number}</span>
                      <span>{step.time}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#A8A195] font-light leading-relaxed line-clamp-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#3A342B] text-[11px] font-mono text-[#D4A373] font-medium">
                    {step.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sustainable Certifications Banner */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#332E27] text-xs text-[#B5ADA1]">
          <div className="flex items-start gap-3">
            <Trees className="w-5 h-5 text-[#D4A373] shrink-0" />
            <div>
              <div className="text-white font-semibold">100% FSC-Certified Hardwood</div>
              <div className="text-[#8E867B] mt-0.5 font-light">Sourced exclusively from sustainably managed European beech and oak forests.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Feather className="w-5 h-5 text-[#D4A373] shrink-0" />
            <div>
              <div className="text-white font-semibold">Ethical Down & Oeko-Tex Certified</div>
              <div className="text-[#8E867B] mt-0.5 font-light">Sterilized European duck down with zero live-plucking and zero harmful chemicals.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4A373] shrink-0" />
            <div>
              <div className="text-white font-semibold">25-Year Transferable Warranty</div>
              <div className="text-[#8E867B] mt-0.5 font-light">Every sofa includes an engraved brass serial medallion and lifetime repair pledge.</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
