import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  try {
    const response = await fetch(`${process.env.FASTAPI_URL}/carprice`);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data from FastAPI' }), {
        status: 500,
      });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
    });
  }
}
