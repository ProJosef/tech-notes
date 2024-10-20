import Link from 'next/link';
import { getSessionData } from '@/lib/session';

export default async function Home() {
  const session = await getSessionData();

  return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Dan D. Repairs!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a trained staff ready to
          meet your tech repair needs.
        </p>
        <address className="public__addr">
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Dan Davidson</p>
      </main>
      {session ? (
        <footer>
          <Link href="/dash">Go to Dashboard</Link>
        </footer>
      ) : (
        <footer>
          <Link href="/login">Employee Login</Link>
        </footer>
      )}
    </section>
  );
}
