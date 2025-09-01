"use client";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SimpleTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function SimpleTabs({ tabs, activeTab, onTabChange }: SimpleTabsProps) {
  return (
    <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 border border-gray-700/50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            ${activeTab === tab.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }
          `}>
          {tab.icon && tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
