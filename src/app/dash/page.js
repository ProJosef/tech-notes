import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Welcome() {
  const token = await getToken({ req: { cookies: cookies() } });

  const show = token.role === 'Admin' || token.role === 'Manager'

  const date = new Date();
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(
    date
  );

  return (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome!</h1>

      <p>
        <Link href="/dash/notes">View techNotes</Link>
      </p>

      <p>
        <Link href="/dash/notes/new">Add New techNote</Link>
      </p>

      {show && (
        <p>
          <Link href="/dash/users">View User Settings</Link>
        </p>
      )}

      {show && (
        <p>
          <Link href="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );
}
