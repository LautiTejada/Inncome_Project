import { Combobox as HeadlessCombobox } from '@headlessui/react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option) => void;
  placeholder?: string;
  className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Seleccionar...",
  className 
}) => {
  return (
    <HeadlessCombobox value={value} onChange={onChange}>
      <div className={cn("relative", className)}>
        <div className="relative">
          <HeadlessCombobox.Input
            className="w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            displayValue={(option: Option) => option?.label}
            placeholder={placeholder}
          />
          <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <FiChevronDown className="w-4 h-4 text-gray-400" />
          </HeadlessCombobox.Button>
        </div>
        <HeadlessCombobox.Options className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <HeadlessCombobox.Option
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
            </HeadlessCombobox.Option>
          ))}
        </HeadlessCombobox.Options>
      </div>
    </HeadlessCombobox>
  );
};

export default Combobox; 