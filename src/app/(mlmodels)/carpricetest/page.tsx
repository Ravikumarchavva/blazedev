"use client";
import React from 'react';
import { useEffect, useState } from 'react';

export default function CarPriceTest() {
  const [itemData, setItemData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/carprice');
        if (response.ok) {
          const data = await response.json();  // Await the JSON conversion
          setItemData(data);
        } else {
          setError("Failed to fetch data from the API.");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-20">
      {itemData ? <pre>{JSON.stringify(itemData, null, 2)}</pre> : "Loading..."}
    </div>
  );
}
