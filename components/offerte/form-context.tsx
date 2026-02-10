"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { QuoteData } from "@/lib/validators";

const TOTAL_STEPS = 5; // 4 form steps + 1 summary

type FormData = Partial<QuoteData>;

interface FormContextValue {
  currentStep: number;
  formData: FormData;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateData: (data: Partial<FormData>) => void;
  reset: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, TOTAL_STEPS - 1)));
  }, []);

  const updateData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setFormData({});
  }, []);

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        totalSteps: TOTAL_STEPS,
        nextStep,
        prevStep,
        goToStep,
        updateData,
        reset,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within <FormProvider>");
  return ctx;
}
