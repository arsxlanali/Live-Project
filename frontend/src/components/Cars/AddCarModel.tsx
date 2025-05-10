import { useState } from "react";
import { carService } from "@/services/carService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AddCarModal({ onCarAdded }: { onCarAdded: () => void }) {
  const [form, setForm] = useState({
    model: "",
    year: "",
    fuelUsage: "",
    driver: "",
    price: "",
    topSpeed: "",
    image: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [backendError, setBackendError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear field error
    setBackendError(null); // Clear backend error
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    Object.entries(form).forEach(([key, val]) => {
      if (!val) newErrors[key] = "This field is required.";
    });
    return newErrors;
  };

  const handleSubmit = async () => {
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      await carService.addCar(form);
      toast.success("Car added successfully");
      setOpen(false);
      setForm({
        model: "",
        year: "",
        fuelUsage: "",
        driver: "",
        price: "",
        topSpeed: "",
        image: "",
      });
      setErrors({});
      onCarAdded();
    } catch (error: any) {
        console.error("Failed to add car:", error);
      
        const serverErrors = error?.response?.data?.errors;
        if (Array.isArray(serverErrors)) {
          const formattedErrors: { [key: string]: string } = {};
          serverErrors.forEach((err: any) => {
            const field = err?.path?.[0];
            if (field) {
              formattedErrors[field] = err.message;
            }
          });
          setErrors(formattedErrors);
        } else {
          setBackendError(error?.response?.data?.message || "Failed to add car");
        }
      
        toast.error("Failed to add car");
      } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full flex items-center gap-2" variant="outline">
          + Add New Car
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Car</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {backendError && (
            <Badge className="bg-red-100 text-red-600 px-2 py-1 rounded">
              {backendError}
            </Badge>
          )}

          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <Input
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())}
              />
              {errors[key] && (
                <div className="text-xs text-red-500">{errors[key]}</div>
              )}
            </div>
          ))}

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Adding..." : "Add Car"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
