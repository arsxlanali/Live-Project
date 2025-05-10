
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '@/types/car';

interface CarState {
  selectedCar: Car | null;
  loading: boolean;
  error: string | null;
}

const initialState: CarState = {
  selectedCar: null,
  loading: false,
  error: null,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setSelectedCar: (state, action: PayloadAction<Car>) => {
      state.selectedCar = action.payload;
    },

    clearSelectedCar: (state) => {
      state.selectedCar = null;
    },
    setCarLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCarError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setSelectedCar, 
  clearSelectedCar,
  setCarLoading,
  setCarError
} = carSlice.actions;
export default carSlice.reducer;
