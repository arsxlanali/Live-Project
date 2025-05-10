import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { UserProfile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Home, Mail, User, UserRound, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export default function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const {user: {id}} = useAppSelector((state)=> state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await userService.getProfile(id);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  console.log("profile", profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!profile.email) newErrors.email = "Email is required";
    if (!profile.location) newErrors.location = "Location is required";
    if (!profile.address) newErrors.address = "Street Address is required";
    if (!profile.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!profile.gender) newErrors.gender = "Gender is required";
    if (!profile.photo) newErrors.photo = "Photo URL is required";
    if (!profile.facebook) newErrors.facebook = "Facebook URL is required";
    if (!profile.twitter) newErrors.twitter = "Twitter URL is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    setErrors({});
    try {
      setSaving(true);
      await userService.updateProfile(profile);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Failed to update profile:", error);
    
      // Check if the backend sent validation errors
      if (error?.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const newErrors: Record<string, string> = {};
    
        backendErrors.forEach((err: any) => {
          const field = err.path?.[0];
          const message = err.message || "Invalid value";
          if (field) newErrors[field] = message;
        });
    
        setErrors(newErrors);
        toast.error("Validation failed. Please check the form.");
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      <p className="text-gray-500 mb-8">Update your photo and personal details here.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live in</label>
            <div className="relative">
              <Home className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                name="location"
                value={profile.location || ""}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="City, Country"
              />
              {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <div className="relative">
              <Home className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                name="address"
                value={profile.address || ""}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="Street address"
              />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                name="email"
                type="email"
                value={profile.email || ""}
                onChange={handleInputChange}
                className="pl-10 w-full"
                placeholder="email@example.com"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
  <Popover>
    <PopoverTrigger asChild>
      <button
        type="button"
        className="w-full pl-10 pr-3 py-2 border rounded-md text-left relative"
      >
        <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {profile.dateOfBirth ? (
          format(new Date(profile.dateOfBirth), "PPP")
        ) : (
          <span className="text-gray-400">Pick a date</span>
        )}
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={profile.dateOfBirth ? new Date(profile.dateOfBirth) : undefined}
        onSelect={(date) => {
          handleSelectChange("dateOfBirth", date?.toISOString().split("T")[0] || "");
        }}
        initialFocus
      />
    </PopoverContent>
  </Popover>
  {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>}
</div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <Select
              value={profile.gender || ""}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <SelectValue placeholder="Select gender" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">
                  <div className="flex items-center">
                    <UserRound className="mr-2 h-4 w-4" /> Male
                  </div>
                </SelectItem>
                <SelectItem value="Female">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" /> Female
                  </div>
                </SelectItem>
                <SelectItem value="Other">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Other
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
          </div>
        </div>

        {/* Avatar Section */}
        <div className="border-t border-b py-8 my-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-1">Your photo</h3>
              <p className="text-gray-500 mb-4">This will be displayed on your profile.</p>
              <Input
                name="photo"
                value={profile.photo || ""}
                onChange={handleInputChange}
                placeholder="Photo URL"
              />
              {errors.photo && <p className="text-sm text-red-500 mt-1">{errors.photo}</p>}
            </div>
            <Avatar className="h-20 w-20 rounded-full">
              <AvatarImage src={profile.photo} />
              <AvatarFallback>
                {profile.firstName?.[0]}{profile.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" type="button">Delete</Button>
              <Button variant="outline" size="sm" type="button">Update</Button>
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div>
          <h3 className="font-medium mb-4">Social Profiles</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <Input
                name="facebook"
                value={profile.facebook || ""}
                onChange={handleInputChange}
                placeholder="facebook.com/"
              />
              {errors.facebook && <p className="text-sm text-red-500 mt-1">{errors.facebook}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
              <Input
                name="twitter"
                value={profile.twitter || ""}
                onChange={handleInputChange}
                placeholder="twitter.com/"
              />
              {errors.twitter && <p className="text-sm text-red-500 mt-1">{errors.twitter}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            // className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}