import { CheckCircle2, Clock, Package } from 'lucide-react';

interface OrderTrackerProps {
  status: 'preparing' | 'cooking' | 'ready' | 'delivered';
  estimatedTime?: number;
  orderId: string;
}

export default function OrderTracker({ status, estimatedTime, orderId }: OrderTrackerProps) {
  const steps = [
    { id: 'preparing', label: 'Order Received', icon: CheckCircle2 },
    { id: 'cooking', label: 'Cooking', icon: Clock },
    { id: 'ready', label: 'Ready for Pickup', icon: Package },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === status);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Order #{orderId}</h2>
        {estimatedTime && (
          <div className="text-indigo-600 font-medium">
            Est. Time: {estimatedTime} mins
          </div>
        )}
      </div>

      <div className="relative">
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
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center 
                  ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'}
                  transition-colors duration-300
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`
                  mt-2 text-sm font-medium
                  ${isActive ? 'text-indigo-600' : 'text-gray-400'}
                `}>
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