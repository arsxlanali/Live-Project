import axios from "@/store/axiosInstance";
import { UserProfile } from "@/types/profile";

export const userService = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const response = await axios.get(`/profile/${userId}`);
    return response.data;
  },

  updateProfile: async (profile: UserProfile): Promise<UserProfile> => {
    const response = await axios.put("/profile", {
      name: `${profile.firstName} ${profile.lastName}`,
      email: profile.email,
      location: profile.location,
      address: profile.address,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      photo: profile.photo,
      facebook: profile.facebook,
      twitter: profile.twitter,
    });
    return response.data;
  }
};