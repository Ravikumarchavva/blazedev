"use client";

import React, { useState, useTransition } from 'react'
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui//form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { carPricePredictionSchema } from '@/models/mlSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// TypeScript type inference
type CarPricePredictionFormValues = z.infer<typeof carPricePredictionSchema>;

const CarPriceForm = () => {
    const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const carform = useForm<CarPricePredictionFormValues>({
        resolver: zodResolver(carPricePredictionSchema),
        defaultValues: {
            carlength: 150,
            carwidth: 75,
            horsepower: 150,
            brandavg: 8000,
            averagempg: 20,
        },
    });

    const fetchWithRetry = async (url: string, options: RequestInit, retries: number = 3, delay: number = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return await response.json();
            } catch (error) {
                if (i < retries - 1) {
                    await new Promise(res => setTimeout(res, delay));
                } else {
                    throw error;
                }
            }
        }
    };

    const getCarPrice = async (data: CarPricePredictionFormValues) => {
        startTransition(async () => {
            try {
                const result = await fetchWithRetry('/api/carprice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                setPredictedPrice(result.price);
                setError(null); // Clear any previous errors
            } catch (error) {
                setError("Failed to fetch the price. Please try again.");
            }
        });
    };

    return (
        <Form {...carform}>
            <form
                onSubmit={carform.handleSubmit(getCarPrice)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto py-20"
            >
                {/* Form Fields */}
                <FormField
                    control={carform.control}
                    name="carlength"
                    render={({ field }) => (
                        <FormItem className="w-[90%] mx-auto">
                            <FormLabel className="text-white">car length</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="carlength"
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
                    control={carform.control}
                    name="carwidth"
                    render={({ field }) => (
                        <FormItem className="w-[90%] mx-auto">
                            <FormLabel className="text-white">carwidth</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="carwidth"
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
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={carform.control}
                    name="brandavg"
                    render={({ field }) => (
                        <FormItem className="w-[90%] mx-auto">
                            <FormLabel className="text-white">brandavg</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="brandavg"
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
                    control={carform.control}
                    name="averagempg"
                    render={({ field }) => (
                        <FormItem className="w-[90%] mx-auto">
                            <FormLabel className="text-white">averagempg</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="averagempg"
                                    {...field}
                                    disabled={isPending}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
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

            {/* Predicted Price Display */}
            {predictedPrice !== null && (
                <div className="mb-10 w-full">
                    <h2 className="text-2xl text-center text-white font-bold">
                        Predicted Price: ${predictedPrice}
                    </h2>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="text-red-500 text-center">
                    <p>{error}</p>
                </div>
            )}
        </Form>
    )
}

export default CarPriceForm