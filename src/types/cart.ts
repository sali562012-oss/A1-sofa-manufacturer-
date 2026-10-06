import { SofaModel, FabricOption, LegOption } from '../data/furnitureData';

export interface CartConfiguredSofa {
  id: string; // unique item id
  model: SofaModel;
  configurationId: string;
  configurationName: string;
  width: number;
  depth: number;
  height: number;
  fabric: FabricOption;
  leg: LegOption;
  cushionFillId: string;
  cushionFillName: string;
  totalPrice: number;
  quantity: number;
  whiteGloveDelivery: boolean;
  notes?: string;
}

export interface SwatchKitItem {
  id: string;
  fabricId: string;
  name: string;
  colorName: string;
  colorHex: string;
  category: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  customerName: string;
  email: string;
  address: string;
  items: CartConfiguredSofa[];
  swatches: SwatchKitItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedProductionDate: string;
  dateCreated: string;
}
