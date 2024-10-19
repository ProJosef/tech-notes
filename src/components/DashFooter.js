import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import GoHomeButton from './GoHomeButton';

export default async function DashFooter() {
  const token = await getToken({ req: { cookies: cookies() } });

  return (
    <footer className="dash-footer">
      <GoHomeButton />
      <p>Current User: {token.username}</p>
      <p>Status: {token.role}</p>
    </footer>
  );
}
