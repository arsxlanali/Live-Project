
import { useState, useEffect } from "react";
import { Car } from "@/types/car";
import { carService } from "@/services/carService";
import CarStat from "@/components/Cars/CarStat";
import CarCard from "@/components/Cars/CarCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NotesCard from "@/components/Cars/NoteCard";
import { motion, AnimatePresence } from "framer-motion";
import AddCarModal from "@/components/Cars/AddCarModel";
export default function Assets() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getCars();
        setCars(data);
        if (data.length > 0) {
          setSelectedCar(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await carService.getCars();
      setCars(data);
      if (data.length > 0) {
        setSelectedCar(data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCars();
  }, []);

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <h1 className="text-3xl font-bold">No cars found</h1>
        <AddCarModal onCarAdded={fetchCars} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Assets</h1>

      <div
        className="grid gap-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
          height: "100vh", // Optional: make grid occupy full height
        }}
      >
        {/* div1: Sidebar-like car list and notes */}
        <div
          className="bg-blue-500 rounded-3xl p-6 text-white relative overflow-visible"
          style={{ gridColumn: "1 / 3", gridRow: "1 / 6" }}
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8 relative z-10">
            <CarStat label="Fuel Usage" value={selectedCar?.fuelUsage || ""} unit="Ltr" />
            <CarStat label="KM Driven" value={selectedCar?.driver || ""} unit="km" />
            <CarStat label="Total Cost" value={selectedCar?.price || ""} />
            <CarStat label="Top Speed" value={selectedCar?.topSpeed || ""} unit="km/h" />
          </div>

          <div className="absolute bottom--20 left-10 right-0 flex justify-center align-items-center" style={{left: "-40px"}}>
            <AnimatePresence mode="wait">
              {selectedCar && (
                <motion.img
                  key={selectedCar.id} // triggers animation on car change
                  src={"carimage.png"}
                  alt={selectedCar.model}
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 150, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  className="w-full"
                />
              )}
            </AnimatePresence>
          </div>


        </div>

        {/* div2: Car stats overview */}
        <div
          className="bg-white rounded-3xl shadow p-6 flex flex-col"
          style={{ gridColumn: "3 / 6", gridRow: "1 / 4" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            {selectedCar?.year} {selectedCar?.model}
          </h2>

          {/* Image grows to fill remaining space */}
          <div className="w-full flex-1 overflow-hidden rounded-xl">
            <img
              src={selectedCar?.image}
              alt={selectedCar?.model}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* div3: Car name and image */}
        <div
          className="bg-white rounded-3xl shadow p-6 flex"
          style={{ gridColumn: "3 / 5", gridRow: "4 / 6" }}

        >
          <div style={{ width: "-webkit-fill-available" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Available Cars</h2>
              <select className="text-sm border rounded p-1">
                <option>Assets</option>
                <option>Recently Used</option>
                <option>All Cars</option>
              </select>
            </div>
            <div>


              <div className="space-y-2 mb-4 overflow-y-auto max-h-60">
                {cars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    isSelected={selectedCar?.id === car.id}
                    onClick={() => handleSelectCar(car)}
                  />
                ))}
              </div>

              <AddCarModal onCarAdded={fetchCars} />
            </div>

          </div>


        </div>

        {/* div4: Placeholder or add-on section */}
        <div
          className="bg-white rounded-3xl shadow p-6 overflow-y-auto"
          style={{ gridColumn: "5 / 6", gridRow: "4 / 6" }}
        >
          <NotesCard />
        </div>
      </div>
    </div>
  );
}
