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
                  ? "bg-brand-orange text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`hidden text-xs font-medium lg:inline ${
                i === currentStep ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`h-px w-4 transition-colors lg:w-6 ${
                i < currentStep ? "bg-brand-orange" : "bg-border"
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
          <Button variant="outline" onClick={prevStep} className="flex-1 sm:flex-none">
            <ChevronLeft className="size-4" />
            Vorige
          </Button>
          <Button
            onClick={nextStep}
            className="flex-1 bg-brand-orange text-white hover:bg-brand-orange/90 sm:flex-none"
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

export default function OffertePage() {
  return (
    <FormProvider>
      {/* Mobile Header */}
      <div className="px-4 py-6 lg:hidden">
        <h1 className="mb-1 text-2xl font-bold tracking-tight">
          Offerte Aanvragen
        </h1>
        <p className="text-sm text-muted-foreground">
          Configureer uw product in een paar stappen.
        </p>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-12 lg:px-8 lg:py-12">
        {/* Left Column: Visual Preview (Desktop Only) */}
        <div className="relative hidden overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-100 to-slate-200 lg:col-span-8 lg:block lg:h-[calc(100vh-150px)]">
          <div className="sticky top-24 flex h-full items-center justify-center">
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem]">
              <img
                src="/images/hero.jpg"
                alt="Product preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-8 top-8">
                <div className="rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  Live Voorbeeld
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl bg-white p-6 shadow-xl lg:p-8">
            <h2 className="mb-6 text-2xl font-bold text-brand-dark-green">
              Configureer jouw product
            </h2>

            <StepIndicator />
            <WizardContent />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
