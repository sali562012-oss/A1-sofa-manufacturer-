import React, { useState } from 'react';
import { FABRICS, FabricOption } from '../data/furnitureData';
import { SwatchKitItem } from '../types/cart';
import { Check, Plus, Layers, ArrowRight, Sparkles, X } from 'lucide-react';

interface SwatchKitSectionProps {
  swatchKit: SwatchKitItem[];
  onAddSwatch: (swatch: SwatchKitItem) => void;
  onRemoveSwatch: (swatchId: string) => void;
  onOpenOrderModal: () => void;
}

export const SwatchKitSection: React.FC<SwatchKitSectionProps> = ({
  swatchKit,
  onAddSwatch,
  onRemoveSwatch,
  onOpenOrderModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Linen', 'Bouclé', 'Leather', 'Velvet', 'Wool'];

  const filteredFabrics = FABRICS.filter(f => {
    if (selectedCategory === 'All') return true;
    return f.category === selectedCategory;
  });

  const isSelected = (fabricId: string) => {
    return swatchKit.some(s => s.fabricId === fabricId);
  };

  const handleToggleSwatch = (fabric: FabricOption) => {
    const existing = swatchKit.find(s => s.fabricId === fabric.id);
    if (existing) {
      onRemoveSwatch(existing.id);
    } else {
      if (swatchKit.length >= 5) {
        alert('You have reached the limit of 5 complimentary swatches. Remove one to add another.');
        return;
      }
      onAddSwatch({
        id: `swatch-${fabric.id}-${Date.now()}`,
        fabricId: fabric.id,
        name: fabric.name,
        colorName: fabric.colorName,
        colorHex: fabric.colorHex,
        category: fabric.category
      });
    }
  };

  return (
    <section id="swatches" className="py-20 lg:py-28 bg-[#F8F6F0] border-b border-[#E7E1D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#8A5B38] mb-2">
              <span>Tactile Library</span>
              <span aria-hidden="true">·</span>
              <span>Complimentary Courier Box</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1B18] tracking-tight">
              Order Your Free Fabric Swatch Box
            </h2>
            <p className="text-sm sm:text-base text-[#615A52] mt-2 max-w-xl font-light">
              Select up to 5 textiles to test drape, light reflectivity, and hand-feel in your living room. Complimentary 48-hour tracked shipping.
            </p>
          </div>

          {/* Floating Swatch Box Counter Card */}
          <div className="bg-white p-4 rounded-xl border border-[#DED6C7] shadow-sm flex items-center gap-4 min-w-[280px]">
            <div className="w-12 h-12 rounded-lg bg-[#F2ECE1] border border-[#DDD3C2] flex items-center justify-center text-[#8A5B38]">
              <Layers className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#1E1B18] flex items-center justify-between">
                <span>Your Swatch Box</span>
                <span className="font-mono text-[#8A5B38]">{swatchKit.length}/5</span>
              </div>
              <div className="w-full bg-[#EAE4D8] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#8A5B38] h-full transition-all duration-300"
                  style={{ width: `${(swatchKit.length / 5) * 100}%` }}
                />
              </div>
              <div className="text-[11px] text-[#787166] mt-1 font-light">
                {5 - swatchKit.length > 0 ? `Select ${5 - swatchKit.length} more` : 'Box complete!'}
              </div>
            </div>
            <button
              disabled={swatchKit.length === 0}
              onClick={onOpenOrderModal}
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E1B18] hover:bg-[#342F2A] disabled:opacity-40 disabled:hover:bg-[#1E1B18] rounded-md transition-all whitespace-nowrap"
            >
              Order Box
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 mb-8 pb-2 overflow-x-auto border-b border-[#E6DFC0]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium rounded-md transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1E1B18] text-white'
                  : 'bg-white/60 text-[#544E45] hover:bg-white hover:text-[#1E1B18]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFabrics.map((fabric) => {
            const added = isSelected(fabric.id);
            return (
              <div
                key={fabric.id}
                className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between group ${
                  added ? 'border-[#8A5B38] ring-2 ring-[#8A5B38]/20 shadow-sm' : 'border-[#E2DCCE] hover:border-[#BFB6A4]'
                }`}
              >
                <div>
                  {/* Color Swatch Canvas preview */}
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-black/10 shadow-inner mb-4 flex items-center justify-center" style={{ backgroundColor: fabric.colorHex }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20" />
                    
                    {/* Texture Label Tag */}
                    <span className="relative z-10 px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm text-white text-[11px] font-mono tracking-wider">
                      {fabric.texturePattern}
                    </span>

                    {/* Added Checkmark Badge */}
                    {added && (
                      <div className="absolute top-2 right-2 bg-[#8A5B38] text-white p-1 rounded-full shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#827A6E] mb-1">
                    <span>{fabric.origin}</span>
                    <span>{fabric.rubCount.toLocaleString()} Rubs</span>
                  </div>

                  <h3 className="text-base font-serif font-medium text-[#1E1B18]">
                    {fabric.name} — <span className="font-sans font-normal text-sm text-[#544D44]">{fabric.colorName}</span>
                  </h3>

                  <p className="text-xs text-[#6B6358] font-light leading-relaxed mt-2">
                    {fabric.description}
                  </p>
                </div>

                {/* Card footer CTA */}
                <div className="mt-5 pt-3 border-t border-[#F0EBE2] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A5B38]">
                    {fabric.category}
                  </span>

                  <button
                    onClick={() => handleToggleSwatch(fabric)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                      added
                        ? 'bg-[#F2ECE1] text-[#8A5B38] hover:bg-rose-50 hover:text-rose-700'
                        : 'bg-[#1E1B18] text-white hover:bg-[#38322B]'
                    }`}
                  >
                    {added ? (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Box</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selected Swatches Drawer at bottom if any selected */}
        {swatchKit.length > 0 && (
          <div className="mt-12 bg-white border border-[#D5CBBA] rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#8A5B38] mb-1">
                Selected Swatches in Courier Kit ({swatchKit.length}/5)
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {swatchKit.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded bg-[#F8F5F0] border border-[#E0D8CB] text-xs text-[#2A251F]"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: item.colorHex }}
                    />
                    <span className="truncate max-w-[140px] font-medium">{item.colorName}</span>
                    <button
                      onClick={() => onRemoveSwatch(item.id)}
                      className="p-0.5 text-[#8A8175] hover:text-rose-600 rounded"
                      aria-label={`Remove ${item.colorName}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenOrderModal}
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-colors whitespace-nowrap shadow-sm"
            >
              Dispatch Complimentary Box (Free)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
