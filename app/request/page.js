'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequestForm() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      name,
      department,
      message,
      status: 'pending',
    };

    const existing = JSON.parse(localStorage.getItem('employeeRequests')) || [];
    existing.push(newRequest);
    localStorage.setItem('employeeRequests', JSON.stringify(existing));

    router.push(`/view-requests?name=${name}&department=${department}`);
  };

  return (
    <div className="form-container">
      <h2>📝 Make a Request</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit">Submit Request</button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        input, textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }

        button {
          width: 100%;
          padding: 12px;
          background-color: #0070f3;
          border: none;
          color: white;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}
