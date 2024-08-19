"use client";
import { useEffect, useState } from 'react';

export default function ItemComponent() {
  const [itemData, setItemData] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      const itemIds = [1, 2, 3]; // Array of item IDs
      const allData: any = {}; // Object to accumulate data

      for (const id of itemIds) {
        try {
          const response = await fetch(`/api/getItem?itemId=${id}`);
          if (response.ok) {
            const data = await response.json();
            allData[id] = data; // Store data using item ID as key
          } else {
            console.error(`Failed to fetch data for itemId ${id}`);
          }
        } catch (error) {
          console.error(`Error fetching data for itemId ${id}:`, error);
        }
      }

      setItemData(allData); // Set the accumulated data
    }

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className='pt-20'>
      {Object.keys(itemData).length === 0 ? (
        <div>Loading...</div>
      ) : (
        Object.keys(itemData).map((key) => (
          <div key={key}>
            <h1>Item ID: {itemData[key].item_id}</h1>
            <pre>{JSON.stringify(itemData[key], null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  );
}
