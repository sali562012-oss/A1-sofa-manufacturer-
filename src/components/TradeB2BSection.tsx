import React, { useState } from 'react';
import { Building2, Download, Scissors, Check, Sparkles, FileSpreadsheet, ArrowRight } from 'lucide-react';

export const TradeB2BSection: React.FC = () => {
  const [tradeForm, setTradeForm] = useState({
    firmName: '',
    contactName: '',
    workEmail: '',
    profession: 'Interior Architecture',
    projectScope: 'Boutique Hotel / Hospitality',
    quantity: '6–15 pieces',
    customNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [cadDownloaded, setCadDownloaded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownloadCAD = () => {
    setCadDownloaded(true);
    setTimeout(() => setCadDownloaded(false), 4000);
  };

  return (
    <section id="trade" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E7E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#8A5B38] mb-3">
            <span>Contract & Trade Program</span>
            <span aria-hidden="true">·</span>
            <span>Architects & Interior Designers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1B18] tracking-tight leading-tight">
            Engineered for Hospitality, Residences & Commercial Architecture
          </h2>
          <p className="text-sm sm:text-base text-[#615A52] mt-3 font-light leading-relaxed">
            We partner with premier design practices worldwide. Benefit from tier trade pricing, dedicated technical project managers, custom COM upholstery, and certified Crib 5 fire compliance.
          </p>
        </div>

        {/* 3 Pillars of Trade Program */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#E8E2D6] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EFE9DF] border border-[#DDD3C4] flex items-center justify-center text-[#8A5B38] mb-4">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-[#1E1B18] mb-2">
                COM (Customer's Own Material)
              </h3>
              <p className="text-xs text-[#635C52] leading-relaxed font-light">
                Specify any external fabric bolt from Pierre Frey, Dedar, Kvadrat, or Holland & Sherry. We cut, match pattern repeats, and tailor to your exact technical specifications.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE4D7] text-[11px] font-mono text-[#8A5B38]">
              COM Yardage Calculator Available
            </div>
          </div>

          <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#E8E2D6] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EFE9DF] border border-[#DDD3C4] flex items-center justify-center text-[#8A5B38] mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-[#1E1B18] mb-2">
                Sub-Millimeter Bespoke Sizing
              </h3>
              <p className="text-xs text-[#635C52] leading-relaxed font-light">
                Need a 342cm curved sectional to fit a specific alcove? We build our solid beech frames in-house without the rigid increments of retail mass production.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE4D7] text-[11px] font-mono text-[#8A5B38]">
              Custom Lengths, Depths & Ergonomics
            </div>
          </div>

          <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#E8E2D6] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EFE9DF] border border-[#DDD3C4] flex items-center justify-center text-[#8A5B38] mb-4">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-[#1E1B18] mb-2">
                Complete BIM / CAD Library
              </h3>
              <p className="text-xs text-[#635C52] leading-relaxed font-light">
                Direct access to high-fidelity 3D assets for Revit (.rfa), SketchUp (.skp), Rhino, and AutoCAD (.dwg) with precise clearance geometries and realistic textures.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EAE4D7]">
              <button
                onClick={handleDownloadCAD}
                className="text-[11px] font-mono text-[#1E1B18] hover:text-[#8A5B38] font-semibold underline flex items-center gap-1"
              >
                {cadDownloaded ? '✓ 2026 Spec Assets Downloaded' : 'Download Complete 3D Pack (.ZIP)'}
              </button>
            </div>
          </div>
        </div>

        {/* Trade Application & Custom Quote Form */}
        <div className="bg-[#FAF8F5] border border-[#E3DDCF] rounded-xl p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest text-[#8A5B38] font-semibold">
                Direct Manufacturer Portal
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1E1B18] mt-1 mb-3">
                Apply for Trade Account & Volume Quotes
              </h3>
              <p className="text-xs sm:text-sm text-[#615A52] font-light leading-relaxed mb-6">
                Receive our comprehensive trade catalog, designer trade pricing tiers (20%–35% off), dedicated trade account manager, and priority workshop scheduling.
              </p>

              <div className="space-y-3 text-xs text-[#524B41]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8A5B38]" />
                  <span>Immediate verification for licensed architects & registered studios</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8A5B38]" />
                  <span>Complimentary master trade swatch binder (all 28 textiles)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8A5B38]" />
                  <span>White-glove worldwide shipping with installation staging</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-[#E2DBD0] shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                        Architecture / Design Firm *
                      </label>
                      <input
                        type="text"
                        required
                        value={tradeForm.firmName}
                        onChange={(e) => setTradeForm({ ...tradeForm, firmName: e.target.value })}
                        placeholder="Studio K Studio Ltd."
                        className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={tradeForm.contactName}
                        onChange={(e) => setTradeForm({ ...tradeForm, contactName: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={tradeForm.workEmail}
                        onChange={(e) => setTradeForm({ ...tradeForm, workEmail: e.target.value })}
                        placeholder="s.jenkins@studio.com"
                        className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                        Practice Type
                      </label>
                      <select
                        value={tradeForm.profession}
                        onChange={(e) => setTradeForm({ ...tradeForm, profession: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] focus:outline-none focus:ring-1 focus:ring-[#1E1B18] bg-white"
                      >
                        <option>Interior Architecture</option>
                        <option>Commercial Architect</option>
                        <option>Hospitality Developer</option>
                        <option>High-End Residential Designer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                        Current Project Scope
                      </label>
                      <select
                        value={tradeForm.projectScope}
                        onChange={(e) => setTradeForm({ ...tradeForm, projectScope: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] focus:outline-none focus:ring-1 focus:ring-[#1E1B18] bg-white"
                      >
                        <option>Boutique Hotel / Hospitality</option>
                        <option>Luxury Private Residence</option>
                        <option>Executive Corporate Office</option>
                        <option>Multi-Unit Residential Development</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                        Estimated Volume
                      </label>
                      <select
                        value={tradeForm.quantity}
                        onChange={(e) => setTradeForm({ ...tradeForm, quantity: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] focus:outline-none focus:ring-1 focus:ring-[#1E1B18] bg-white"
                      >
                        <option>1–3 bespoke pieces</option>
                        <option>4–10 suites</option>
                        <option>10–25 contract units</option>
                        <option>25+ full property fitout</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                      Project Notes / Special Dimensions or COM Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={tradeForm.customNotes}
                      onChange={(e) => setTradeForm({ ...tradeForm, customNotes: e.target.value })}
                      placeholder="e.g. Need curved modular sofas with Crib 5 fire treated Pierre Frey boucle for an upcoming hotel lobby..."
                      className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-colors shadow-sm"
                  >
                    Submit Trade Application & Request Quote
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif text-[#1E1B18] mb-1">
                    Trade Application Received
                  </h4>
                  <p className="text-xs text-[#635C52] max-w-sm mx-auto font-light leading-relaxed mb-4">
                    Thank you, {tradeForm.contactName}. Our Head of Contract Partnerships has received your inquiry for <strong>{tradeForm.firmName}</strong> and will transmit your trade catalog and volume pricing within 4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#1E1B18] underline hover:text-[#8A5B38]"
                  >
                    Submit another project specification
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
