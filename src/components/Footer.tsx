import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="bg-[#171513] text-[#FAF8F5] pt-16 pb-12 border-t border-[#292521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#292521]">
          
          {/* Col 1: Brand & Atelier Mission */}
          <div className="lg:col-span-2">
            <a href="#hero" className="text-xl font-serif tracking-[0.2em] uppercase font-semibold text-white">
              KRONOS ATELIER
            </a>
            <p className="text-xs text-[#A8A195] font-light leading-relaxed mt-4 max-w-sm">
              Handcrafted bespoke sofas, modular seating, and architectural lounges engineered directly in our European workshops. Kiln-dried FSC beech frames, 8-way hand-tied springs, and pure aniline leathers.
            </p>
            <div className="mt-6 text-xs text-[#827A6E]">
              Porto Workshop: Rua do Freixo 1420, Porto, Portugal<br />
              Copenhagen Design Studio: Bredgade 34, Copenhagen, Denmark
            </div>
          </div>

          {/* Col 2: Showroom Locations */}
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold mb-4">
              Showrooms
            </div>
            <ul className="space-y-2.5 text-xs text-[#B5AEA2] font-light">
              <li>London — 12 Mount Street, Mayfair</li>
              <li>Copenhagen — Bredgade Design Quarter</li>
              <li>Munich — Maximilianstraße Atelier</li>
              <li>New York — 88 Franklin St, Tribeca</li>
              <li className="pt-2 text-[11px] text-[#827A6E]">Private consultations by appointment</li>
            </ul>
          </div>

          {/* Col 3: Craft & Standards */}
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold mb-4">
              Atelier Standards
            </div>
            <ul className="space-y-2.5 text-xs text-[#B5AEA2] font-light">
              <li>25-Year Structural Frame Warranty</li>
              <li>8-Way Hand-Tied Coil Suspension</li>
              <li>FSC-Certified Hardwood Sourcing</li>
              <li>OEKO-TEX & Ethical Down Fill</li>
              <li>Crib 5 Commercial Fire Compliance</li>
              <li>100-Day In-Home Comfort Trial</li>
            </ul>
          </div>

          {/* Col 4: Dispatch Newsletter */}
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold mb-4">
              Workshop Journal
            </div>
            <p className="text-xs text-[#A8A195] font-light leading-relaxed mb-4">
              Receive private invitations to our seasonal fabric archive releases and behind-the-scenes carpentry notes.
            </p>

            {!newsletterSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-[#24211D] rounded border border-[#3A352E] text-xs text-white placeholder-[#787165] focus:outline-none focus:border-[#D4A373]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#D4A373] hover:bg-[#B88757] text-[#171513] rounded text-xs flex items-center justify-center transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-[#D4A373] font-mono">
                <Check className="w-4 h-4" />
                <span>Subscribed to Workshop Journal</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7367]">
          <div>
            © {new Date().getFullYear()} KRONOS Atelier Ltd. All rights reserved. Registered in Denmark & Portugal.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-white transition-colors cursor-pointer">25-Year Warranty Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Architectural BIM Access</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
