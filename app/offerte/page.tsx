"use client";

import { FormProvider, useFormContext } from "@/components/offerte/form-context";
import { StepProduct } from "@/components/offerte/step-product";
import { StepDimensions } from "@/components/offerte/step-dimensions";
import { StepOptions } from "@/components/offerte/step-options";
import { StepContact } from "@/components/offerte/step-contact";
import { StepSummary } from "@/components/offerte/step-summary";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stepLabels = ["Product", "Afmetingen", "Opties", "Contact", "Overzicht"];

const stepComponents = [
  StepProduct,
  StepDimensions,
  StepOptions,
  StepContact,
  StepSummary,
];

function StepIndicator() {
  const { currentStep, totalSteps } = useFormContext();

  return (
    <div className="mb-8 flex items-center gap-2">
      {stepLabels.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                i <= currentStep
                  ? "bg-[#1A2E2E] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`hidden text-xs font-medium lg:inline ${
                i === currentStep ? "text-[#1A2E2E]" : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`h-px w-4 transition-colors lg:w-6 ${
                i < currentStep ? "bg-[#1A2E2E]" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function WizardContent() {
  const { currentStep, nextStep, prevStep, totalSteps } = useFormContext();
  const CurrentStepComponent = stepComponents[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div>
      <div className="rounded-2xl border border-border/50 bg-card p-6">
        <CurrentStepComponent />
      </div>

      {/* Navigation — hidden on step 1 (auto-advances) and summary (has its own button) */}
      {!isFirstStep && !isLastStep && (
        <div className="mt-6 flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={prevStep}
            className="flex-1 border-[#1A2E2E] text-[#1A2E2E] hover:bg-[#1A2E2E]/5 sm:flex-none"
          >
            <ChevronLeft className="size-4" />
            Vorige
          </Button>
          <Button
            onClick={nextStep}
            className="flex-1 bg-[#C4D668] text-[#1A2E2E] hover:bg-[#b5c75a] sm:flex-none"
          >
            Volgende
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      {/* Summary: only show back button */}
      {isLastStep && (
        <div className="mt-6">
          <Button variant="outline" onClick={prevStep} className="w-full sm:w-auto">
            <ChevronLeft className="size-4" />
            Terug naar Contact
          </Button>
        </div>
      )}
    </div>
  );
}

import { DoorVisualizer } from "@/components/configurator/door-visualizer";

export default function OffertePage() {
  return (
    <FormProvider>
      {/* Mobile Header */}
      <div className="px-4 py-6 lg:hidden">
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-[#1A2E2E]">
          Configureer uw deur
        </h1>
        <p className="text-sm text-gray-600">
          Ontwerp uw stalen deur in realtime.
        </p>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-12 lg:px-8 lg:py-12">
        {/* Left Column: Live Visualizer (Desktop Only) */}
        <div className="relative hidden lg:col-span-8 lg:block lg:h-[calc(100vh-150px)]">
          <div className="sticky top-24 h-full">
            <DoorVisualizer />
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl bg-white p-6 shadow-xl lg:p-8">
            <h2 className="mb-6 text-2xl font-bold text-[#1A2E2E]">
              Configureer uw deur
            </h2>

            <StepIndicator />
            <WizardContent />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
