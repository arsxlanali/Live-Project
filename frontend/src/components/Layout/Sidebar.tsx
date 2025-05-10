import { useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Car, 
  CalendarClock, 
  ShoppingBag, 
  ShoppingCart, 
  Wrench, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut 
} from "lucide-react";

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  path: string;
  isActive: boolean;
}

const SidebarLink = ({ icon, text, path, isActive }: SidebarLinkProps) => {
  return (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarLinks = [
    { 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      text: "Dashboard", 
      path: "/dashboard" 
    },
    { 
      icon: <Car className="w-5 h-5" />, 
      text: "Assets", 
      path: "/assets" 
    },
    { 
      icon: <CalendarClock className="w-5 h-5" />, 
      text: "Booking", 
      path: "/booking" 
    },
    { 
      icon: <ShoppingBag className="w-5 h-5" />, 
      text: "Sell Cars", 
      path: "/sell-cars" 
    },
    { 
      icon: <ShoppingCart className="w-5 h-5" />, 
      text: "Buy Cars", 
      path: "/buy-cars" 
    },
    { 
      icon: <Wrench className="w-5 h-5" />, 
      text: "Services", 
      path: "/services" 
    },
    { 
      icon: <Calendar className="w-5 h-5" />, 
      text: "Calendar", 
      path: "/calendar" 
    },
    { 
      icon: <MessageSquare className="w-5 h-5" />, 
      text: "Messages", 
      path: "/messages" 
    },
  ];

  const bottomLinks = [
    { 
      icon: <Settings className="w-5 h-5" />, 
      text: "Settings", 
      path: "/settings" 
    },
    { 
      icon: <LogOut className="w-5 h-5" />, 
      text: "Log out", 
      path: "/logout" 
    },
  ];

  return (
    <div className="h-screen bg-white border-r flex flex-col w-64 p-5">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">
          T
        </div>
        <h1 className="text-xl font-bold">CarDash</h1>
      </div>

      <nav className="flex-1">
        <div className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.path}
              icon={link.icon}
              text={link.text}
              path={link.path}
              isActive={currentPath === link.path}
            />
          ))}
        </div>
      </nav>

      <div className="border-t pt-4 mt-4">
        <div className="flex flex-col gap-1">
          {bottomLinks.map((link) => (
            <SidebarLink
              key={link.path}
              icon={link.icon}
              text={link.text}
              path={link.path}
              isActive={currentPath === link.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
