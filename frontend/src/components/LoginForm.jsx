import { useState } from 'react';
import '../styles/AuthForm.css';

export const API_URL = 'http://localhost:5000/api'

export default function LoginForm({ onLoginSuccess, onToggleMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});
    setLoading(true);

    const newErrors = {};
    if (!username) newErrors.username = 'Tên đăng nhập không được để trống.';
    if (!password) newErrors.password = 'Mật khẩu không được để trống.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      let data = { success: false, message: 'Đăng nhập thất bại' };

      try {
        data = await response.json();
      } catch {}

      if (!response.ok) {
        throw new Error(data.message || `HTTP Error ${response.status}`);
      }

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setMessage(data.message || 'Đăng nhập thành công');
        onLoginSuccess();
      } else {
        setMessage(data.message || 'Đăng nhập thất bại');
      }

    } catch (err) {
      setMessage(err.message || 'Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>

      {message && (
        <div 
          className={`message-box ${message.includes('thành công') ? 'success' : 'error'}`} 
          data-testid="login-message"
        >
          {message}
        </div>
      )}

      <div className="form-group">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="username-input"
        />
        {errors.username && (
          <div data-testid="username-error" style={{ color: 'red', fontSize: '12px' }}>
            {errors.username}
          </div>
        )}
      </div>

      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
        />
        {errors.password && (
          <div data-testid="password-error" style={{ color: 'red', fontSize: '12px' }}>
            {errors.password}
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} data-testid="login-button">
        {loading ? 'Loading...' : 'Login'}
      </button>

      <p className="toggle-text">
        Don't have an account?{' '}
        <span onClick={onToggleMode} className="toggle-link">
          Register
        </span>
      </p>
    </form>
  );
}
