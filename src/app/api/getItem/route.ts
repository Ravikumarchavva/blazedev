import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const itemId = url.searchParams.get('itemId');

  if (!itemId) {
    return new Response(JSON.stringify({ error: 'Item ID is required' }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(`${process.env.FASTaPI_URL}/items/${itemId}`);
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
