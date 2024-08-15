// src/app/AddProject/page.tsx
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function AddProject() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: countries, error } = await supabase.from('countries').select('*'); // Change to lower case

  if (error) {
    return <div>Error fetching countries</div>;
  }

  return (
    <div className='pt-20 pl-20'>
      <p>Countries List</p>
      <ul className='flex flex-wrap gap-10'>
        {countries?.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
}
