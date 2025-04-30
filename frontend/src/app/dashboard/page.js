'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats and users
  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:8080/api/dashboard/stats'),
          axios.get('http://localhost:8080/api/dashboard/users'),
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/dashboard/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert('Error deleting user.');
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:8080/api/dashboard/users/${id}/role?role=${newRole}`);
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      alert('Error updating user role.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📊 Dashboard</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Statistics</h2>
        <p><strong>Total Users:</strong> {stats.totalUsers}</p>
        <p><strong>Total Blogs:</strong> {stats.totalBlogs}</p>
        <p><strong>Total Comments:</strong> {stats.totalComments}</p>
      </div>

      <div>
        <h2>All Users</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Author">Author</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
