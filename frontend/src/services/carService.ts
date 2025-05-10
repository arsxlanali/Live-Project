import axios from "@/store/axiosInstance";
import { Car } from "@/types/car";

export const carService = {
  getCars: async (): Promise<Car[]> => {
    const response = await axios.get("/assets");
    return response.data;
  },

  addCar: async (car: Car): Promise<Car> => {
    const response = await axios.post("/assets", car);
    return response.data;
  }
};