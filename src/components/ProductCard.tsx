import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onAddToCart: () => void;
}

export default function ProductCard({ 
  name, 
  price, 
  description, 
  image,
  onAddToCart 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#FF4B2B]">{name}</h3>
          <span className="text-lg font-bold text-[#FFC93C]">${price.toFixed(2)}</span>
        </div>
        <p className="text-[#333333] text-sm mb-4">{description}</p>
        <button
          onClick={onAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-[#FF4B2B] text-white py-2 px-4 rounded-lg hover:bg-[#e0451f] transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}