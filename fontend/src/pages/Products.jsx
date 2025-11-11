import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import LoadingSpinner from '../components/LoadingSpinner'
import '../styles/Products.css'

const API_URL = 'http://localhost:5000/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`)
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/auth')
  }

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product)
    // TODO: Implement add to cart functionality
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="products-container">
      <Header 
        title="Products" 
        username={user?.username}
        onLogout={handleLogout}
      />
      <ProductGrid 
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}
