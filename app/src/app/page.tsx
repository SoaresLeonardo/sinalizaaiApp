'use client';

import { useAuth } from '@/hooks/auth';

export default async function Home() {
  const { user } = useAuth();
  return (
    <>
      <h1>Home</h1>
      <p>usuário {user?.email}</p>
    </>
  );
}
