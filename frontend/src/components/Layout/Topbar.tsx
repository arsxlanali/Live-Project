
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <div className="h-16 px-6 border-b flex items-center justify-between">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search or type"
            className="h-10 w-full rounded-full bg-muted/30 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Bell className="w-5 h-5 text-gray-600" />
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
