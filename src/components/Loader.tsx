// src/components/Loader.tsx
import { Utensils } from 'lucide-react';
import { useLoader } from "../context/LoaderContext"

export const Loader: React.FC = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null; // Don't render loader if not loading

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="text-4xl text-indigo-600">
        <Utensils className="animate-spin" />
      </div>
      <p className="mt-4 text-xl text-white">Loading...</p>
    </div>
  );
};

