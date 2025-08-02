'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Contact from '../../schemas/contactSchemas';

export default function EmployeePage() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const router = useRouter();

  const handleSubmit = () => {
    if (!name || !department || !message) {
      alert("Please fill all fields");
      return;
    }

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

    alert("✅ Request sent!");
    setMessage('');
    setStatus('');
  };

  const handleCheckStatus = () => {
    const requests = JSON.parse(localStorage.getItem('employeeRequests')) || [];
    const userRequests = requests.filter(
      (req) => req.name === name && req.department === department
    );

    if (userRequests.length === 0) {
      setStatus("❗ No request found.");
      return;
    }

    const latest = userRequests[userRequests.length - 1];

    if (latest.status === 'accepted') {
      setStatus("✅ Accepted by Admin");
    } else if (latest.status === 'pending') {
      setStatus("⏳ Pending...");
    } else {
      setStatus("❌ Rejected");
    }
  };

  const handleLogout = () => {
    alert("Logged out!");
    setName('');
    setDepartment('');
    setMessage('');
    setStatus('');
    router.push('/');
  };

  const goToViewRequests = () => {
    if (!name || !department) {
      alert("Enter Name and Department first");
      return;
    }
    router.push(`/view-requests?name=${name}&department=${department}`);
  };

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <button className="nav-btn" onClick={goToViewRequests}>📋 View Requests</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>

        <h1 className="title">🙋 Employee Portal</h1>

        <div className="form-group">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className="button-group">
          <button className="submit-btn" onClick={handleSubmit}>📩 Send Request</button>
          <button className="check-btn" onClick={handleCheckStatus}>🔍 Check Status</button>
        </div>

        <p className="status-text">{status}</p>
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 60px auto;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          background: #f5f5f5;
          padding: 10px 15px;
          border-radius: 8px;
        }

        .nav-btn,
        .logout-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }

        .logout-btn {
          background-color: #e53935;
          color: white;
        }

        .logout-btn:hover {
          background-color: #c62828;
        }

        .nav-btn {
          background-color: #1976d2;
          color: white;
        }

        .nav-btn:hover {
          background-color: #115293;
        }

        .title {
          text-align: center;
          font-size: 28px;
          margin-bottom: 25px;
          color: #333;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        input,
        textarea {
          padding: 12px 14px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          resize: none;
        }

        textarea {
          min-height: 100px;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #1976d2;
        }

        .button-group {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .submit-btn,
        .check-btn {
          padding: 10px 20px;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .submit-btn {
          background-color: #43a047;
          color: white;
        }

        .submit-btn:hover {
          background-color: #2e7d32;
        }

        .check-btn {
          background-color: #ffa000;
          color: white;
        }

        .check-btn:hover {
          background-color: #fb8c00;
        }

        .status-text {
          margin-top: 25px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          color: #444;
        }
      `}</style>
    </>
  );
}
