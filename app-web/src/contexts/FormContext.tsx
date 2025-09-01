"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface FormContextType {
  isAnyFormOpen: boolean;
  openForm: (formId: string) => void;
  closeForm: (formId: string) => void;
  closeAllForms: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [openForms, setOpenForms] = useState<Set<string>>(new Set());

  const openForm = useCallback((formId: string) => {
    setOpenForms(prev => new Set(prev).add(formId));
  }, []);

  const closeForm = useCallback((formId: string) => {
    setOpenForms(prev => {
      const newSet = new Set(prev);
      newSet.delete(formId);
      return newSet;
    });
  }, []);

  const closeAllForms = useCallback(() => {
    setOpenForms(new Set());
  }, []);

  const isAnyFormOpen = openForms.size > 0;

  return (
    <FormContext.Provider value={{
      isAnyFormOpen,
      openForm,
      closeForm,
      closeAllForms
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
