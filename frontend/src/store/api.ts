
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Car } from '@/types/car';
import { UserProfile } from '@/types/profile';

// Define base API types
interface LoginRequest {
  email: string; 
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Define our base API configuration
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000', // Adjust the base URL as needed
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Cars', 'Profile'],
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => '/api/assets',
      providesTags: ['Cars']
    }),
    addCar: builder.mutation<Car, Omit<Car, 'id'>>({
      query: (car) => ({
        url: '/api/assets',
        method: 'POST',
        body: car,
      }),
      invalidatesTags: ['Cars']
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => '/api/profile',
      providesTags: ['Profile']
    }),
    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (profile) => ({
        url: '/api/profile',
        method: 'PUT',
        body: profile,
      }),
      invalidatesTags: ['Profile']
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/login',
        method: 'POST',
        body: credentials,
      })
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (userData) => ({
        url: '/api/signup',
        method: 'POST',
        body: userData,
      })
    }),
  }),
});

// Export hooks for usage in components
export const { 
  useGetCarsQuery, 
  useAddCarMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLoginMutation,
  useSignupMutation,
} = api;
