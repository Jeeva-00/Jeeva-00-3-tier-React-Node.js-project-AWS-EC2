import React, { useState, useContext } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-page">
      <div className="container fade-in">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="form-field"
            name="name"
            placeholder="Enter Your Name"
            onChange={handleChange}
            required
          />
          <input
            className="form-field"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            required
          />
          <div style={{ position: 'relative' }}>
            <input
              className="form-field"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              required
              style={{ paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className='password-toggle'
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
          <button type="submit" className='login-btn'>Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className='register-link'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

