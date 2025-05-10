
import { ReactNode } from "react";

interface CarStatProps {
  label: string;
  value: string;
  unit?: string;
}

export default function CarStat({ label, value, unit }: CarStatProps) {
  // Handle various types of 'empty' values
  let displayValue = value;
  
  if (value === "undefined" || value === "null" || !value) {
    displayValue = "N/A";
  } else if (label === "Total Cost" && value !== "N/A") {
    // Format the price with $ and commas
    displayValue = `$${parseInt(value).toLocaleString()}`;
  } else if (unit) {
    displayValue = `${parseInt(value).toLocaleString()} ${unit}`;
  }
  
  return (
    <div className="flex flex-col">
      <span className="text-white/80 text-sm mb-1">{label}</span>
      <span className="text-white font-semibold text-2xl">{displayValue}</span>
    </div>
  );
}
