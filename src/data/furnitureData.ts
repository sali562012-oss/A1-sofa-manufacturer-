export interface FabricOption {
  id: string;
  name: string;
  category: 'Linen' | 'Bouclé' | 'Leather' | 'Velvet' | 'Wool';
  colorName: string;
  colorHex: string;
  texturePattern: string;
  rubCount: number; // Martindale
  origin: string;
  priceMultiplier: number;
  description: string;
}

export interface LegOption {
  id: string;
  name: string;
  material: string;
  colorHex: string;
  texture: string;
}

export interface SofaModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  category: 'modular' | 'three-seater' | 'deep-seat' | 'daybed';
  image: string;
  altImage?: string;
  standardDimensions: {
    width: number; // cm
    depth: number;
    height: number;
    seatDepth: number;
    seatHeight: number;
  };
  configurations: {
    id: string;
    name: string;
    width: number;
    depth: number;
    height: number;
    priceDelta: number;
    seats: number;
  }[];
  highlightFeatures: string[];
  designer: string;
}

export interface SwatchSample {
  id: string;
  fabricId: string;
  name: string;
  category: string;
  colorName: string;
  colorHex: string;
  origin: string;
}

export const FABRICS: FabricOption[] = [
  {
    id: 'linen-oat',
    name: 'Belgian Heritage Linen',
    category: 'Linen',
    colorName: 'Warm Oat',
    colorHex: '#D8CBB7',
    texturePattern: 'fine-linen',
    rubCount: 45000,
    origin: 'Kortrijk, Belgium',
    priceMultiplier: 1.0,
    description: '100% natural long-staple flax. Pre-washed for a relaxed, breathable drape with subtle tactile slub.'
  },
  {
    id: 'linen-slate',
    name: 'Belgian Heritage Linen',
    category: 'Linen',
    colorName: 'Mineral Slate',
    colorHex: '#8C928F',
    texturePattern: 'fine-linen',
    rubCount: 45000,
    origin: 'Kortrijk, Belgium',
    priceMultiplier: 1.0,
    description: 'Woven from dyed Belgian flax with natural cooling properties and gentle organic stonewash.'
  },
  {
    id: 'boucle-chalk',
    name: 'Bouclé de Lyon',
    category: 'Bouclé',
    colorName: 'Chalk Cream',
    colorHex: '#EDE8DF',
    texturePattern: 'boucle-loop',
    rubCount: 65000,
    origin: 'Lyon, France',
    priceMultiplier: 1.15,
    description: 'High-density looped wool and cotton blend. Sculptural, cloud-like depth with heavy commercial durability.'
  },
  {
    id: 'boucle-espresso',
    name: 'Bouclé de Lyon',
    category: 'Bouclé',
    colorName: 'Espresso Melange',
    colorHex: '#4A423B',
    texturePattern: 'boucle-loop',
    rubCount: 65000,
    origin: 'Lyon, France',
    priceMultiplier: 1.15,
    description: 'Two-tone twisted yarn combining roasted umber and dark charcoal fibers for rich architectural warmth.'
  },
  {
    id: 'leather-cognac',
    name: 'Tuscan Full-Grain Aniline',
    category: 'Leather',
    colorName: 'Vintage Cognac',
    colorHex: '#A25E34',
    texturePattern: 'natural-grain',
    rubCount: 100000,
    origin: 'Santa Croce, Italy',
    priceMultiplier: 1.45,
    description: 'Uncorrected vegetable-tanned bovine hide. Natural grain variations that develop a deep, buttery patina over decades.'
  },
  {
    id: 'leather-noir',
    name: 'Tuscan Full-Grain Aniline',
    category: 'Leather',
    colorName: 'Architectural Charcoal',
    colorHex: '#252627',
    texturePattern: 'natural-grain',
    rubCount: 100000,
    origin: 'Santa Croce, Italy',
    priceMultiplier: 1.45,
    description: 'Matte barrel-dyed Italian hide with natural breathable pores and smooth supple hand-feel.'
  },
  {
    id: 'velvet-moss',
    name: 'Venetian Cotton Velvet',
    category: 'Velvet',
    colorName: 'Forest Moss',
    colorHex: '#3A4839',
    texturePattern: 'deep-pile',
    rubCount: 80000,
    origin: 'Veneto, Italy',
    priceMultiplier: 1.25,
    description: 'Dense 100% combed cotton velvet pile with matte luster and stain-resistant water-repellent finishing.'
  },
  {
    id: 'velvet-amber',
    name: 'Venetian Cotton Velvet',
    category: 'Velvet',
    colorName: 'Rust Umber',
    colorHex: '#9E583A',
    texturePattern: 'deep-pile',
    rubCount: 80000,
    origin: 'Veneto, Italy',
    priceMultiplier: 1.25,
    description: 'Warm earth pigments inspired by Roman terracotta. Lustrous yet non-shiny low-sheen pile.'
  },
  {
    id: 'wool-ash',
    name: 'Nordic Melange Wool',
    category: 'Wool',
    colorName: 'Pebble Ash',
    colorHex: '#B2AEA7',
    texturePattern: 'tweed-twill',
    rubCount: 95000,
    origin: 'Biella, Italy',
    priceMultiplier: 1.3,
    description: 'Pure new wool felt twill with natural fire resistance, soil repelling lanolin, and acoustic dampening.'
  }
];

export const LEGS: LegOption[] = [
  {
    id: 'smoked-oak',
    name: 'Smoked European Oak',
    material: 'FSC Solid White Oak, wire-brushed & smoked oil finish',
    colorHex: '#4A3D34',
    texture: 'dark-grain'
  },
  {
    id: 'natural-oak',
    name: 'Natural Scandinavian Oak',
    material: 'FSC Solid White Oak, ultra-matte clear lacquer',
    colorHex: '#C5B191',
    texture: 'blonde-grain'
  },
  {
    id: 'oiled-walnut',
    name: 'American Black Walnut',
    material: 'FSC Solid Walnut, hand-rubbed Danish oil',
    colorHex: '#5C4435',
    texture: 'rich-grain'
  },
  {
    id: 'blackened-ash',
    name: 'Blackened Ash Timber',
    material: 'FSC European Ash, Japanese sumi-ink stain',
    colorHex: '#1F1E1D',
    texture: 'charred-grain'
  },
  {
    id: 'brushed-brass',
    name: 'Brushed Patinated Brass',
    material: 'Solid cast brass core, hand-patinated wax finish',
    colorHex: '#B5985E',
    texture: 'metal'
  }
];

export const CUSHION_FILLS = [
  {
    id: 'cloud-down',
    name: 'Cloud Down-Blend',
    firmness: 'Plush & Relaxed (3/5)',
    priceDelta: 180,
    description: 'High-density soy-based foam core wrapped in dual chambers of sterilized European duck featherdown.'
  },
  {
    id: 'dual-hybrid',
    name: 'Dual-Core Hybrid Eco',
    firmness: 'Balanced Resilience (4/5)',
    priceDelta: 0,
    description: 'CertiPUR-US multi-density cold foam with layered memory layer. Retains crisp tailored shape with zero fluffing.'
  },
  {
    id: 'natural-latex',
    name: 'Organic Dunlop Latex',
    firmness: 'Supportive & Firm (5/5)',
    priceDelta: 240,
    description: '100% natural organic tree sap latex. Breathable, hypoallergenic, with natural perpetual bounce.'
  }
];

export const SOFA_MODELS: SofaModel[] = [
  {
    id: 'elysian',
    name: 'The Elysian Curved Modular',
    tagline: 'Sculptural organic geometry with continuous wrap-around comfort',
    description: 'Crafted for open-concept architecture. The Elysian features gentle sweeping arcs, hidden magnetic section joinery, and an ultra-plush Belgian linen profile.',
    basePrice: 3450,
    category: 'modular',
    image: '/src/assets/images/hero_luxury_sofa_1791286225430.jpg',
    standardDimensions: {
      width: 290,
      depth: 108,
      height: 74,
      seatDepth: 68,
      seatHeight: 42
    },
    configurations: [
      { id: 'elysian-3', name: '3-Piece Curved Open Island', width: 290, depth: 108, height: 74, priceDelta: 0, seats: 4 },
      { id: 'elysian-4', name: '4-Piece Grand Arc Sectional', width: 375, depth: 145, height: 74, priceDelta: 1100, seats: 6 },
      { id: 'elysian-2', name: 'Compact 2-Piece Curve', width: 220, depth: 102, height: 74, priceDelta: -550, seats: 3 },
      { id: 'elysian-chaise', name: 'Curved Sectional with Floating Chaise', width: 320, depth: 165, height: 74, priceDelta: 850, seats: 5 }
    ],
    highlightFeatures: [
      'Continuous steam-bent solid beech carcass',
      'Zero-creak magnetic interlocking chassis',
      'Concealed low-profile recessed walnut plinth',
      'Removable tailoring covers for seasonal changes'
    ],
    designer: 'Studio KRONOS Copenhagen'
  },
  {
    id: 'marlo',
    name: 'The Marlo Cloud Deep-Seat',
    tagline: 'Generous 108cm depth upholstered in hand-patinated Italian hides',
    description: 'The definitive lounger. Designed for hours of effortless relaxation with low slung proportions, hand-stitched flange seams, and sink-in down channels.',
    basePrice: 2890,
    category: 'deep-seat',
    image: '/src/assets/images/sofa_marlo_leather_1791286239034.jpg',
    standardDimensions: {
      width: 240,
      depth: 108,
      height: 78,
      seatDepth: 72,
      seatHeight: 43
    },
    configurations: [
      { id: 'marlo-3', name: '3-Seater Classic Deep (240cm)', width: 240, depth: 108, height: 78, priceDelta: 0, seats: 3 },
      { id: 'marlo-4', name: '4-Seater Extended Lounge (280cm)', width: 280, depth: 108, height: 78, priceDelta: 520, seats: 4 },
      { id: 'marlo-2', name: '2-Seater Deep Loveseat (195cm)', width: 195, depth: 108, height: 78, priceDelta: -390, seats: 2 },
      { id: 'marlo-l', name: 'L-Shape Deep Sectional with Daybed', width: 310, depth: 185, height: 78, priceDelta: 1250, seats: 5 }
    ],
    highlightFeatures: [
      '8-way hand-tied heavy gauge carbon steel springs',
      'Double-flanged French tailored seams',
      'Solid American walnut sculptural turned feet',
      'Triple-baffle cushion cores preventing feather shift'
    ],
    designer: 'Elena Moretti, Milan'
  },
  {
    id: 'sorensen',
    name: 'The Sorensen Tailored 3-Seater',
    tagline: 'Clean Danish modernist discipline with architectural timber reveals',
    description: 'A benchmark in timeless proportion. Crisp linear silhouette balanced by a continuous external solid oak chassis and floating backrest geometry.',
    basePrice: 2420,
    category: 'three-seater',
    image: '/src/assets/images/sofa_elysian_linen_1791286249996.jpg',
    standardDimensions: {
      width: 228,
      depth: 92,
      height: 76,
      seatDepth: 58,
      seatHeight: 44
    },
    configurations: [
      { id: 'sorensen-3', name: '3-Seater Tailored (228cm)', width: 228, depth: 92, height: 76, priceDelta: 0, seats: 3 },
      { id: 'sorensen-2', name: '2-Seater Apartment Size (175cm)', width: 175, depth: 92, height: 76, priceDelta: -320, seats: 2 },
      { id: 'sorensen-4', name: '4-Seater Linear Grand (265cm)', width: 265, depth: 92, height: 76, priceDelta: 480, seats: 4 },
      { id: 'sorensen-chaise', name: 'Tailored 3-Seater + Right Chaise', width: 295, depth: 160, height: 76, priceDelta: 920, seats: 4 }
    ],
    highlightFeatures: [
      'Exposed mortise-and-tenon solid white oak base',
      'Dual-density high resilience foam structure',
      'Zero sag sinuous spring suspension with sound deadening clips',
      'Precision top-stitch edge detailing'
    ],
    designer: 'Henrik Vang, Copenhagen'
  },
  {
    id: 'astrid',
    name: 'The Astrid Modular Sectional',
    tagline: 'Configurable architectural modules with reversible lounge elements',
    description: 'Pure modular flexibility. Connect and reconfigure armless chairs, corner units, and oversized ottomans effortlessly to match expanding homes.',
    basePrice: 4120,
    category: 'modular',
    image: '/src/assets/images/hero_luxury_sofa_1791286225430.jpg',
    standardDimensions: {
      width: 325,
      depth: 175,
      height: 72,
      seatDepth: 66,
      seatHeight: 41
    },
    configurations: [
      { id: 'astrid-5', name: '5-Piece Corner Sectional (325x245cm)', width: 325, depth: 245, height: 72, priceDelta: 0, seats: 6 },
      { id: 'astrid-3', name: '3-Piece Linear with Ottoman', width: 270, depth: 175, height: 72, priceDelta: -650, seats: 4 },
      { id: 'astrid-u', name: '7-Piece Grand U-Lounge Suite', width: 395, depth: 265, height: 72, priceDelta: 1680, seats: 8 }
    ],
    highlightFeatures: [
      'Interchangeable left/right modular orientations',
      'Heavy-duty concealed steel alignment latches',
      'Generous 35cm wide sculptural bolster armrests',
      'Reinforced internal corners with solid corner blocks'
    ],
    designer: 'Studio KRONOS Berlin'
  },
  {
    id: 'valen',
    name: 'The Valen Minimalist Daybed',
    tagline: 'Subtle low-slung platform with Japanese-Nordic serenity',
    description: 'Inspired by Japanese tatami platforms and Nordic warmth. Features a cantilevered ash tray shelf for books and ceramics, with a single continuous bench mattress.',
    basePrice: 2650,
    category: 'daybed',
    image: '/src/assets/images/sofa_marlo_leather_1791286239034.jpg',
    standardDimensions: {
      width: 215,
      depth: 95,
      height: 68,
      seatDepth: 75,
      seatHeight: 38
    },
    configurations: [
      { id: 'valen-std', name: 'Single Daybed + Left Tray Platform', width: 215, depth: 95, height: 68, priceDelta: 0, seats: 3 },
      { id: 'valen-double', name: 'Extended Twin Platform (250cm)', width: 250, depth: 100, height: 68, priceDelta: 540, seats: 4 }
    ],
    highlightFeatures: [
      'Hand-planed solid ash timber chassis',
      'Natural latex mattress with wool batt quilting',
      'Integrated hand-turned timber tea ledge',
      'Minimal 38cm low ground clearance'
    ],
    designer: 'Kenzo & Vang Collaboration'
  }
];

export const WORKSHOP_STEPS = [
  {
    number: '01',
    title: 'Kiln-Dried Hardwood Carpentry',
    time: 'Day 1–4',
    description: 'We source exclusively FSC-certified European beech and white oak. Frames are cut with CNC precision, then joined by hand using double dowels, corner blocks, and PVA glues tested for 50-year structural integrity.',
    metric: '100% Solid Hardwood'
  },
  {
    number: '02',
    title: '8-Way Hand-Tied Coil Springing',
    time: 'Day 5–8',
    description: 'The gold standard of luxury seating. Each tempered carbon-steel coil is hand-knotted eight times in an intricate web of Italian jute webbing, providing progressive floating support that will never bottom out.',
    metric: '96 Hand Ties Per Seat'
  },
  {
    number: '03',
    title: 'Layered Ergonomic Cushion Fill',
    time: 'Day 9–12',
    description: 'We layer variable density eco-foams with certified duck down-baffles. The multi-chamber baffles keep down permanently distributed so you never experience sagging or uneven settling.',
    metric: 'CertiPUR-US & OEKO-TEX'
  },
  {
    number: '04',
    title: 'Master Pattern Cut & French Seaming',
    time: 'Day 13–18',
    description: 'Natural hides and Belgian linen bolts are inspected under daylight lamps for grain harmony. Master upholsterers hand-sew double-needle French seams with bonded nylon thread tested to 40 lbs tension.',
    metric: 'Sub-millimeter Stitch Precision'
  },
  {
    number: '05',
    title: '100-Point Inspection & White Glove Crate',
    time: 'Day 19–21',
    description: 'Every completed piece undergoes rigorous load tests, fabric tension calipers, and visual quality auditing before being wrapped in reusable breathable cotton quilts and custom wooden shipping frames.',
    metric: 'Zero-Waste Reusable Crating'
  }
];

export const CLIENT_STORIES = [
  {
    quote: "We commissioned two 3.2m Elysian sectionals for our cliffside villa in Cascais. The tactile quality of the Belgian linen and the solidity of the timber frame exceed anything we could find in typical designer showrooms.",
    author: "Marc & Valérie Dupont",
    role: "Architectural Digest Featured Home",
    location: "Cascais, Portugal",
    sofaModel: "The Elysian Modular in Chalk Bouclé",
    year: "2025"
  },
  {
    quote: "As an interior designer, I specify KRONOS for our hotel lobbies and private residential clients. The 8-way hand tied coils provide comfort that commercial foam sofas simply cannot replicate after years of daily use.",
    author: "Camilla Lindqvist",
    role: "Founder, Studio Lindqvist Interior Architecture",
    location: "Stockholm, Sweden",
    sofaModel: "The Sorensen 3-Seater in Cognac Aniline Leather",
    year: "2026"
  },
  {
    quote: "The ordering experience with the custom configurator and free sample box gave us complete peace of mind. The white-glove team assembled the sectional effortlessly in our 4th-floor London flat.",
    author: "Julian & Priya Sterling",
    role: "Private Collector",
    location: "Notting Hill, London",
    sofaModel: "The Marlo Cloud in Warm Oat Linen",
    year: "2025"
  }
];
