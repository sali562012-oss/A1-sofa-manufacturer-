import React, { useState, useMemo } from 'react';
import { 
  SOFA_MODELS, 
  FABRICS, 
  LEGS, 
  CUSHION_FILLS, 
  SofaModel, 
  FabricOption, 
  LegOption 
} from '../data/furnitureData';
import { CartConfiguredSofa, SwatchKitItem } from '../types/cart';
import { 
  Check, 
  Ruler, 
  Layers, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  RotateCcw, 
  Info, 
  Clock, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';

interface InteractiveConfiguratorProps {
  selectedModelId?: string;
  onAddToCart: (item: CartConfiguredSofa) => void;
  onAddSwatch: (swatch: SwatchKitItem) => void;
}

export const InteractiveConfigurator: React.FC<InteractiveConfiguratorProps> = ({
  selectedModelId = 'elysian',
  onAddToCart,
  onAddSwatch
}) => {
  // State
  const [activeModelId, setActiveModelId] = useState<string>(selectedModelId);
  const currentModel = useMemo(
    () => SOFA_MODELS.find(m => m.id === activeModelId) || SOFA_MODELS[0],
    [activeModelId]
  );

  const [selectedConfigId, setSelectedConfigId] = useState<string>(
    currentModel.configurations[0].id
  );

  // Sync config when model changes
  React.useEffect(() => {
    setSelectedConfigId(currentModel.configurations[0].id);
  }, [currentModel]);

  const [selectedFabricId, setSelectedFabricId] = useState<string>('linen-oat');
  const [selectedLegId, setSelectedLegId] = useState<string>('oiled-walnut');
  const [selectedFillId, setSelectedFillId] = useState<string>('dual-hybrid');
  const [viewMode, setViewMode] = useState<'render' | 'blueprint'>('render');
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [addedNotice, setAddedNotice] = useState(false);

  // Selected entities
  const activeConfig = useMemo(() => {
    return currentModel.configurations.find(c => c.id === selectedConfigId) || currentModel.configurations[0];
  }, [currentModel, selectedConfigId]);

  const activeFabric = useMemo(() => {
    return FABRICS.find(f => f.id === selectedFabricId) || FABRICS[0];
  }, [selectedFabricId]);

  const activeLeg = useMemo(() => {
    return LEGS.find(l => l.id === selectedLegId) || LEGS[0];
  }, [selectedLegId]);

  const activeFill = useMemo(() => {
    return CUSHION_FILLS.find(f => f.id === selectedFillId) || CUSHION_FILLS[0];
  }, [selectedFillId]);

  // Price Calculation
  const totalPrice = useMemo(() => {
    const base = currentModel.basePrice + activeConfig.priceDelta;
    const fabricTotal = base * (activeFabric.priceMultiplier - 1);
    const fillTotal = activeFill.priceDelta;
    return Math.round(base + fabricTotal + fillTotal);
  }, [currentModel, activeConfig, activeFabric, activeFill]);

  // Unit conversion helper
  const formatDim = (valCm: number) => {
    if (unit === 'in') {
      return `${Math.round(valCm * 0.3937)}″`;
    }
    return `${valCm} cm`;
  };

  const handleAddSofaToCart = () => {
    const sofaItem: CartConfiguredSofa = {
      id: `${currentModel.id}-${Date.now()}`,
      model: currentModel,
      configurationId: activeConfig.id,
      configurationName: activeConfig.name,
      width: activeConfig.width,
      depth: activeConfig.depth,
      height: activeConfig.height,
      fabric: activeFabric,
      leg: activeLeg,
      cushionFillId: activeFill.id,
      cushionFillName: activeFill.name,
      totalPrice: totalPrice,
      quantity: 1,
      whiteGloveDelivery: true
    };
    onAddToCart(sofaItem);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleQuickAddSwatch = () => {
    onAddSwatch({
      id: `swatch-${activeFabric.id}`,
      fabricId: activeFabric.id,
      name: activeFabric.name,
      colorName: activeFabric.colorName,
      colorHex: activeFabric.colorHex,
      category: activeFabric.category
    });
  };

  const handleExportSpecSheet = () => {
    const printContent = `
      KRONOS ATELIER | SPECIFICATION SHEET
      Model: ${currentModel.name}
      Configuration: ${activeConfig.name}
      Dimensions: ${activeConfig.width}W × ${activeConfig.depth}D × ${activeConfig.height}H cm
      Upholstery: ${activeFabric.name} - ${activeFabric.colorName} (${activeFabric.origin}, Martindale ${activeFabric.rubCount.toLocaleString()})
      Chassis / Legs: ${activeLeg.name} (${activeLeg.material})
      Cushion Core: ${activeFill.name} (${activeFill.firmness})
      Internal Carcass: FSC-Certified European Solid Beech & White Oak
      Suspension: 8-Way Hand-Tied High-Tensile Carbon Steel Coils
      Total Price: $${totalPrice.toLocaleString()} USD
      Workshop: Porto Atelier, Handcrafted to Order (Lead Time: 4–6 Weeks)
      Guarantee: 25-Year Transferable Structural Warranty
    `;
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`<pre style="font-family: monospace; padding: 40px; font-size: 14px; line-height: 1.6;">${printContent}</pre>`);
      newWindow.document.close();
      newWindow.print();
    }
  };

  // Grouped fabrics
  const fabricCategories = ['Linen', 'Bouclé', 'Leather', 'Velvet', 'Wool'] as const;
  const [activeFabricTab, setActiveFabricTab] = useState<string>('Linen');

  return (
    <section id="configurator" className="py-16 lg:py-24 bg-[#F5F3EE] border-y border-[#E5E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#8A5B38] mb-2">
              <span>Interactive Workshop</span>
              <span aria-hidden="true">·</span>
              <span>Bespoke 3D & Blueprint Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1B18] tracking-tight">
              Design Your Heirloom Sofa
            </h2>
            <p className="text-sm sm:text-base text-[#615A52] mt-2 max-w-2xl font-light">
              Customize dimensions, select certified European upholstery bolts, choose hand-turned timber legs, and visualize technical clearance.
            </p>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#E8E2D6] rounded-lg overflow-x-auto max-w-full">
            {SOFA_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setActiveModelId(model.id);
                }}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeModelId === model.id
                    ? 'bg-[#1E1B18] text-white shadow-sm'
                    : 'text-[#4A443C] hover:text-[#1E1B18]'
                }`}
              >
                {model.name.replace('The ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Dynamic Viewport & Blueprint (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sticky lg:top-28">
            
            {/* Viewport Card */}
            <div className="relative bg-[#FFFFFF] rounded-xl border border-[#E3DDCF] shadow-md overflow-hidden aspect-[4/3] sm:aspect-[16/11] flex flex-col justify-between p-6">
              
              {/* Top Viewport Controls */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 rounded-md border border-[#E2DBD0]">
                  <button
                    onClick={() => setViewMode('render')}
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-medium rounded transition-colors ${
                      viewMode === 'render' ? 'bg-[#1E1B18] text-white' : 'text-[#5C5449] hover:text-[#1E1B18]'
                    }`}
                  >
                    Atelier View
                  </button>
                  <button
                    onClick={() => setViewMode('blueprint')}
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-medium rounded transition-colors flex items-center gap-1.5 ${
                      viewMode === 'blueprint' ? 'bg-[#1E1B18] text-white' : 'text-[#5C5449] hover:text-[#1E1B18]'
                    }`}
                  >
                    <Ruler className="w-3 h-3" />
                    <span>CAD Blueprint</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-xs font-mono bg-[#F5F2EB] rounded border border-[#E2DBD0] p-0.5">
                    <button
                      onClick={() => setUnit('cm')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        unit === 'cm' ? 'bg-[#1E1B18] text-white' : 'text-[#615A52]'
                      }`}
                    >
                      CM
                    </button>
                    <button
                      onClick={() => setUnit('in')}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        unit === 'in' ? 'bg-[#1E1B18] text-white' : 'text-[#615A52]'
                      }`}
                    >
                      IN
                    </button>
                  </div>

                  <button
                    onClick={handleExportSpecSheet}
                    className="p-1.5 text-[#5C5449] hover:text-[#1E1B18] bg-[#F5F2EB] hover:bg-[#ECE6DC] rounded border border-[#E2DBD0] transition-colors"
                    title="Export / Print CAD Spec Sheet"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CENTER: Dynamic Interactive Visual Representation */}
              <div className="my-auto relative w-full flex items-center justify-center min-h-[260px]">
                {viewMode === 'render' ? (
                  // Realistic Isometric Styled SVG Render
                  <div className="relative w-full max-w-[520px] transition-all duration-500">
                    <svg viewBox="0 0 600 380" className="w-full h-auto drop-shadow-xl">
                      <defs>
                        {/* Shadow Gradient */}
                        <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="rgba(30, 27, 24, 0.25)" />
                          <stop offset="100%" stopColor="rgba(30, 27, 24, 0)" />
                        </radialGradient>
                        
                        {/* Fabric shading filter */}
                        <linearGradient id="sofaShading" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
                          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                        </linearGradient>

                        <linearGradient id="cushionHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
                          <stop offset="85%" stopColor="#000000" stopOpacity="0" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>

                      {/* Floor Cast Shadow */}
                      <ellipse cx="300" cy="340" rx="260" ry="24" fill="url(#floorShadow)" />

                      {/* Sofa Legs based on activeLeg */}
                      <g id="sofa-legs">
                        <polygon points="100,310 112,342 126,342 116,310" fill={activeLeg.colorHex} />
                        <polygon points="490,310 478,342 464,342 474,310" fill={activeLeg.colorHex} />
                        <polygon points="170,310 178,338 188,338 182,310" fill={activeLeg.colorHex} opacity="0.85" />
                        <polygon points="420,310 412,338 402,338 408,310" fill={activeLeg.colorHex} opacity="0.85" />
                        {activeLeg.id === 'brushed-brass' && (
                          <g>
                            <circle cx="119" cy="341" r="3" fill="#D4AF37" />
                            <circle cx="471" cy="341" r="3" fill="#D4AF37" />
                          </g>
                        )}
                      </g>

                      {/* Plinth / Base Rail */}
                      <rect 
                        x="90" 
                        y="298" 
                        width="420" 
                        height="14" 
                        rx="3" 
                        fill={activeLeg.colorHex} 
                        stroke="#1E1B18" 
                        strokeWidth="0.5"
                      />

                      {/* Main Sofa Body Shell (Backrest + Outer Frame) */}
                      <path
                        d="M 80 180 C 80 145, 120 135, 160 135 L 440 135 C 480 135, 520 145, 520 180 L 520 298 L 80 298 Z"
                        fill={activeFabric.colorHex}
                        stroke="#2B2621"
                        strokeWidth="1.5"
                      />
                      {/* Fabric Shading Overlay */}
                      <path
                        d="M 80 180 C 80 145, 120 135, 160 135 L 440 135 C 480 135, 520 145, 520 180 L 520 298 L 80 298 Z"
                        fill="url(#sofaShading)"
                      />

                      {/* Back Cushions (2 or 3 depending on model configuration) */}
                      {activeConfig.seats >= 4 ? (
                        <g id="back-cushions-3">
                          <rect x="95" y="145" width="130" height="95" rx="14" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1" />
                          <rect x="95" y="145" width="130" height="95" rx="14" fill="url(#cushionHighlight)" />
                          <line x1="160" y1="165" x2="160" y2="220" stroke="#000" strokeOpacity="0.12" strokeDasharray="3 3" />
                          
                          <rect x="235" y="145" width="130" height="95" rx="14" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1" />
                          <rect x="235" y="145" width="130" height="95" rx="14" fill="url(#cushionHighlight)" />
                          <line x1="300" y1="165" x2="300" y2="220" stroke="#000" strokeOpacity="0.12" strokeDasharray="3 3" />

                          <rect x="375" y="145" width="130" height="95" rx="14" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1" />
                          <rect x="375" y="145" width="130" height="95" rx="14" fill="url(#cushionHighlight)" />
                          <line x1="440" y1="165" x2="440" y2="220" stroke="#000" strokeOpacity="0.12" strokeDasharray="3 3" />
                        </g>
                      ) : (
                        <g id="back-cushions-2">
                          <rect x="100" y="145" width="195" height="95" rx="14" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1" />
                          <rect x="100" y="145" width="195" height="95" rx="14" fill="url(#cushionHighlight)" />
                          <line x1="197" y1="165" x2="197" y2="220" stroke="#000" strokeOpacity="0.12" strokeDasharray="3 3" />

                          <rect x="305" y="145" width="195" height="95" rx="14" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1" />
                          <rect x="305" y="145" width="195" height="95" rx="14" fill="url(#cushionHighlight)" />
                          <line x1="402" y1="165" x2="402" y2="220" stroke="#000" strokeOpacity="0.12" strokeDasharray="3 3" />
                        </g>
                      )}

                      {/* Left & Right Armrests with French Seaming */}
                      <path
                        d="M 68 205 C 68 185, 95 185, 115 190 L 115 298 L 68 298 Z"
                        fill={activeFabric.colorHex}
                        stroke="#2B2621"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M 68 205 C 68 185, 95 185, 115 190 L 115 298 L 68 298 Z"
                        fill="url(#cushionHighlight)"
                      />

                      <path
                        d="M 532 205 C 532 185, 505 185, 485 190 L 485 298 L 532 298 Z"
                        fill={activeFabric.colorHex}
                        stroke="#2B2621"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M 532 205 C 532 185, 505 185, 485 190 L 485 298 L 532 298 Z"
                        fill="url(#cushionHighlight)"
                      />

                      {/* Seat Cushions */}
                      {activeConfig.seats >= 4 ? (
                        <g id="seat-cushions-3">
                          <rect x="115" y="240" width="120" height="58" rx="8" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1.2" />
                          <rect x="115" y="240" width="120" height="58" rx="8" fill="url(#cushionHighlight)" />
                          
                          <rect x="240" y="240" width="120" height="58" rx="8" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1.2" />
                          <rect x="240" y="240" width="120" height="58" rx="8" fill="url(#cushionHighlight)" />

                          <rect x="365" y="240" width="120" height="58" rx="8" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1.2" />
                          <rect x="365" y="240" width="120" height="58" rx="8" fill="url(#cushionHighlight)" />
                        </g>
                      ) : (
                        <g id="seat-cushions-2">
                          <rect x="115" y="240" width="180" height="58" rx="8" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1.2" />
                          <rect x="115" y="240" width="180" height="58" rx="8" fill="url(#cushionHighlight)" />
                          
                          <rect x="305" y="240" width="180" height="58" rx="8" fill={activeFabric.colorHex} stroke="#2B2621" strokeWidth="1.2" />
                          <rect x="305" y="240" width="180" height="58" rx="8" fill="url(#cushionHighlight)" />
                        </g>
                      )}

                      {/* Delicate Tailored Edge Stitches */}
                      <line x1="72" y1="210" x2="72" y2="295" stroke="#FFFFFF" strokeOpacity="0.4" strokeDasharray="2 3" />
                      <line x1="528" y1="210" x2="528" y2="295" stroke="#FFFFFF" strokeOpacity="0.4" strokeDasharray="2 3" />
                    </svg>

                    {/* Material callout pill overlay */}
                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded border border-[#E5E0D5] text-[11px] text-[#423C35] shadow-sm flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: activeFabric.colorHex }} />
                      <span>{activeFabric.name} in {activeFabric.colorName}</span>
                    </div>
                  </div>
                ) : (
                  // Architectural CAD Blueprint Wireframe View
                  <div className="w-full max-w-[540px] py-4">
                    <svg viewBox="0 0 560 320" className="w-full h-auto text-[#1E1B18] font-mono text-[11px]">
                      {/* Grid background */}
                      <defs>
                        <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ECE8DF" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="560" height="320" fill="url(#cadGrid)" />

                      {/* Top Elevation Box (Top Down projection) */}
                      <g transform="translate(60, 30)">
                        <rect x="0" y="0" width="240" height="90" fill="none" stroke="#1E1B18" strokeWidth="1.5" />
                        <text x="120" y="48" textAnchor="middle" fill="#6B6358">TOP ELEVATION (PLAN)</text>
                        {/* Internal Seat Depth indicator */}
                        <line x1="250" y1="0" x2="250" y2="90" stroke="#8A5B38" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="258" y="48" fill="#8A5B38">D: {formatDim(activeConfig.depth)}</text>
                      </g>

                      {/* Front Elevation Projection */}
                      <g transform="translate(60, 160)">
                        <rect x="0" y="0" width="240" height="80" rx="4" fill="none" stroke="#1E1B18" strokeWidth="1.5" />
                        {/* Legs */}
                        <line x1="20" y1="80" x2="20" y2="100" stroke="#1E1B18" strokeWidth="2" />
                        <line x1="220" y1="80" x2="220" y2="100" stroke="#1E1B18" strokeWidth="2" />
                        <text x="120" y="45" textAnchor="middle" fill="#6B6358">FRONT ELEVATION</text>
                        
                        {/* Seat Height Datum */}
                        <line x1="0" y1="45" x2="240" y2="45" stroke="#8A5B38" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="120" y="40" textAnchor="middle" fill="#8A5B38" fontSize="10">SEAT HT: {formatDim(currentModel.standardDimensions.seatHeight)}</text>
                      </g>

                      {/* Dimension: Total Width */}
                      <g transform="translate(60, 275)">
                        <line x1="0" y1="0" x2="240" y2="0" stroke="#1E1B18" strokeWidth="1.2" />
                        <line x1="0" y1="-6" x2="0" y2="6" stroke="#1E1B18" strokeWidth="1.2" />
                        <line x1="240" y1="-6" x2="240" y2="6" stroke="#1E1B18" strokeWidth="1.2" />
                        <text x="120" y="16" textAnchor="middle" fill="#1E1B18" fontWeight="bold">
                          TOTAL WIDTH: {formatDim(activeConfig.width)}
                        </text>
                      </g>

                      {/* Dimension: Total Height */}
                      <g transform="translate(320, 160)">
                        <line x1="0" y1="0" x2="0" y2="100" stroke="#1E1B18" strokeWidth="1.2" />
                        <line x1="-6" y1="0" x2="6" y2="0" stroke="#1E1B18" strokeWidth="1.2" />
                        <line x1="-6" y1="100" x2="6" y2="100" stroke="#1E1B18" strokeWidth="1.2" />
                        <text x="12" y="55" fill="#1E1B18" fontWeight="bold">
                          HT: {formatDim(activeConfig.height)}
                        </text>
                      </g>

                      {/* Technical Specs callout */}
                      <g transform="translate(370, 40)">
                        <text x="0" y="15" fill="#1E1B18" fontWeight="bold">FRAME CALIPER</text>
                        <text x="0" y="32" fill="#5C5449">Kiln-Dried European Beech</text>
                        <text x="0" y="48" fill="#5C5449">Seat Depth: {formatDim(currentModel.standardDimensions.seatDepth)}</text>
                        <text x="0" y="64" fill="#5C5449">Seats: {activeConfig.seats} Adults</text>
                        <text x="0" y="80" fill="#5C5449">Leg Height: {formatDim(16)}</text>
                      </g>
                    </svg>
                  </div>
                )}
              </div>

              {/* Bottom Blueprint Summary Bar */}
              <div className="pt-4 border-t border-[#EAE4D8] grid grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <div className="text-[#787166] uppercase text-[10px] tracking-wider font-semibold">Width</div>
                  <div className="font-mono font-medium text-[#1E1B18] mt-0.5">{formatDim(activeConfig.width)}</div>
                </div>
                <div>
                  <div className="text-[#787166] uppercase text-[10px] tracking-wider font-semibold">Depth</div>
                  <div className="font-mono font-medium text-[#1E1B18] mt-0.5">{formatDim(activeConfig.depth)}</div>
                </div>
                <div>
                  <div className="text-[#787166] uppercase text-[10px] tracking-wider font-semibold">Height</div>
                  <div className="font-mono font-medium text-[#1E1B18] mt-0.5">{formatDim(activeConfig.height)}</div>
                </div>
                <div>
                  <div className="text-[#787166] uppercase text-[10px] tracking-wider font-semibold">Seat Height</div>
                  <div className="font-mono font-medium text-[#1E1B18] mt-0.5">{formatDim(currentModel.standardDimensions.seatHeight)}</div>
                </div>
              </div>

            </div>

            {/* Atelier Craftsmanship Note */}
            <div className="bg-[#FAF7F2] p-4 rounded-lg border border-[#E5DFD3] flex items-center justify-between text-xs text-[#524B42]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8A5B38] shrink-0" />
                <span>
                  <strong>Workshop Status:</strong> Batch slots open in Porto atelier. Hand-tailored in ~4–5 weeks.
                </span>
              </div>
              <button
                onClick={handleQuickAddSwatch}
                className="text-[#8A5B38] hover:text-[#1E1B18] font-semibold underline whitespace-nowrap ml-2"
              >
                + Add Free Swatch
              </button>
            </div>

          </div>

          {/* RIGHT: Customization Control Module (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-xl border border-[#E3DDCF] shadow-sm">
            
            {/* Header: Model & Designer */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest text-[#8A5B38] font-semibold">
                  {currentModel.designer}
                </span>
                <span className="text-xs text-[#70685D] font-mono">
                  Code: KRO-{currentModel.id.toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-serif text-[#1E1B18]">
                {currentModel.name}
              </h3>
              <p className="text-xs text-[#635C52] mt-1 font-light leading-relaxed">
                {currentModel.description}
              </p>
            </div>

            <hr className="border-[#ECE6DC]" />

            {/* Step 1: Configuration / Layout */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-2.5">
                1. Select Size & Configuration
              </label>
              <div className="flex flex-col gap-2">
                {currentModel.configurations.map((config) => (
                  <button
                    key={config.id}
                    onClick={() => setSelectedConfigId(config.id)}
                    className={`p-3 text-left rounded-lg border transition-all flex items-center justify-between ${
                      selectedConfigId === config.id
                        ? 'border-[#1E1B18] bg-[#F7F5F0] text-[#1E1B18] shadow-sm'
                        : 'border-[#E8E2D6] hover:border-[#C4BCAD] text-[#4A443C]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{config.name}</div>
                      <div className="text-[11px] text-[#70685E] font-mono mt-0.5">
                        {formatDim(config.width)} × {formatDim(config.depth)} × {formatDim(config.height)} · Seats {config.seats}
                      </div>
                    </div>
                    <div className="text-xs font-mono font-medium">
                      {config.priceDelta > 0 ? `+$${config.priceDelta}` : config.priceDelta < 0 ? `-$${Math.abs(config.priceDelta)}` : 'Standard'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Upholstery Fabric & Leather */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1E1B18]">
                  2. Upholstery Fabric & Leather
                </label>
                <span className="text-xs text-[#8A5B38] font-medium">
                  {activeFabric.name} · {activeFabric.colorName}
                </span>
              </div>

              {/* Fabric category tabs */}
              <div className="flex items-center gap-1 mb-3 border-b border-[#EBE5DB] pb-1">
                {fabricCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFabricTab(cat)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      activeFabricTab === cat
                        ? 'bg-[#1E1B18] text-white'
                        : 'text-[#615A52] hover:text-[#1E1B18]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Swatch chips grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {FABRICS.filter(f => f.category === activeFabricTab).map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabricId(fabric.id)}
                    className={`relative p-1 rounded-lg border transition-all flex flex-col items-center group ${
                      selectedFabricId === fabric.id
                        ? 'border-[#1E1B18] ring-2 ring-[#1E1B18]/15 bg-[#F9F7F4]'
                        : 'border-[#E2DBD0] hover:border-[#A89E8F]'
                    }`}
                    title={`${fabric.name} - ${fabric.colorName} (${fabric.origin})`}
                  >
                    <div
                      className="w-10 h-10 rounded-md shadow-inner border border-black/10 flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: fabric.colorHex }}
                    >
                      {selectedFabricId === fabric.id && (
                        <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                      )}
                    </div>
                    <span className="text-[10px] text-center text-[#4A433A] mt-1.5 truncate max-w-full font-medium">
                      {fabric.colorName}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active fabric specifications callout */}
              <div className="mt-3 p-3 bg-[#FAF7F2] rounded-lg border border-[#E8E2D7] text-xs">
                <div className="flex items-center justify-between text-[#5C5449] mb-1 font-mono text-[11px]">
                  <span>Origin: {activeFabric.origin}</span>
                  <span>Martindale: {activeFabric.rubCount.toLocaleString()} rubs</span>
                </div>
                <p className="text-[11px] text-[#696156] font-light leading-relaxed">
                  {activeFabric.description}
                </p>
                <div className="mt-2 pt-2 border-t border-[#EAE4D8] flex items-center justify-between">
                  <span className="text-[11px] text-[#8A5B38] font-medium">
                    {activeFabric.priceMultiplier === 1.0 ? 'Included in base price' : `Tier Grade: +${Math.round((activeFabric.priceMultiplier - 1) * 100)}%`}
                  </span>
                  <button
                    onClick={handleQuickAddSwatch}
                    className="text-[11px] font-semibold text-[#1E1B18] hover:text-[#8A5B38] underline"
                  >
                    Request Free Sample
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Leg & Plinth Finish */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-2.5">
                3. Timber Leg & Chassis Finish
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LEGS.map((leg) => (
                  <button
                    key={leg.id}
                    onClick={() => setSelectedLegId(leg.id)}
                    className={`p-2.5 text-left rounded-lg border transition-all flex items-center gap-2.5 ${
                      selectedLegId === leg.id
                        ? 'border-[#1E1B18] bg-[#F7F5F0] text-[#1E1B18]'
                        : 'border-[#E8E2D6] hover:border-[#C4BCAD] text-[#4A443C]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-black/20 shadow-sm"
                      style={{ backgroundColor: leg.colorHex }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">{leg.name}</div>
                      <div className="text-[10px] text-[#70685E] truncate">{leg.texture}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Cushion Fill & Firmness */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-2.5">
                4. Cushion Ergonomics & Core Fill
              </label>
              <div className="flex flex-col gap-2">
                {CUSHION_FILLS.map((fill) => (
                  <button
                    key={fill.id}
                    onClick={() => setSelectedFillId(fill.id)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      selectedFillId === fill.id
                        ? 'border-[#1E1B18] bg-[#F7F5F0] text-[#1E1B18]'
                        : 'border-[#E8E2D6] hover:border-[#C4BCAD] text-[#4A443C]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{fill.name}</span>
                      <span className="font-mono text-[#8A5B38]">
                        {fill.priceDelta > 0 ? `+$${fill.priceDelta}` : 'Included'}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#696156] mt-0.5">
                      {fill.firmness} · {fill.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-[#ECE6DC]" />

            {/* Summary & Price Checkout Module */}
            <div className="pt-2">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#736B60] font-semibold">
                    Total Atelier Price
                  </div>
                  <div className="text-xs text-[#7A7266] font-light">
                    Handmade to order · White-Glove delivery eligible
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-serif font-semibold text-[#1E1B18] font-mono tabular-nums">
                    ${totalPrice.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#8A5B38] font-medium">
                    Direct workshop pricing (Save ~40% vs retail)
                  </div>
                </div>
              </div>

              {addedNotice && (
                <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md text-center font-medium animate-fadeIn">
                  ✓ Custom sofa added to your specification cart!
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddSofaToCart}
                  className="flex-1 py-3.5 px-6 text-xs uppercase tracking-widest font-semibold text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Add Custom Spec to Cart</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleQuickAddSwatch}
                  className="py-3.5 px-4 text-xs uppercase tracking-wider font-medium text-[#1E1B18] bg-[#F2EDE4] hover:bg-[#E8DFD3] rounded-md border border-[#D5CEBF] transition-all whitespace-nowrap"
                  title="Order sample of this selected fabric"
                >
                  Order Free Swatch
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#7A7267]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8A5B38]" />
                  25-Year Guarantee
                </span>
                <span>·</span>
                <span>100-Day In-Home Trial</span>
                <span>·</span>
                <span>Zero Sales Tax</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
