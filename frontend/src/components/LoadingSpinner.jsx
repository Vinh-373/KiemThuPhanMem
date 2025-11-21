import '../styles/LoadingSpinner.css'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return <div className="loading">{message}</div>
}
