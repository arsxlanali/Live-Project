
import { useState } from "react";
import SettingsTabs from "@/components/Settings/SettingsTabs";
import ProfileForm from "@/components/Settings/ProfileForm";

type TabId = "details" | "profile" | "password" | "email" | "notification";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "email", label: "Email" },
    { id: "notification", label: "Notification" },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <SettingsTabs 
        tabs={tabs.map(tab => ({ id: tab.id, label: tab.label }))}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as TabId)}
      />
      
      <div className="bg-white rounded-3xl shadow p-8">
        {activeTab === "profile" && <ProfileForm />}
        
        {activeTab !== "profile" && (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label} Section
              </h3>
              <p className="text-gray-500">
                This section is not implemented in the current version.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
