import React, { useState } from 'react';
import { SwatchKitItem } from '../types/cart';
import { FABRICS } from '../data/furnitureData';
import { X, Check, Truck, Sparkles, Plus, ShieldCheck } from 'lucide-react';

interface FreeSwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  swatchKit: SwatchKitItem[];
  onAddSwatch: (swatch: SwatchKitItem) => void;
  onRemoveSwatch: (swatchId: string) => void;
  onClearSwatches: () => void;
}

export const FreeSwatchModal: React.FC<FreeSwatchModalProps> = ({
  isOpen,
  onClose,
  swatchKit,
  onAddSwatch,
  onRemoveSwatch,
  onClearSwatches
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    projectType: 'Living Room Renovation'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (swatchKit.length === 0) return;
    const generatedTracking = 'KRO-EXP-' + Math.floor(100000 + Math.random() * 900000);
    setTrackingNumber(generatedTracking);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClearSwatches();
    onClose();
  };

  const handleQuickAdd = (fabricId: string) => {
    const fabric = FABRICS.find(f => f.id === fabricId);
    if (!fabric) return;
    if (swatchKit.length >= 5) return;
    onAddSwatch({
      id: `swatch-${fabric.id}-${Date.now()}`,
      fabricId: fabric.id,
      name: fabric.name,
      colorName: fabric.colorName,
      colorHex: fabric.colorHex,
      category: fabric.category
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-xl border border-[#E3DDCF] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A7266] hover:text-[#1E1B18] rounded-full hover:bg-[#F2ECE1]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#8A5B38] mb-1">
              <Truck className="w-4 h-4" />
              <span>Complimentary 48-Hour Dispatch</span>
            </div>
            <h3 className="text-2xl font-serif text-[#1E1B18] mb-2">
              Order Your Swatch Presentation Box
            </h3>
            <p className="text-xs text-[#635C52] font-light leading-relaxed mb-6">
              Touch our Belgian linens, French bouclés, and Italian leathers before placing an order. Hand-packed in our eco-recycled embossed linen box. 100% free with zero shipping fee.
            </p>

            {/* Selected Swatches Overview */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-[#E5DFD3]">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1E1B18] mb-3">
                <span>Selected Swatches ({swatchKit.length}/5)</span>
                <span className="text-[11px] text-[#8A5B38] font-mono">No Credit Card Needed</span>
              </div>

              {swatchKit.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-xs text-[#7A7266] mb-3">
                    Your box is empty. Choose up to 5 swatches below:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {FABRICS.slice(0, 4).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleQuickAdd(f.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F7F4EF] hover:bg-[#EAE3D5] text-xs text-[#383129] border border-[#DDD4C4]"
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.colorHex }} />
                        <span>+ {f.colorName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {swatchKit.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-1.5 px-2 bg-[#F9F7F3] rounded text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="font-medium text-[#1E1B18]">{item.name}</span>
                        <span className="text-[#6D6559]">· {item.colorName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveSwatch(item.id)}
                        className="text-[#968E82] hover:text-rose-600 p-1"
                        aria-label={`Remove ${item.colorName}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {swatchKit.length < 5 && (
                    <div className="pt-2">
                      <div className="text-[11px] text-[#7A7266] mb-1.5 font-light">
                        Add up to {5 - swatchKit.length} more popular swatches:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {FABRICS.filter(f => !swatchKit.some(s => s.fabricId === f.id)).slice(0, 3).map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => handleQuickAdd(f.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F2EDE2] hover:bg-[#E5DDCB] text-[11px] text-[#423B33] border border-[#DBD1BF]"
                          >
                            <Plus className="w-3 h-3 text-[#8A5B38]" />
                            <span>{f.colorName}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Delivery Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Helena Vance"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED7C9] bg-white text-xs text-[#1E1B18] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                  Email Address (For Courier Tracking) *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="helena@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED7C9] bg-white text-xs text-[#1E1B18] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="14 Kensington Church Street"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED7C9] bg-white text-xs text-[#1E1B18] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="London"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED7C9] bg-white text-xs text-[#1E1B18] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="W8 4EP"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DED7C9] bg-white text-xs text-[#1E1B18] focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={swatchKit.length === 0}
                  className="w-full py-3.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E1B18] hover:bg-[#322D28] disabled:opacity-50 rounded-md transition-colors shadow-sm"
                >
                  Confirm & Dispatch Free Swatch Box
                </button>
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#70685D]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8A5B38]" />
                  <span>Always complimentary. No return required.</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7" />
            </div>

            <div className="text-xs uppercase tracking-widest font-semibold text-[#8A5B38] mb-1">
              Sample Box Confirmed
            </div>
            <h3 className="text-2xl font-serif text-[#1E1B18] mb-2">
              Your Swatches are Being Packed
            </h3>
            <p className="text-xs text-[#635C52] max-w-md mx-auto font-light leading-relaxed mb-6">
              We have queued your selected {swatchKit.length} tactile fabric samples for express dispatch to <strong>{formData.street}, {formData.city}</strong>.
            </p>

            <div className="p-4 bg-white rounded-lg border border-[#E5DFD3] text-left text-xs mb-6 max-w-md mx-auto space-y-1.5 font-mono">
              <div className="flex justify-between text-[#787165]">
                <span>COURIER DISPATCH:</span>
                <span className="text-[#1E1B18] font-bold">DHL Carbon-Neutral</span>
              </div>
              <div className="flex justify-between text-[#787165]">
                <span>TRACKING CODE:</span>
                <span className="text-[#8A5B38] font-bold">{trackingNumber}</span>
              </div>
              <div className="flex justify-between text-[#787165]">
                <span>ESTIMATED ARRIVAL:</span>
                <span className="text-[#1E1B18]">Within 48 Hours</span>
              </div>
              <div className="flex justify-between text-[#787165] pt-2 border-t border-[#F0EBE2]">
                <span>TOTAL CHARGE:</span>
                <span className="text-emerald-700 font-bold">$0.00 (COMPLIMENTARY)</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E1B18] hover:bg-[#322D28] rounded-md transition-colors"
            >
              Back to Atelier
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
