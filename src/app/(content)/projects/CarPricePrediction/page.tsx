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
import Example from "./example.mdx";
// Zod schema for simplified model
const carPricePredictionSchema = z.object({
  enginesize: z.string(),
  horsepower: z.string(),
  curbweight: z.string(),
  citympg: z.string(),
  highwaympg: z.string(),
});

// Typescript type inference
type CarPricePredictionFormValues = z.infer<typeof carPricePredictionSchema>;

const CarPricePredictionForm = () => {
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const carform = useForm<CarPricePredictionFormValues>({
    resolver: zodResolver(carPricePredictionSchema),
    defaultValues: {
      enginesize: "100",
      horsepower: "100",
      curbweight: "3000",
      citympg: "50",
      highwaympg: "60",
    },
  });

  // Handle form submission and calculation
  const onSubmit = (data: CarPricePredictionFormValues) => {
    console.log(typeof data.citympg);
    startTransition(() => {
      setPredictedPrice(10000);
    });
  };

  return (
    <div className="project w-full px-[5vw] portrait:px-0 flex flex-col pt-[10vh] portrait:pt-[5vh] items-center justify-center min-h-svh">
      <div className="w-full bg-primary px-[3vw]">
        <Form {...carform}>
          <form
            onSubmit={carform.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto py-20"
          >
            <FormField
              control={carform.control}
              name="enginesize"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel className="text-white">Engine Size (cc)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Engine Size"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={carform.control}
              name="horsepower"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel className="text-white">Horsepower</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Horsepower"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={carform.control}
              name="curbweight"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel className="text-white">
                    Curb Weight (lbs)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Curb Weight"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={carform.control}
              name="citympg"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel className="text-white">City MPG</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="City MPG"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={carform.control}
              name="highwaympg"
              render={({ field }) => (
                <FormItem className="w-[90%] mx-auto">
                  <FormLabel className="text-white">Highway MPG</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Highway MPG"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
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
              Predict Price
            </Button>
          </form>
          {predictedPrice !== null && (
            <div className="mb-10 w-full">
              <h2 className="text-2xl text-center text-white font-bold">
                Predicted Price: ${predictedPrice.toFixed(2)}
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

export default CarPricePredictionForm;