
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="bg-white rounded-3xl shadow p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Welcome to CarDash</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            This is a placeholder for the Dashboard. Check out the Assets section to see the implemented functionality.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/assets">View Assets</Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/settings">Settings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
