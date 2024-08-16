"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Example from "./example.mdx"
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
  const onSubmit = (data: ChurnPredictionFormValues) => {
    console.log(data);
    startTransition(() => {
      setPredictedChurn("Likely to churn");
    });
  };

  return (
    <div className="project w-full px-[5vw] portrait:px-0 flex flex-col pt-[10vh] portrait:pt-[5vh] items-center justify-center min-h-svh">
      <div className="w-full bg-primary px-[3vw]">
        <Form {...churnForm}>
          <form
            onSubmit={churnForm.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto py-20"
          >
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={churnForm.control}
              name="contract"
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

            <FormField
              control={churnForm.control}
              name="monthlyCharges"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel className="text-white">Monthly Charges ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Monthly Charges"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={churnForm.control}
              name="internetService"
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
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel className="text-white">Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Payment Method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Electronic check">Electronic check</SelectItem>
                      <SelectItem value="Mailed check">Mailed check</SelectItem>
                      <SelectItem value="Bank transfer">Bank transfer</SelectItem>
                      <SelectItem value="Credit card">Credit card</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-[90%] mx-auto mt-8 bg-secondary hover:bg-secondary/80"
            >
              Predict Churn
            </Button>
          </form>
          {predictedChurn !== null && (
            <div className="mb-10 w-full">
              <h2 className="text-2xl text-center text-white font-bold">
                Prediction: {predictedChurn}
              </h2>
            </div>
          )}
        </Form>
        </div>
      <div className="w-full mb-10 bg-primary shadow-2xl prose prose-lg max-w-none p-[5vw] text-white prose-headings:text-white prose-a:text-white prose-strong:text-white prose-code:text-white
      portrait:px-[5vw] portrait:mb-0">
    <Example />
</div>

    </div>
  );
};

export default ChurnPredictionForm;
