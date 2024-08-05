// src/app/AddProject/page.tsx
import ProtectedRoute from '@/components/ProtectedRoute/page';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function AddProject() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: countries, error } = await supabase.from('countries').select('*'); // Change to lower case

  if (error) {
    console.error('Error fetching countries:', error);
    return <div>Error fetching countries</div>;
  }

  return (
    <ProtectedRoute>

    <div className='pt-20'>
      <p>Countries List</p>
      <ul>
        {countries?.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    </div>
        </ProtectedRoute>
  );
}
