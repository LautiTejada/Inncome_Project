import { Tab as HeadlessTab } from '@headlessui/react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabProps {
  items: TabItem[];
  defaultIndex?: number;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ items, defaultIndex = 0, className }) => {
  return (
    <HeadlessTab.Group defaultIndex={defaultIndex}>
      <HeadlessTab.List className={cn("flex space-x-1 bg-gray-800 rounded-lg p-1", className)}>
        {items.map((item) => (
          <HeadlessTab
            key={item.id}
            className={({ selected }) =>
              cn(
                "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none",
                selected
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )
            }
          >
            {item.label}
          </HeadlessTab>
        ))}
      </HeadlessTab.List>
      <HeadlessTab.Panels className="mt-6">
        {items.map((item) => (
          <HeadlessTab.Panel
            key={item.id}
            className="focus:outline-none"
          >
            {item.content}
          </HeadlessTab.Panel>
        ))}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
};

export default Tab; 