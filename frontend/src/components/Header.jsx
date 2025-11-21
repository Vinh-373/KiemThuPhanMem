import '../styles/Header.css'

export default function Header({ title, username, onLogout }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-right">
        {username && <span className="user-info">{username}</span>}
        {onLogout && <button onClick={onLogout} className="logout-btn">Logout</button>}
      </div>
    </header>
  )
}
