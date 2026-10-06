import React, { useState } from 'react';
import { SOFA_MODELS, SofaModel } from '../data/furnitureData';
import { ArrowRight, Sliders, Eye, X, Ruler, Check } from 'lucide-react';

interface CollectionsGridProps {
  onSelectModelToCustomize: (modelId: string) => void;
  onOpenSwatchModal: () => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  onSelectModelToCustomize,
  onOpenSwatchModal
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'modular' | 'three-seater' | 'deep-seat' | 'daybed'>('all');
  const [modalModel, setModalModel] = useState<SofaModel | null>(null);

  const filteredModels = SOFA_MODELS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#8A5B38] mb-2">
              <span>Signature Catalog</span>
              <span aria-hidden="true">·</span>
              <span>2026 Atelier Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1B18] tracking-tight">
              Curated Sofas & Seating
            </h2>
            <p className="text-sm sm:text-base text-[#615A52] mt-2 max-w-xl font-light">
              Each archetype is engineered with modular proportions, solid European beech frames, and traditional eight-way hand-tied spring suspension.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#F0ECE2] rounded-lg overflow-x-auto max-w-full border border-[#E3DDCF]">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-[#1E1B18] text-white shadow-sm'
                  : 'text-[#5C544A] hover:text-[#1E1B18]'
              }`}
            >
              All Seating
            </button>
            <button
              onClick={() => setActiveFilter('modular')}
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'modular'
                  ? 'bg-[#1E1B18] text-white shadow-sm'
                  : 'text-[#5C544A] hover:text-[#1E1B18]'
              }`}
            >
              Modular & Sectionals
            </button>
            <button
              onClick={() => setActiveFilter('three-seater')}
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'three-seater'
                  ? 'bg-[#1E1B18] text-white shadow-sm'
                  : 'text-[#5C544A] hover:text-[#1E1B18]'
              }`}
            >
              3-Seater Classics
            </button>
            <button
              onClick={() => setActiveFilter('deep-seat')}
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'deep-seat'
                  ? 'bg-[#1E1B18] text-white shadow-sm'
                  : 'text-[#5C544A] hover:text-[#1E1B18]'
              }`}
            >
              Deep-Seat Loungers
            </button>
            <button
              onClick={() => setActiveFilter('daybed')}
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'daybed'
                  ? 'bg-[#1E1B18] text-white shadow-sm'
                  : 'text-[#5C544A] hover:text-[#1E1B18]'
              }`}
            >
              Daybeds & Chaises
            </button>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((sofa) => (
            <div
              key={sofa.id}
              className="group bg-[#FFFFFF] rounded-xl border border-[#E8E2D6] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Stage */}
              <div className="relative aspect-[4/3] bg-[#F5F2EC] overflow-hidden">
                <img
                  src={sofa.image}
                  alt={sofa.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Clean unboxed tag in top corner */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-medium text-[#4A433A] border border-[#E5E0D5]">
                  {sofa.category.replace('-', ' ')}
                </div>

                {/* Quick inspect button hover */}
                <button
                  onClick={() => setModalModel(sofa)}
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E1B18]/90 text-white p-2 rounded-md hover:bg-[#1E1B18] text-xs flex items-center gap-1.5"
                  title="View technical dimensions"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[11px] uppercase tracking-wider">Inspect</span>
                </button>
              </div>

              {/* Product Info Module */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A5B38] font-semibold">
                      {sofa.designer}
                    </span>
                    <span className="text-xs font-mono text-[#787166]">
                      {sofa.configurations.length} configurations
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-medium text-[#1E1B18] mb-2 group-hover:text-[#8A5B38] transition-colors">
                    {sofa.name}
                  </h3>

                  <p className="text-xs text-[#635C52] font-light leading-relaxed line-clamp-2 mb-4">
                    {sofa.tagline}
                  </p>

                  {/* Clean unboxed dimension specs */}
                  <div className="text-[11px] text-[#787166] flex items-center gap-2 font-mono pb-4 border-b border-[#F0EBE2]">
                    <span>W: {sofa.standardDimensions.width}cm</span>
                    <span aria-hidden="true">·</span>
                    <span>D: {sofa.standardDimensions.depth}cm</span>
                    <span aria-hidden="true">·</span>
                    <span>Seat Ht: {sofa.standardDimensions.seatHeight}cm</span>
                  </div>
                </div>

                {/* Price and Action Bar */}
                <div className="pt-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#7A7368] font-medium">
                      Direct Atelier Price
                    </div>
                    <div className="text-lg font-serif font-semibold text-[#1E1B18] font-mono tabular-nums">
                      From ${sofa.basePrice.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectModelToCustomize(sofa.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-colors"
                  >
                    <span>Customize</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Free Swatch Kit Promotion Bar */}
        <div className="mt-16 bg-[#F4EFE6] border border-[#E0D8CB] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#8A5B38] mb-1">
              Complimentary Tactile Experience
            </div>
            <h4 className="text-2xl font-serif text-[#1E1B18]">
              Order a Custom Box of 5 Upholstery Samples
            </h4>
            <p className="text-xs sm:text-sm text-[#615A52] mt-1 font-light">
              Feel the hand of pre-washed Belgian flax linen, French looped bouclé, and vegetable-tanned Tuscan aniline leathers in your home's natural light.
            </p>
          </div>
          <button
            onClick={onOpenSwatchModal}
            className="px-6 py-3.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E1B18] hover:bg-[#322D28] rounded-md transition-colors whitespace-nowrap shadow-sm"
          >
            Request Free Sample Box
          </button>
        </div>

      </div>

      {/* Technical Inspection Modal */}
      {modalModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl border border-[#E0D8CA] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalModel(null)}
              className="absolute top-4 right-4 p-2 text-[#7A7266] hover:text-[#1E1B18] rounded-full hover:bg-[#F2ECE1]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase tracking-widest font-semibold text-[#8A5B38] mb-1">
              Atelier Technical Blueprint
            </div>
            <h3 className="text-2xl font-serif text-[#1E1B18] mb-2">
              {modalModel.name}
            </h3>
            <p className="text-xs text-[#615A52] font-light leading-relaxed mb-6">
              {modalModel.description}
            </p>

            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[#F5F2EC] mb-6 border border-[#E8E2D6]">
              <img
                src={modalModel.image}
                alt={modalModel.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F8F6F1] rounded-lg border border-[#E5DFD2] mb-6 text-center text-xs">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#787063]">Standard Width</div>
                <div className="font-mono font-medium text-[#1E1B18] mt-1">{modalModel.standardDimensions.width} cm</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#787063]">Total Depth</div>
                <div className="font-mono font-medium text-[#1E1B18] mt-1">{modalModel.standardDimensions.depth} cm</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#787063]">Back Height</div>
                <div className="font-mono font-medium text-[#1E1B18] mt-1">{modalModel.standardDimensions.height} cm</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#787063]">Seat Depth</div>
                <div className="font-mono font-medium text-[#1E1B18] mt-1">{modalModel.standardDimensions.seatDepth} cm</div>
              </div>
            </div>

            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-3">
              Master Craft Engineering Highlights
            </h4>
            <div className="space-y-2 mb-6">
              {modalModel.highlightFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#524B42]">
                  <Check className="w-4 h-4 text-[#8A5B38] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EAE4D8] flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#787165]">Base Specification Price</div>
                <div className="text-xl font-serif font-semibold text-[#1E1B18] font-mono tabular-nums">
                  ${modalModel.basePrice.toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectModelToCustomize(modalModel.id);
                  setModalModel(null);
                }}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-colors"
              >
                Configure in Studio
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
