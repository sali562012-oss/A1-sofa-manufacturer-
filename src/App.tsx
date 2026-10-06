/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InteractiveConfigurator } from './components/InteractiveConfigurator';
import { CollectionsGrid } from './components/CollectionsGrid';
import { AnatomyOfCraft } from './components/AnatomyOfCraft';
import { SwatchKitSection } from './components/SwatchKitSection';
import { FreeSwatchModal } from './components/FreeSwatchModal';
import { TradeB2BSection } from './components/TradeB2BSection';
import { ReviewsAndSpaces } from './components/ReviewsAndSpaces';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CartConfiguredSofa, SwatchKitItem } from './types/cart';
import { SOFA_MODELS, FABRICS, LEGS } from './data/furnitureData';

export default function App() {
  // Seed initial configured sofa so user sees populated cart right away if desired
  const [cartItems, setCartItems] = useState<CartConfiguredSofa[]>([
    {
      id: 'seed-elysian-1',
      model: SOFA_MODELS[0],
      configurationId: 'elysian-3',
      configurationName: '3-Piece Curved Open Island (290cm)',
      width: 290,
      depth: 108,
      height: 74,
      fabric: FABRICS[2], // Boucle Chalk
      leg: LEGS[2], // Oiled Walnut
      cushionFillId: 'cloud-down',
      cushionFillName: 'Cloud Down-Blend',
      totalPrice: 4148,
      quantity: 1,
      whiteGloveDelivery: true
    }
  ]);

  // Seed sample swatches
  const [swatchKit, setSwatchKit] = useState<SwatchKitItem[]>([
    {
      id: 'swatch-1',
      fabricId: 'linen-oat',
      name: 'Belgian Heritage Linen',
      colorName: 'Warm Oat',
      colorHex: '#D8CBB7',
      category: 'Linen'
    },
    {
      id: 'swatch-2',
      fabricId: 'boucle-chalk',
      name: 'Bouclé de Lyon',
      colorName: 'Chalk Cream',
      colorHex: '#EDE8DF',
      category: 'Bouclé'
    },
    {
      id: 'swatch-3',
      fabricId: 'leather-cognac',
      name: 'Tuscan Full-Grain Aniline',
      colorName: 'Vintage Cognac',
      colorHex: '#A25E34',
      category: 'Leather'
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSwatchModalOpen, setIsSwatchModalOpen] = useState(false);
  const [activeModelForConfigurator, setActiveModelForConfigurator] = useState('elysian');
  const [activeSection, setActiveSection] = useState('hero');

  // Navigation scrolling
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectModelToCustomize = (modelId: string) => {
    setActiveModelForConfigurator(modelId);
    handleNavigate('configurator');
  };

  // Cart operations
  const handleAddToCart = (item: CartConfiguredSofa) => {
    setCartItems(prev => [item, ...prev]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartConfiguredSofa[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Swatch operations
  const handleAddSwatch = (swatch: SwatchKitItem) => {
    if (swatchKit.length >= 5) {
      alert('Your complimentary box is full (5/5). Remove a swatch to add this one.');
      return;
    }
    if (swatchKit.some(s => s.fabricId === swatch.fabricId)) {
      return;
    }
    setSwatchKit(prev => [...prev, swatch]);
  };

  const handleRemoveSwatch = (swatchId: string) => {
    setSwatchKit(prev => prev.filter(s => s.id !== swatchId));
  };

  const handleClearSwatches = () => {
    setSwatchKit([]);
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#1E1B18] flex flex-col font-sans selection:bg-[#E8DFC8]">
      
      {/* 3-Zone Top Navigation Bar */}
      <Header
        cartItems={cartItems}
        swatchKit={swatchKit}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero
          onOpenConfigurator={() => handleNavigate('configurator')}
          onExploreCollections={() => handleNavigate('collections')}
          onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
        />

        {/* Interactive Custom 3D & Blueprint Studio */}
        <InteractiveConfigurator
          key={activeModelForConfigurator}
          selectedModelId={activeModelForConfigurator}
          onAddToCart={handleAddToCart}
          onAddSwatch={handleAddSwatch}
        />

        {/* Signature Collection Grid & Technical Specs */}
        <CollectionsGrid
          onSelectModelToCustomize={handleSelectModelToCustomize}
          onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
        />

        {/* The Anatomy of a 25-Year Sofa (Manufacturer Joinery Dissection) */}
        <AnatomyOfCraft />

        {/* Free Fabric Swatch Box Builder */}
        <SwatchKitSection
          swatchKit={swatchKit}
          onAddSwatch={handleAddSwatch}
          onRemoveSwatch={handleRemoveSwatch}
          onOpenOrderModal={() => setIsSwatchModalOpen(true)}
        />

        {/* Contract & Architecture Trade Program */}
        <TradeB2BSection />

        {/* Installed Commissions & Architectural Living */}
        <ReviewsAndSpaces />
      </main>

      {/* Atelier Footer */}
      <Footer />

      {/* Cart & Bespoke Specification Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        swatchKit={swatchKit}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenConfigurator={() => handleNavigate('configurator')}
      />

      {/* Complimentary Swatch Presentation Box Modal */}
      <FreeSwatchModal
        isOpen={isSwatchModalOpen}
        onClose={() => setIsSwatchModalOpen(false)}
        swatchKit={swatchKit}
        onAddSwatch={handleAddSwatch}
        onRemoveSwatch={handleRemoveSwatch}
        onClearSwatches={handleClearSwatches}
      />

    </div>
  );
}
