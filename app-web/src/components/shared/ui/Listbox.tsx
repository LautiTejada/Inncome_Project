import { Listbox as HeadlessListbox } from '@headlessui/react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface ListboxProps {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
  placeholder?: string;
  className?: string;
}

const Listbox: React.FC<ListboxProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Seleccionar...",
  className 
}) => {
  return (
    <HeadlessListbox value={value} onChange={onChange}>
      <div className={cn("relative", className)}>
        <HeadlessListbox.Button className="relative w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-left text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span className="block truncate">
            {value?.label || placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <FiChevronDown className="w-4 h-4 text-gray-400" />
          </span>
        </HeadlessListbox.Button>
        <HeadlessListbox.Options className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <HeadlessListbox.Option
              key={option.value}
              value={option}
              className={({ active }) =>
                cn(
                  "relative cursor-default select-none py-2 pl-10 pr-4",
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
                      "absolute inset-y-0 left-0 flex items-center pl-3",
                      active ? "text-white" : "text-blue-400"
                    )}>
                      <FiCheck className="w-4 h-4" />
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

export default Listbox; 