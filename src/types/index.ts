export interface ProductColor {
  name: string;
  hex: string;
  classBg?: string;
}

export interface ProductSize {
  length: number; // e.g. 52, 54, 56, 58
  heightGuide: string; // e.g. "5'0\"-5'2\""
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  size: number;
  rating: number;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  orderType?: 'COD ORDER' | 'ONLINE PAYMENT';
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: 'HAND EMBROIDERED' | 'PURE GEORGETTE' | 'COAT STYLE CUT' | 'PEARL DETAILING' | 'CEREMONIAL TIER' | 'EVERYDAY MINIMALIST' | 'HIJAB ESSENTIALS';
  categoryGroup: 'plain' | 'stonework' | 'printed' | 'hijabs' | 'ceremonial';
  badge?: 'BESTSELLER' | 'EVERYDAY' | 'LIMITED' | 'NEW ARRIVAL' | 'BESPOKE HANDCRAFTED';
  price: number;
  originalPrice?: number;
  wholesalePrice: number;
  wholesaleMinQty: number;
  fabric: string;
  description: string;
  craftsmanshipNote: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  rating: number;
  reviewsCount: number;
  includesMatchingHijab: boolean;
  isPopular?: boolean;
}

export interface HijabShade {
  id: string;
  name: string;
  hex: string;
  description: string;
  opacity: string;
  dimensions: string;
  price: number;
  image?: string;
}

export interface CartItem {
  id: string; // unique item id (productId + color + size)
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: number;
  quantity: number;
  pricePerUnit: number;
  isWholesaleTier?: boolean;
}

export interface B2BInquiryFormData {
  boutiqueName: string;
  buyerName: string;
  city: string;
  province: string;
  whatsappNumber: string;
  monthlyQty: '12 - 50' | '50 - 200' | '200+';
  productFocus: string[];
}

export interface CheckoutFormData {
  fullName: string;
  whatsappNumber: string;
  address: string;
  city: string;
  province: string;
  specialInstructions: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'easypaisa_jazzcash';
  isWholesaleInquiry: boolean;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  totalPayable: number;
  customer: CheckoutFormData;
  status: 'Received' | 'Confirmed' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
  courier: string;
}
