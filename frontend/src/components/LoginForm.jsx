// import { useState } from 'react';
// // import { authService } from '../services/authService'; // <--- IMPORT AUTH SERVICE
// import '../styles/AuthForm.css';

// // Không cần API_URL nữa vì ta dùng service
// const API_URL = 'http://localhost:8080/api'

// export default function LoginForm({ onLoginSuccess, onToggleMode }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(''); // Đổi tên state để chứa cả success/error
//   const [errors, setErrors] = useState({}); // State mới cho validation

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setErrors({});
//     setLoading(true);

//     // --- Bổ sung Validation cho TC-LINT-003 ---
//     const newErrors = {};
//     if (!username) newErrors.username = 'Tên đăng nhập không được để trống.';
//     if (!password) newErrors.password = 'Mật khẩu không được để trống.';
    

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setLoading(false);
//       return; // Dừng nếu có lỗi validation
//     }
//     // ------------------------------------------
//     try {
      
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       })
// const data = await response.json()
//       if (data.success) {

//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         setMessage(data.message);
//         // Chờ một chút để message hiển thị rồi chuyển trang (hoặc gọi ngay nếu không cần message)
//         setTimeout(onLoginSuccess, 100); 

//       } else {
//         setMessage(data.message); // Hiển thị thông báo thất bại
//       }
//     } catch (err) {
//       // Xử lý lỗi từ `throw new Error` trong service (ví dụ: API không trả về JSON, lỗi mạng)
//       setMessage(err.message); 
//     } finally {
//       setLoading(false);
//     }
//   };
// // SỬ DỤNG AUTH SERVICE ĐÃ ĐƯỢC MOCK
//       // const data = await authService.loginUser(username, password);
//   return (
//     <form onSubmit={handleSubmit} className="auth-form">
//       <h2>Login</h2>
//       {/* Sử dụng message state để hiển thị thông báo success/error */}
//       {message && <div className={`message-box ${message.includes('thành công') ? 'success' : 'error'}`} data-testid="login-message">{message}</div>}

//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         data-testid="username-input" // ĐÃ THÊM data-testid
//       />
//       {/* Hiển thị lỗi validation cho username */}
//       {errors.username && <div data-testid="username-error" style={{ color: 'red' }}>{errors.username}</div>}

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         data-testid="password-input" // ĐÃ THÊM data-testid
//       />
//       {/* Hiển thị lỗi validation cho password */}
//       {errors.password && <div data-testid="password-error" style={{ color: 'red' }}>{errors.password}</div>}

//       <button type="submit" disabled={loading} data-testid="login-button"> {/* ĐÃ THÊM data-testid */}
//         {loading ? 'Loading...' : 'Login'}
//       </button>

//       <p className="toggle-text">
//         Don't have an account?{' '}
//         <span onClick={onToggleMode} className="toggle-link">Register</span>
//       </p>
//     </form>
//   );
// }
import { useState } from 'react';
import '../styles/AuthForm.css';

const API_URL = 'http://localhost:8080/api'

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

    // Validation
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

      // Kiểm tra response status
      if (!response.ok) {
          let message;
          
          // Nếu có response.json thì dùng message từ JSON
          if (typeof response.json === 'function') {
            const data = await response.json().catch(() => ({}));
            message = data.message;
          }
        
          // nếu không thì fallback
          if (!message) message = `HTTP Error: ${response.status}`;
        
          throw new Error(message);
      }



      const data = await response.json();
       console.log('Response from server:', data);

      if (data.success) {
        // Lưu token và user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage(data.message);
        
        // Gọi callback ngay lập tức (không cần setTimeout)
        // Router sẽ tự xử lý navigation
        onLoginSuccess();

      } else {
        setMessage(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage(err.message || 'Lỗi kết nối. Vui lòng thử lại.');
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
