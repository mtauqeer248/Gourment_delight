import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// CartItem interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  id: string;
  items: CartItem[];
  total: number;
  status: 'preparing' | 'cooking' | 'ready' | 'delivered';
  estimatedTime: number;
}

interface OrderContextType {
  currentOrder: OrderDetails | null;
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (total: number) => void;
  updateOrderStatus: () => void;
  clearCurrentOrder: () => void;
  total: number;
}

const OrderContext = createContext<OrderContextType>({
  currentOrder: null,
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  createOrder: () => {},
  updateOrderStatus: () => {},
  clearCurrentOrder: () => {},
  total: 0
});

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(() => {
    const savedOrder = localStorage.getItem('currentOrder');
    return savedOrder ? JSON.parse(savedOrder) : null;
  });

  // Update localStorage when items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  // Update localStorage when order changes
  useEffect(() => {
    if (currentOrder) {
      localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
    } else {
      localStorage.removeItem('currentOrder');
    }
  }, [currentOrder]);

  // Cart methods
  const addToCart = useCallback((item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return currentItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...currentItems, item];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setItems(currentItems => 
      quantity > 0
        ? currentItems.map(item => 
            item.id === itemId ? { ...item, quantity } : item
          )
        : currentItems.filter(item => item.id !== itemId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Order methods
  const createOrder = useCallback((total: number) => {
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const newOrder: OrderDetails = {
      id: orderId,
      items,
      total,
      status: 'preparing',
      estimatedTime: 30
    };
    
    setCurrentOrder(newOrder);
    clearCart(); // Clear cart after creating order
  }, [items, clearCart]);

  const updateOrderStatus = useCallback(() => {
    if (!currentOrder) return;
    
    const statusProgression: Array<OrderDetails['status']> = [
      'preparing', 'cooking', 'ready', 'delivered'
    ];
    
    const currentIndex = statusProgression.indexOf(currentOrder.status);
    
    if (currentIndex < statusProgression.length - 1) {
      setCurrentOrder(prev => prev ? {
        ...prev,
        status: statusProgression[currentIndex + 1],
        estimatedTime: Math.max(0, (prev.estimatedTime || 30) - 10)
      } : null);
    }
  }, [currentOrder]);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  return (
    <OrderContext.Provider value={{
      currentOrder,
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      createOrder,
      updateOrderStatus,
      clearCurrentOrder,
      total
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}


