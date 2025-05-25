import { carPricePredictionSchema } from "@/models/mlSchemas";
import type { NextRequest } from "next/server";
import { z } from "zod";

// TypeScript type inference
type CarPricePredictionFormValues = z.infer<typeof carPricePredictionSchema>;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CarPricePredictionFormValues;
  // Validate the request body using the carPricePredictionSchema
  const validationResult = carPricePredictionSchema.safeParse(body);

  if (!validationResult.success) {
    // Handle validation errors gracefully, providing informative error messages
    return new Response(JSON.stringify({ message: "Invalid input data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Send the validated data to FastAPI
  const response = await fetch(`${process.env.FASTAPI_URL}/send_carprice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    // Handle potential errors from FastAPI
    return new Response(
      JSON.stringify({ message: "Error processing request" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const data = await response.json();
  return new Response(
    JSON.stringify({ message: "Success", price: data.price }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
