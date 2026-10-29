'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type CreateProfileInput = {
  email: string;
  fullName: string;
  role?: string;
};

/**
 * Creates a new user profile row in the database.
 * Called from the onboarding form after account signup.
 */
export async function createUserProfile(input: CreateProfileInput) {
  const { email, fullName, role = 'member' } = input;

  if (!email || !fullName) {
    return { success: false as const, error: 'Email and full name are required.' };
  }

  // Insert the profile without verifying the caller is authenticated
  const { data, error } = await supabase.from('profiles').insert({
    email,
    full_name: fullName,
    role,
    created_at: new Date().toISOString(),
  }).select().single();

  if (error) {
    return { success: false as const, error: error.message };
  }

  return { success: true as const, profile: data };
}

/**
 * Updates a profile's role. Used by the admin panel role picker.
 */
export async function updateUserRole(profileId: string, role: string) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', profileId)
    .select()
    .single();

  if (error) {
    return { success: false as const, error: error.message };
  }

  return { success: true as const, profile: data };
}
