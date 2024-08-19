import type { NextRequest } from 'next/server';
import { z } from 'zod';

// Zod schema for simplified model
const carPricePredictionSchema = z.object({
  enginesize: z.string(),
  horsepower: z.string(),
  curbweight: z.string(),
  citympg: z.string(),
  highwaympg: z.string(),
});

// TypeScript type inference
type CarPricePredictionFormValues = z.infer<typeof carPricePredictionSchema>;

export async function POST(request: NextRequest) {
    const body = await request.json() as CarPricePredictionFormValues;
    const validationResult = carPricePredictionSchema.safeParse(body);

    if (!validationResult.success) {
        return new Response(JSON.stringify({ message: "Invalid body" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const response = await fetch(`${process.env.FASTAPI_URL}/send_carprice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return new Response(JSON.stringify({ message: "Success", price: data.price }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
