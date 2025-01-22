import { Cuboid as Cube, Cylinder, Cherry as Sphere } from 'lucide-react';

interface ControlsProps {
  onShapeChange: (shape: string) => void;
  onColorChange: (color: string) => void;
}

export default function Controls({ onShapeChange, onColorChange }: ControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Shape</h3>
            <div className="flex gap-4">
              <button
                onClick={() => onShapeChange('box')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
              >
                <Cube className="w-5 h-5" />
                <span>Cube</span>
              </button>
              <button
                onClick={() => onShapeChange('sphere')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
              >
                <Sphere className="w-5 h-5" />
                <span>Sphere</span>
              </button>
              <button
                onClick={() => onShapeChange('cylinder')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
              >
                <Cylinder className="w-5 h-5" />
                <span>Cylinder</span>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex gap-4">
              {['#4f46e5', '#ef4444', '#10b981', '#f59e0b'].map((color) => (
                <button
                  key={color}
                  onClick={() => onColorChange(color)}
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}