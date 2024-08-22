"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WarningNote from "@/components/UxWarning/page";
import { churnPredictionSchema } from "@/models/mlSchemas";

// Typescript type inference
type ChurnPredictionFormValues = z.infer<typeof churnPredictionSchema>;

const ChurnForm = () => {
  const [predictedChurn, setPredictedChurn] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const churnForm = useForm<ChurnPredictionFormValues>({
    resolver: zodResolver(churnPredictionSchema),
    defaultValues: {
      MonthlyCharges: 45,
      TotalCharges: 900,
      InternetService: "Fiber optic",
      tenure: 3,
      Contract: "Month-to-month",
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
    <Form {...churnForm}>
      <form
        onSubmit={churnForm.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto py-20"
      >

        <FormField
          control={churnForm.control}
          name="MonthlyCharges"
          render={({ field }) => (
            <FormItem className="w-[90%] mx-auto">
              <FormLabel className="text-white">Monthly Charges ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Monthly Charges"
                  {...field}
                  disabled={isPending}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



        <FormField
          control={churnForm.control}
          name="TotalCharges"
          render={({ field }) => (
            <FormItem className="w-[90%] mx-auto">
              <FormLabel className="text-white">Total Charges ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total Charges"
                  {...field}
                  disabled={isPending}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}

                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={churnForm.control}
          name="InternetService"
          render={({ field }) => (
            <FormItem className="w-[90%] mx-auto">
              <FormLabel className="text-white">Internet Service</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Internet Service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DSL">DSL</SelectItem>
                  <SelectItem value="Fiber optic">Fiber optic</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={churnForm.control}
          name="tenure"
          render={({ field }) => (
            <FormItem className="w-[90%] mx-auto">
              <FormLabel className="text-white">Tenure (months)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Tenure"
                  {...field}
                  disabled={isPending}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={churnForm.control}
          name="Contract"
          render={({ field }) => (
            <FormItem className="w-[90%] mx-auto">
              <FormLabel className="text-white">Contract Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Contract" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Month-to-month">Month-to-month</SelectItem>
                  <SelectItem value="One year">One year</SelectItem>
                  <SelectItem value="Two year">Two year</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />






        <div className="flex items-center justify-center">
          <Button
            type="submit"
            disabled={isPending}
            className="w-[90%] mx-auto mt-8 bg-secondary hover:bg-secondary/80"
          >
            Predict Churn
          </Button>
        </div>

        {predictedChurn && (
          <div className="text-center col-span-full mt-2">
            <h2 className="text-2xl text-white">Prediction: {predictedChurn}</h2>
          </div>
        )}
      </form>
    </Form>
  )
}

export default ChurnForm