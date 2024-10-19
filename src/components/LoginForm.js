'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result.error) {
        setError(result.error); // Handle login error
      }
      router.push('/dash');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input className="form__input" type="text" name="username" autoComplete="off" required />

      <label htmlFor="password">Password:</label>
      <input className="form__input" type="password" name="password" required />

      {error && <p className="errmsg">{error}</p>}

      <button className="form__submit-button" type="submit">
        Sign In
      </button>
    </form>
  );
}
