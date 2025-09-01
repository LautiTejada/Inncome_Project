import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';

// Compound Component Pattern
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

const Dialog: React.FC<DialogProps> & {
  Content: React.FC<DialogContentProps>;
  Header: React.FC<DialogHeaderProps>;
  Title: React.FC<DialogTitleProps>;
  Description: React.FC<DialogDescriptionProps>;
} = ({ open, onOpenChange, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={() => onOpenChange(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 shadow-xl transition-all">
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

Dialog.Content = ({ children, className }) => {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
};
Dialog.Content.displayName = 'Dialog.Content';

Dialog.Header = ({ children, className }) => {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      {children}
    </div>
  );
};
Dialog.Header.displayName = 'Dialog.Header';

Dialog.Title = ({ children, className }) => {
  return (
    <HeadlessDialog.Title className={cn("text-lg font-semibold text-white", className)}>
      {children}
    </HeadlessDialog.Title>
  );
};
Dialog.Title.displayName = 'Dialog.Title';

Dialog.Description = ({ children, className }) => {
  return (
    <HeadlessDialog.Description className={cn("text-sm text-gray-300", className)}>
      {children}
    </HeadlessDialog.Description>
  );
};
Dialog.Description.displayName = 'Dialog.Description';

export default Dialog; 