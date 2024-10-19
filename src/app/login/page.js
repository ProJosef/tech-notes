import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <LoginForm />
      </main>
      <footer>
        <Link href="/">Back to Home</Link>
      </footer>
    </section>
  );
}
