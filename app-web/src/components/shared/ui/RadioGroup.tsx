import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ 
  options, 
  value, 
  onChange, 
  className 
}) => {
  return (
    <HeadlessRadioGroup value={value} onChange={onChange}>
      <div className={cn("space-y-2", className)}>
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ active, checked }) =>
              cn(
                "relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none",
                active && "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900",
                checked ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              )
            }
          >
            {({ checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <HeadlessRadioGroup.Label
                        as="p"
                        className={cn(
                          "font-medium",
                          checked ? "text-white" : "text-gray-300"
                        )}
                      >
                        {option.label}
                      </HeadlessRadioGroup.Label>
                      {option.description && (
                        <HeadlessRadioGroup.Description
                          as="span"
                          className={cn(
                            "inline",
                            checked ? "text-blue-100" : "text-gray-400"
                          )}
                        >
                          {option.description}
                        </HeadlessRadioGroup.Description>
                      )}
                    </div>
                  </div>
                  {checked && (
                    <div className="shrink-0 text-white">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="currentColor" />
                        <path
                          d="M7 13l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </div>
    </HeadlessRadioGroup>
  );
};

export default RadioGroup; 