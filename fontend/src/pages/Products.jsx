import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Products.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // TODO: Fetch products from API
    setProducts([
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 },
    ])
  }, [])

  const handleLogout = () => {
    navigate('/auth')
  }

  return (
    <div className="products-container">
      <header className="products-header">
        <h1>Products</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}
