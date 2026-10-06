import React, { useState } from 'react';
import { CartConfiguredSofa, SwatchKitItem, OrderConfirmation } from '../types/cart';
import { X, Trash2, ShieldCheck, ArrowRight, Check, Truck, Download, Clock } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartConfiguredSofa[];
  swatchKit: SwatchKitItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenConfigurator: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  swatchKit,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenConfigurator
}) => {
  const [whiteGloveSelected, setWhiteGloveSelected] = useState<boolean>(true);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    deliveryNotes: ''
  });
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  const deliveryFee = whiteGloveSelected && cartItems.length > 0 ? 180 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `KRO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const prodDate = new Date();
    prodDate.setDate(prodDate.getDate() + 32);

    const order: OrderConfirmation = {
      orderNumber,
      customerName: customerInfo.name,
      email: customerInfo.email,
      address: `${customerInfo.address}, ${customerInfo.city} ${customerInfo.postalCode}, ${customerInfo.country}`,
      items: [...cartItems],
      swatches: [...swatchKit],
      subtotal,
      deliveryFee,
      total,
      estimatedProductionDate: prodDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      dateCreated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setConfirmedOrder(order);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  const handleResetAndClose = () => {
    setCheckoutStep('cart');
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#FAF8F5] border-l border-[#E2DBD0] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D6] flex items-center justify-between bg-white">
            <div>
              <div className="text-[11px] uppercase tracking-widest font-semibold text-[#8A5B38]">
                Bespoke Order Atelier
              </div>
              <h3 className="text-xl font-serif text-[#1E1B18]">
                {checkoutStep === 'cart' ? 'Specification Cart' : checkoutStep === 'checkout' ? 'White Glove Delivery Details' : 'Commission Confirmed'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7A7266] hover:text-[#1E1B18] rounded-full hover:bg-[#F2ECE1]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* STEP 1: CART VIEW */}
            {checkoutStep === 'cart' && (
              <div>
                {cartItems.length === 0 && swatchKit.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#EFE9DF] text-[#8A5B38] flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-serif text-[#1E1B18] mb-1">
                      Your Atelier Bag is Empty
                    </h4>
                    <p className="text-xs text-[#6B6358] max-w-xs mx-auto font-light leading-relaxed mb-6">
                      Customise dimensions and fabrics in our studio to begin your bespoke commission.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenConfigurator();
                      }}
                      className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-colors"
                    >
                      Open Custom Studio
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Sofa Items */}
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 rounded-xl border border-[#E3DDCF] shadow-sm flex flex-col gap-3"
                      >
                        <div className="flex gap-4 items-start">
                          <img
                            src={item.model.image}
                            alt={item.model.name}
                            className="w-20 h-20 rounded-lg object-cover bg-[#F5F2EC] shrink-0 border border-[#EBE5DB]"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="text-sm font-serif font-medium text-[#1E1B18] truncate">
                                {item.model.name}
                              </h5>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-[#998F82] hover:text-rose-600 p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-xs font-semibold text-[#8A5B38] mt-0.5">
                              {item.configurationName}
                            </div>

                            <div className="text-[11px] text-[#696156] mt-1 space-y-0.5 font-light">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fabric.colorHex }} />
                                <span>{item.fabric.name} ({item.fabric.colorName})</span>
                              </div>
                              <div>Chassis: {item.leg.name}</div>
                              <div>Fill: {item.cushionFillName}</div>
                              <div className="font-mono text-[#827A6D]">
                                {item.width}W × {item.depth}D × {item.height}H cm
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="pt-3 border-t border-[#F0EBE2] flex items-center justify-between">
                          <div className="flex items-center border border-[#DED7C9] rounded bg-[#FAF8F5] text-xs font-mono">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2.5 py-1 text-[#544E45] hover:bg-[#EBE5DA]"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 font-semibold text-[#1E1B18]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2.5 py-1 text-[#544E45] hover:bg-[#EBE5DA]"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-sm font-serif font-semibold text-[#1E1B18] font-mono tabular-nums">
                            ${(item.totalPrice * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Included Fabric Swatch Box preview if any */}
                    {swatchKit.length > 0 && (
                      <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E3DDCF] text-xs">
                        <div className="flex items-center justify-between font-semibold text-[#1E1B18] mb-2">
                          <span>Complimentary Swatch Box</span>
                          <span className="text-emerald-700 font-mono">FREE</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {swatchKit.map(s => (
                            <span key={s.id} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#DDD4C3] rounded text-[11px] text-[#423C34]">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.colorHex }} />
                              <span>{s.colorName}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Delivery Upgrade Option */}
                    {cartItems.length > 0 && (
                      <div className="bg-white p-4 rounded-xl border border-[#E5DFD3]">
                        <div className="text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-2">
                          Delivery Service
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={whiteGloveSelected}
                            onChange={(e) => setWhiteGloveSelected(e.target.checked)}
                            className="mt-1 rounded border-gray-300 text-[#1E1B18] focus:ring-[#1E1B18]"
                          />
                          <div className="text-xs">
                            <div className="font-semibold text-[#1E1B18]">
                              White Glove In-Home Room Placement (+$180)
                            </div>
                            <p className="text-[#696156] font-light mt-0.5 leading-relaxed">
                              Two-person team unpacks, carries to room of choice (any floor), completes magnetic joinery assembly, and removes all protective crates and wrapping.
                            </p>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: CHECKOUT DETAILS FORM */}
            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#8A5B38] mb-2">
                  Shipping & Commission Certificate Details
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Lady Eleanor Vance"
                    className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] bg-white focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="eleanor@domain.com"
                      className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] bg-white focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+44 20 7946 0912"
                      className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] bg-white focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                    Destination Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="Apartment 4B, 18 Chelsea Square"
                    className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] bg-white focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
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
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      placeholder="London"
                      className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] bg-white focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.postalCode}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, postalCode: e.target.value })}
                      placeholder="SW3 6LF"
                      className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] bg-white focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1E1B18] mb-1">
                    Access / Architectural Notes (Stairs, Elevator, Door Width)
                  </label>
                  <textarea
                    rows={2}
                    value={customerInfo.deliveryNotes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryNotes: e.target.value })}
                    placeholder="e.g. 2nd floor with service lift (doors are 92cm clear width)."
                    className="w-full px-3 py-2 text-xs rounded border border-[#DED7C9] bg-white focus:outline-none focus:ring-1 focus:ring-[#1E1B18]"
                  />
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded border border-[#E5DFD3] text-[11px] text-[#696156]">
                  <div className="font-semibold text-[#1E1B18] mb-0.5">Deposit & Payment Flow</div>
                  No immediate charge. Upon submission, our atelier confirms hardwood lot allocation, verifies doorway clearances, and issues an invoice with 50% deposit balance.
                </div>
              </form>
            )}

            {/* STEP 3: CONFIRMATION CERTIFICATE */}
            {checkoutStep === 'confirmed' && confirmedOrder && (
              <div className="text-center py-6 animate-fadeIn space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest font-semibold text-[#8A5B38]">
                    Commission Certificate Generated
                  </div>
                  <h4 className="text-2xl font-serif text-[#1E1B18] mt-1">
                    Order {confirmedOrder.orderNumber}
                  </h4>
                  <p className="text-xs text-[#6B6358] max-w-xs mx-auto mt-1 font-light">
                    Your bespoke piece has been queued in our Porto timber workshop.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="p-4 bg-white rounded-xl border border-[#E2DBD0] text-left text-xs font-mono space-y-2 text-[#474036]">
                  <div className="flex justify-between border-b border-[#F0EBE2] pb-2 text-[#1E1B18] font-bold">
                    <span>ATELIER SPECIFICATION:</span>
                    <span>{confirmedOrder.dateCreated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CLIENT:</span>
                    <span className="font-bold text-[#1E1B18]">{confirmedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DESTINATION:</span>
                    <span className="text-right truncate max-w-[200px]">{confirmedOrder.address}</span>
                  </div>
                  <div className="flex justify-between text-[#8A5B38] font-semibold">
                    <span>EST. DISPATCH:</span>
                    <span>{confirmedOrder.estimatedProductionDate}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#F0EBE2] pt-2 text-[#1E1B18] font-bold text-sm">
                    <span>TOTAL ORDER:</span>
                    <span>${confirmedOrder.total.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#6B6358]">
                  <ShieldCheck className="w-4 h-4 text-[#8A5B38]" />
                  <span>25-Year Warranty Medallion Registered</span>
                </div>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3 text-xs uppercase tracking-wider font-semibold text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer Actions */}
          {checkoutStep !== 'confirmed' && (
            <div className="p-6 bg-white border-t border-[#E8E2D6] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B6358]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#1E1B18]">${subtotal.toLocaleString()}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-[#6B6358]">
                    <span>White Glove In-Home Delivery</span>
                    <span className="font-mono tabular-nums text-[#1E1B18]">${deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-[#1E1B18] pt-2 border-t border-[#F0EBE2]">
                  <span>Total Investment</span>
                  <span className="font-mono tabular-nums">${total.toLocaleString()}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <div className="space-y-2">
                  <button
                    disabled={cartItems.length === 0}
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-3.5 text-xs uppercase tracking-widest font-semibold text-white bg-[#1E1B18] hover:bg-[#342F2A] disabled:opacity-40 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Delivery Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2 text-center text-xs text-[#7A7266] hover:text-[#1E1B18]"
                  >
                    Continue Customizing
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    form="checkout-form"
                    type="submit"
                    className="w-full py-3.5 text-xs uppercase tracking-widest font-semibold text-white bg-[#1E1B18] hover:bg-[#342F2A] rounded-md transition-colors shadow-sm"
                  >
                    Place Commission Order (${total.toLocaleString()})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full py-2 text-center text-xs text-[#7A7266] hover:text-[#1E1B18]"
                  >
                    ← Back to Cart
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
