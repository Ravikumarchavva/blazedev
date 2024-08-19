import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Validate and parse request body
    const body = await request.json();

    // Send data to FastAPI backend
    const response = await fetch(`${process.env.FASTAPI_URL}/predict_churn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Error with FastAPI request:", response.status, response.statusText);
      throw new Error('Failed to get prediction');
    }

    // Handle response from FastAPI
    const data = await response.json();

    return NextResponse.json({ message: "Success", churn: data.prediction }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
