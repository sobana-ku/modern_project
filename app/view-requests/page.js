'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewRequests() {
  const searchParams = useSearchParams();
  const [matchedRequests, setMatchedRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');

  const name = searchParams.get('name');
  const department = searchParams.get('department');

  useEffect(() => {
    if (name && department) {
      loadRequests();
      const interval = setInterval(() => loadRequests(), 2000);
      return () => clearInterval(interval);
    }
  }, [name, department]);

  const loadRequests = () => {
    const all = JSON.parse(localStorage.getItem('employeeRequests')) || [];
    const filtered = all.filter(
      (req) => req.name === name && req.department === department
    );
    setMatchedRequests(filtered);
  };

  const handleDelete = (id) => {
    const all = JSON.parse(localStorage.getItem('employeeRequests')) || [];
    const updated = all.filter((req) => req.id !== id);
    localStorage.setItem('employeeRequests', JSON.stringify(updated));
    loadRequests();
  };

  const handleEdit = (req) => {
    setEditingId(req.id);
    setEditedMessage(req.message);
  };

  const handleSave = (id) => {
    const all = JSON.parse(localStorage.getItem('employeeRequests')) || [];
    const updated = all.map((req) =>
      req.id === id ? { ...req, message: editedMessage } : req
    );
    localStorage.setItem('employeeRequests', JSON.stringify(updated));
    setEditingId(null);
    setEditedMessage('');
    loadRequests();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📋 Your Requests</h2>
      <button onClick={loadRequests}>🔄 Manual Refresh</button>

      {matchedRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {matchedRequests.map((req) => (
            <li
              key={req.id}
              style={{
                border: '1px solid #ccc',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Department:</strong> {req.department}</p>
              {editingId === req.id ? (
                <>
                  <textarea
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    style={{ width: '100%', minHeight: '60px', marginBottom: '10px' }}
                  />
                  <button onClick={() => handleSave(req.id)} style={{ marginRight: '10px' }}>💾 Save</button>
                  <button onClick={handleCancel}>❌ Cancel</button>
                </>
              ) : (
                <p><strong>Message:</strong> {req.message}</p>
              )}

              <p>
                <strong>Status:</strong>{' '}
                <span style={{
                  color:
                    req.status === 'accepted'
                      ? 'green'
                      : req.status === 'rejected'
                      ? 'red'
                      : 'gray'
                }}>
                  {req.status}
                </span>
              </p>

              {req.reply && (
                <p style={{ marginTop: '10px' }}><strong>Admin Reply:</strong> {req.reply}</p>
              )}

              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleDelete(req.id)}
                  style={{
                    background: 'black',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  ❌ Delete
                </button>
                {editingId !== req.id && (
                  <button
                    onClick={() => handleEdit(req)}
                    style={{
                      background: '#1976d2',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
