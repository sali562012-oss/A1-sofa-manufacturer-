import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, Layers } from 'lucide-react';
import { SwatchKitItem, CartConfiguredSofa } from '../types/cart';

interface HeaderProps {
  cartItems: CartConfiguredSofa[];
  swatchKit: SwatchKitItem[];
  onOpenCart: () => void;
  onOpenSwatchModal: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  swatchKit,
  onOpenCart,
  onOpenSwatchModal,
  onNavigate,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/90 backdrop-blur-md border-b border-[#E7E2DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="text-xl sm:text-2xl font-serif tracking-[0.2em] uppercase font-medium text-[#1E1B18] hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            KRONOS ATELIER
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-[#4D4740]">
            <button
              onClick={() => handleNavClick('collections')}
              className={`hover:text-[#1E1B18] transition-colors pb-1 ${
                activeSection === 'collections' ? 'text-[#1E1B18] border-b border-[#1E1B18]' : ''
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('configurator')}
              className={`hover:text-[#1E1B18] transition-colors pb-1 ${
                activeSection === 'configurator' ? 'text-[#1E1B18] border-b border-[#1E1B18]' : ''
              }`}
            >
              Custom Studio
            </button>
            <button
              onClick={() => handleNavClick('craft')}
              className={`hover:text-[#1E1B18] transition-colors pb-1 ${
                activeSection === 'craft' ? 'text-[#1E1B18] border-b border-[#1E1B18]' : ''
              }`}
            >
              Our Craft
            </button>
            <button
              onClick={() => handleNavClick('swatches')}
              className={`hover:text-[#1E1B18] transition-colors pb-1 ${
                activeSection === 'swatches' ? 'text-[#1E1B18] border-b border-[#1E1B18]' : ''
              }`}
            >
              Fabric Swatches
            </button>
            <button
              onClick={() => handleNavClick('trade')}
              className={`hover:text-[#1E1B18] transition-colors pb-1 ${
                activeSection === 'trade' ? 'text-[#1E1B18] border-b border-[#1E1B18]' : ''
              }`}
            >
              Trade & B2B
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Swatch Kit Quick Button */}
            <button
              onClick={onOpenSwatchModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-medium text-[#38322B] bg-[#F2EDE4] hover:bg-[#E8DFD3] rounded-md transition-colors whitespace-nowrap border border-[#E0D8CA]"
              title="Order complimentary tactile fabric swatches"
            >
              <Layers className="w-3.5 h-3.5 text-[#8A5B38]" />
              <span>Free Swatches</span>
              {swatchKit.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#8A5B38] text-white text-[10px] flex items-center justify-center font-mono">
                  {swatchKit.length}
                </span>
              )}
            </button>

            {/* Cart / Specification Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-colors whitespace-nowrap"
              aria-label={`View cart, ${totalCartCount} custom sofas`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Cart & Spec</span>
              {totalCartCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#8A5B38] text-white rounded">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4D4740] hover:text-[#1E1B18]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E7E2DA] flex flex-col gap-3 text-sm uppercase tracking-wider font-medium text-[#4D4740]">
            <button
              onClick={() => handleNavClick('collections')}
              className="text-left py-2 hover:text-[#1E1B18]"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('configurator')}
              className="text-left py-2 hover:text-[#1E1B18]"
            >
              Custom Studio
            </button>
            <button
              onClick={() => handleNavClick('craft')}
              className="text-left py-2 hover:text-[#1E1B18]"
            >
              Our Craft
            </button>
            <button
              onClick={() => handleNavClick('swatches')}
              className="text-left py-2 hover:text-[#1E1B18]"
            >
              Fabric Swatches ({swatchKit.length}/5)
            </button>
            <button
              onClick={() => handleNavClick('trade')}
              className="text-left py-2 hover:text-[#1E1B18]"
            >
              Trade & B2B
            </button>
            <button
              onClick={() => {
                onOpenSwatchModal();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-2.5 text-center text-xs uppercase tracking-wider text-[#38322B] bg-[#F2EDE4] rounded-md border border-[#E0D8CA]"
            >
              Order Complimentary Swatch Box ({swatchKit.length}/5)
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
