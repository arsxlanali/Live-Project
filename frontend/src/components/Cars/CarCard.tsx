
import { Car } from "@/types/car";

interface CarCardProps {
  car: Car;
  isSelected: boolean;
  onClick: () => void;
}

export default function CarCard({ car, isSelected, onClick }: CarCardProps) {
  // Check if a field is empty or invalid
  const isInvalid = (value: string) => {
    return value === 'undefined' || value === 'null' || !value;
  };

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => {}}
        className="h-4 w-4 rounded border-gray-300 text-blue-500"
      />
      
      <div className="h-12 w-12 rounded-md overflow-hidden">
        <img 
          src={car.image} 
          alt={car.model} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <span className="font-medium">{car.model}</span>
        <span className="text-sm text-gray-500">
          {isInvalid(car.driver) ? 'N/A' : `${parseInt(car.driver).toLocaleString()} km`}
        </span>
      </div>
      
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium">
          {isInvalid(car.year) ? 'N/A' : car.year}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-500">Active</span>
        </div>
      </div>
    </div>
  );
}
