"use client";
import ChurnForm from "@/components/ProjectForms/ChurnForm";
import WarningNote from "@/components/UxWarning/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Example from "./example.mdx";
// Zod schema for churn prediction
const churnPredictionSchema = z.object({
  tenure: z.string(),
  contract: z.string(),
  monthlyCharges: z.string(),
  internetService: z.string(),
  paymentMethod: z.string(),
});

// Typescript type inference
type ChurnPredictionFormValues = z.infer<typeof churnPredictionSchema>;

const ChurnPredictionForm = () => {
  const [predictedChurn, setPredictedChurn] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const churnForm = useForm<ChurnPredictionFormValues>({
    resolver: zodResolver(churnPredictionSchema),
    defaultValues: {
      tenure: "12",
      contract: "Month-to-month",
      monthlyCharges: "50",
      internetService: "Fiber optic",
      paymentMethod: "Electronic check",
    },
  });

  // Handle form submission and churn prediction
  const onSubmit = async (data: ChurnPredictionFormValues) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/churn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to get prediction");
        const result = await response.json();
        setPredictedChurn(result.churn);
      } catch (error) {
        setPredictedChurn("Error occurred");
      }
    });
  };

  return (
    <div className="project w-full px-[5vw] portrait:px-0 flex flex-col pt-[10vh] portrait:pt-[5vh] items-center justify-center min-h-svh">
      <div className="w-full bg-primary px-[3vw]">
        <ChurnForm />
      </div>
      <WarningNote />
      {/* Example MDX Component */}
      <div className="w-full mb-10 bg-primary shadow-2xl prose prose-lg max-w-none p-[5vw] text-white prose-headings:text-white prose-a:text-white prose-strong:text-white prose-code:text-white portrait:px-[5vw] portrait:mb-0">
        <Example />
      </div>
    </div>
  );
};

export default ChurnPredictionForm;
