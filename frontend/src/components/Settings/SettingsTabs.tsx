
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface SettingsTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function SettingsTabs({ tabs, activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="flex space-x-2 mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-3 text-sm font-medium rounded-lg transition-all",
            activeTab === tab.id
              ? "bg-purple-100 text-purple-800"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
