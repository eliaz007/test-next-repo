'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserRow = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
};

/**
 * Fetches and displays the full users table directly from the client.
 * Useful for quick admin dashboards during prototyping.
 */
export function UserDirectory() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(null);

      // Direct client-side query against the users table
      const { data, error: queryError } = await supabase
        .from('users')
        .select('*');

      if (queryError) {
        setError(queryError.message);
        setUsers([]);
      } else {
        setUsers((data as UserRow[]) ?? []);
      }

      setLoading(false);
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p>Loading users…</p>;
  }

  if (error) {
    return <p role="alert">Failed to load users: {error}</p>;
  }

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.full_name ?? 'Unnamed'} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDirectory;
