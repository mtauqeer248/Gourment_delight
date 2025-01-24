import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Package } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function OrderTracker() {
  const location = useLocation();
  const items = location.state?.items || [];
  const [orderId, setOrderId] = useState<string>('');
  const [status, setStatus] = useState<'preparing' | 'cooking' | 'ready' | 'delivered'>('preparing');
  const [estimatedTime, setEstimatedTime] = useState<number>(30);

  useEffect(() => {
    // Generate random order ID
    const generateOrderId = () => Math.random().toString(36).substring(2, 10).toUpperCase();
    setOrderId(generateOrderId());
  
    // Define status progression with explicit typing
    const statusProgression: Array<'preparing' | 'cooking' | 'ready' | 'delivered'> = [
      'preparing',
      'cooking',
      'ready',
      'delivered',
    ];
    const intervalTime = 30000; // 30 seconds between status changes
  
    const progressOrder = () => {
      const currentIndex = statusProgression.indexOf(status);
      if (currentIndex < statusProgression.length - 1) {
        setStatus(statusProgression[currentIndex + 1]); // Type is now explicitly defined
        setEstimatedTime((prev) => Math.max(0, prev - 10)); // Reduce estimated time
      }
    };
  

    // Start order progression
    const progressInterval = setInterval(progressOrder, intervalTime);

    // Clear cart on initial render
   

    // Cleanup interval
    return () => clearInterval(progressInterval);
  }, [status]);

  const steps = [
    { id: 'preparing', label: 'Order Received', icon: CheckCircle2 },
    { id: 'cooking', label: 'Cooking', icon: Clock },
    { id: 'ready', label: 'Ready for Pickup', icon: Package },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === status);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Order #{orderId}</h2>
        <div className="text-indigo-600 font-semibold">
          Est. Time: {estimatedTime} mins
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Order Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex items-center bg-gray-100 rounded-lg p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">
                  Qty: {item.quantity} • ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Tracking Steps */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -translate-y-1/2" />
        <div
          className="absolute left-0 top-1/2 h-1 bg-indigo-600 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center 
                  ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'}
                  transition-colors duration-300
                `}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`
                  mt-2 text-sm font-medium
                  ${isActive ? 'text-indigo-600' : 'text-gray-400'}
                `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
