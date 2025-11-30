import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import '../styles/LoginRegister.css'

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    console.log('Login success callback called');
    navigate('/products')
  }

  const handleRegisterSuccess = () => {
    setIsLogin(true)
  }

  const handleToggleMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        {isLogin ? (
          <LoginForm 
            onLoginSuccess={handleLoginSuccess}
            onToggleMode={handleToggleMode}
          />
        ) : (
          <RegisterForm 
            onRegisterSuccess={handleRegisterSuccess}
            onToggleMode={handleToggleMode}
          />
        )}
      </div>
    </div>
  )
}
