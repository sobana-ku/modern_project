'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Contact from '../../schemas/contactSchemas';

export default function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [replies, setReplies] = useState({});
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employeeRequests')) || [];
    setRequests(data);
  }, []);

  const updateRequests = (updatedList) => {
    localStorage.setItem('employeeRequests', JSON.stringify(updatedList));
    setRequests(updatedList);
  };

  const handleAccept = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: 'accepted' } : req
    );
    updateRequests(updated);
  };

  const handleReject = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: 'rejected' } : req
    );
    updateRequests(updated);
  };

  const handleDelete = (id) => {
    const updated = requests.filter((req) => req.id !== id);
    updateRequests(updated);
    alert("🗑️ Request deleted");
  };

  const handleReplyChange = (id, text) => {
    setReplies({ ...replies, [id]: text });
  };

  const handleSendReply = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, reply: replies[id] || '' } : req
    );
    updateRequests(updated);
    alert("✉️ Reply sent to employee.");
    setReplies({ ...replies, [id]: '' });
  };

  const handleLogout = () => {
    alert("Logged out");
    router.push('/');
  };

  return (
    <>
      <div className="admin-container">
        <nav className="admin-navbar">
          <h2 className="nav-title">Internal Contact Admin Panel</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>

        <h1 className="admin-title">🧑‍💼 Admin Dashboard</h1>

        {requests.length === 0 ? (
          <p className="no-requests">No requests available.</p>
        ) : (
          requests.map((req) => (
            <div className="request-card" key={req.id}>
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Department:</strong> {req.department}</p>
              <p><strong>Message:</strong> {req.message}</p>
              {req.reply && <p><strong>Reply:</strong> {req.reply}</p>}
              <p>
                <strong>Status:</strong>{' '}
                <span className={`status ${req.status}`}>{req.status}</span>
              </p>

              {req.status === 'pending' && (
                <div className="button-group">
                  <button className="accept" onClick={() => handleAccept(req.id)}>✅ Accept</button>
                  <button className="reject" onClick={() => handleReject(req.id)}>❌ Reject</button>
                </div>
              )}

              <div style={{ marginTop: '15px' }}>
                <textarea
                  placeholder="Write a reply to the employee..."
                  value={replies[req.id] || ''}
                  onChange={(e) => handleReplyChange(req.id, e.target.value)}
                  style={{ width: '100%', minHeight: '60px', marginBottom: '10px', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <button onClick={() => handleSendReply(req.id)} className="reply-button">📤 Send Reply</button>
              </div>

              <button className="delete-button" onClick={() => handleDelete(req.id)}>
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .admin-container {
          padding: 30px 20px;
          max-width: 900px;
          margin: 0 auto;
          font-family: 'Segoe UI', sans-serif;
        }

        .admin-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #1e45c4ff;
          padding: 15px 25px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(241, 244, 255, 0.05);
          margin-bottom: 30px;
        }

        .nav-title {
          font-size: 20px;
          font-weight: 600;
          color: white;
        }

        .logout-button {
          background-color: #d32f2f;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .logout-button:hover {
          background-color: #b71c1c;
        }

        .admin-title {
          text-align: center;
          font-size: 32px;
          color: #222;
          margin-bottom: 20px;
        }

        .no-requests {
          text-align: center;
          font-style: italic;
          color: #888;
        }

        .request-card {
          border: 1px solid #ddd;
          background-color: #fff;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
          box-shadow: 0 2px 8px rgba(242, 229, 229, 0.06);
        }

        .status {
          font-weight: bold;
          text-transform: capitalize;
        }

        .status.pending {
          color: #757575;
        }

        .status.accepted {
          color: #2e7d32;
        }

        .status.rejected {
          color: #c62828;
        }

        .button-group {
          margin-top: 15px;
        }

        .accept,
        .reject {
          margin-right: 10px;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .accept {
          background-color: #4caf50;
          color: white;
        }

        .accept:hover {
          background-color: #388e3c;
        }

        .reject {
          background-color: #f44336;
          color: white;
        }

        .reject:hover {
          background-color: #d32f2f;
        }

        .reply-button {
          background-color: #1976d2;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .reply-button:hover {
          background-color: #1565c0;
        }

        .delete-button {
          margin-top: 10px;
          background-color: #0b0303ff;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .delete-button:hover {
          background-color: #212121;
        }
      `}</style>
    </>
  );
}

