import { Listbox as HeadlessListbox } from '@headlessui/react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface CompactListboxProps {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
  placeholder?: string;
  className?: string;
}

const CompactListbox: React.FC<CompactListboxProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Seleccionar...",
  className 
}) => {
  return (
    <HeadlessListbox value={value} onChange={onChange}>
      <div className={cn("relative", className)}>
        <HeadlessListbox.Button className="relative w-full pl-3 pr-8 py-1.5 bg-gray-700 border border-gray-600 rounded-full text-left text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <span className="block truncate">
            {value?.label || placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <FiChevronDown className="w-3 h-3 text-gray-400" />
          </span>
        </HeadlessListbox.Button>
        <HeadlessListbox.Options className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-40 overflow-auto">
          {options.map((option) => (
            <HeadlessListbox.Option
              key={option.value}
              value={option}
              className={({ active }) =>
                cn(
                  "relative cursor-default select-none py-1.5 pl-8 pr-3 text-sm",
                  active ? "bg-blue-600 text-white" : "text-gray-300"
                )
              }
            >
              {({ selected, active }) => (
                <>
                  <span className={cn("block truncate", selected ? "font-medium" : "font-normal")}>
                    {option.label}
                  </span>
                  {selected && (
                    <span className={cn(
                      "absolute inset-y-0 left-0 flex items-center pl-2",
                      active ? "text-white" : "text-blue-400"
                    )}>
                      <FiCheck className="w-3 h-3" />
                    </span>
                  )}
                </>
              )}
            </HeadlessListbox.Option>
          ))}
        </HeadlessListbox.Options>
      </div>
    </HeadlessListbox>
  );
};

export default CompactListbox; 