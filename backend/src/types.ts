export interface AssetInput {
    model: string;
    year: string;
    fuelUsage?: string;
    driver?: string;
    price?: string;
    topSpeed: string;
    image: string;
  }
  
  export interface UserInput {
    email: string;
    password: string;
    name?: string;
    location?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: string;
    photo?: string;
    facebook?: string;
    twitter?: string;
  }
  