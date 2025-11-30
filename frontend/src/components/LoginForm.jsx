import { useState } from 'react';
import '../styles/AuthForm.css';
import { authService } from '../services/authService';

export const API_URL = 'http://localhost:5000/api';

export default function LoginForm({ onLoginSuccess, onToggleMode }) {
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

      // ⛔ Bỏ fetch
      // const response = await fetch....

      // ✔ Dùng authService
      const data = await authService.loginUser(username, password);

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage(data.message);
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
...
}
