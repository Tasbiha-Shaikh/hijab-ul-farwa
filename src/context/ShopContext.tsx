import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CheckoutFormData, PlacedOrder } from '../types';
import { PRODUCTS, ATELIER_WHATSAPP } from '../data/catalog';

interface ShopContextType {
  currentView: 'home' | 'product' | 'wholesale' | 'checkout' | 'wishlist' | 'order-confirmed';
  setCurrentView: (view: 'home' | 'product' | 'wholesale' | 'checkout' | 'wishlist' | 'order-confirmed') => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  openProduct: (product: Product) => void;
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: string, selectedSize: number, quantity?: number, isWholesale?: boolean) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  totalPayable: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  whatsAppMessage: string;
  openWhatsAppModal: (initialText?: string) => void;
  sendDirectWhatsApp: (text?: string) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  placedOrders: PlacedOrder[];
  lastPlacedOrder: PlacedOrder | null;
  submitOrder: (data: CheckoutFormData) => PlacedOrder;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'wholesale' | 'checkout' | 'wishlist' | 'order-confirmed'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-001', 'prod-002']);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pre-fill initial cart with sample items as shown in Image 4 screenshot
  const [cart, setCart] = useState<CartItem[]>(() => {
    const p1 = PRODUCTS[0];
    const p2 = {
      ...PRODUCTS[1],
      id: 'prod-georgette-hijab',
      name: 'Premium Georgette Hijab',
      price: 950,
      fabric: 'Breathable Crepe',
    };
    return [
      {
        id: `${p1.id}-Jet Black-54`,
        productId: p1.id,
        product: p1,
        selectedColor: 'Jet Black',
        selectedSize: 54,
        quantity: 1,
        pricePerUnit: p1.price,
      },
      {
        id: `${p2.id}-Mushroom Taupe-0`,
        productId: p2.id,
        product: p2 as unknown as Product,
        selectedColor: 'Mushroom Taupe',
        selectedSize: 0,
        quantity: 1,
        pricePerUnit: 950,
      },
    ];
  });

  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>([]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: number,
    quantity: number = 1,
    isWholesale: boolean = false
  ) => {
    const unitPrice = isWholesale ? product.wholesalePrice : product.price;
    const itemId = `${product.id}-${selectedColor}-${selectedSize}${isWholesale ? '-ws' : ''}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity,
          pricePerUnit: unitPrice,
          isWholesaleTier: isWholesale,
        },
      ];
    });

    showToast(`Added ${product.name} to Atelier Bag`);
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => (item.id === itemId ? { ...item, quantity: qty } : item)));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from Atelier Bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const shippingFee = 0; // Free nationwide promo
  const totalPayable = cartSubtotal + shippingFee;

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openWhatsAppModal = (initialText?: string) => {
    const text = initialText || `Assalam-o-Alaikum! I am reaching out to Hijab Ul Farwa Atelier regarding an inquiry from your website.`;
    setWhatsAppMessage(text);
    setIsWhatsAppModalOpen(true);
  };

  const sendDirectWhatsApp = (text?: string) => {
    const message = text || `Assalam-o-Alaikum Hijab Ul Farwa Atelier! I am inquiring about abayas & wholesale from your website.`;
    const cleanNumber = ATELIER_WHATSAPP.replace(/\D/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const submitOrder = (formData: CheckoutFormData): PlacedOrder => {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `TRAX-HUF-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: PlacedOrder = {
      orderId: `HUF-${randomId}`,
      createdAt: new Date().toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      shipping: shippingFee,
      totalPayable: totalPayable,
      customer: formData,
      status: 'Confirmed',
      trackingNumber: trackingCode,
      courier: 'Trax / Leopards Logistics Express',
    };

    setPlacedOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCart([]);
    setCurrentView('order-confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Order #${newOrder.orderId} booked with Open Parcel verification!`);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        openProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        totalPayable,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        whatsAppMessage,
        openWhatsAppModal,
        sendDirectWhatsApp,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        placedOrders,
        lastPlacedOrder,
        submitOrder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
