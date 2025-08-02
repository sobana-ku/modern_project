'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      if (data.role === 'admin') {
        router.push('/dashboard');
      } else if (data.role === 'employee') {
        router.push('/employee');
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <style jsx>{`
        body {
          background-color: #f2f2f2;
        }

        .login-container {
          max-width: 400px;
          margin: 80px auto;
          padding: 40px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h2 {
          margin-bottom: 24px;
          font-size: 28px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 12px 15px;
          margin: 12px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #0070f3;
        }

        button {
          width: 100%;
          background-color: #0070f3;
          color: white;
          padding: 12px;
          margin-top: 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </>
  );
}
