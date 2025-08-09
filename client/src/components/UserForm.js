import React from 'react';
import { TextField, Button, Box } from '@mui/material';

function UserForm({ user, onSubmit, onCancel }) {
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });

  React.useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' });
    } else {
      setForm({ name: '', email: '', password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name: form.name, email: form.email };
    if (!user) payload.password = form.password;
    onSubmit(payload);
    if (!user) setForm({ name: '', email: '', password: '' });
  };

  return (
    <div className="container" style={{ margin: 0, marginBottom: 24, padding: 24 }}>
      <Box component="form" className="user-form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', background: 'none', boxShadow: 'none', p: 0 }}>
        <input
          className="form-field"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-field"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {!user && (
          <input
            className="form-field"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        )}
        <Box className="button-group" sx={{ width: '100%' }}>
          <button type="submit" className="login-btn" style={{ marginTop: 8 }}>
            {user ? 'Update' : 'Add Viewer User'}
          </button>
          {user && (
            <button type="button" onClick={onCancel} className="login-btn" style={{ marginLeft: 12, marginTop: 8, background: '#d1d9e6', color: '#4b6cb7' }}>
              Cancel
            </button>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default UserForm;

