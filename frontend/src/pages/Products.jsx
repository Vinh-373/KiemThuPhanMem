// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Header from '../components/Header'
// import ProductGrid from '../components/ProductGrid'
// import LoadingSpinner from '../components/LoadingSpinner'
// import '../styles/Products.css'

// const API_URL = 'http://localhost:8080/api'

// export default function Products() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const userData = localStorage.getItem('user')
//     if (userData) {
//       setUser(JSON.parse(userData))
//     }
//     fetchProducts()
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`${API_URL}/products`)
//       const data = await response.json()
//       setProducts(data)
//       setLoading(false)
//     } catch (error) {
//       console.error('Error fetching products:', error)
//       setLoading(false)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     navigate('/auth')
//   }

//   const handleAddToCart = (product) => {
//     console.log('Added to cart:', product)
//     // TODO: Implement add to cart functionality
//   }

//   if (loading) {
//     return <LoadingSpinner />
//   }

//   return (
//     <div className="products-container">
//       <Header 
//         title="Products" 
//         username={user?.username}
//         onLogout={handleLogout}
//       />
//       <ProductGrid 
//         products={products}
//         onAddToCart={handleAddToCart}
//       />
//     </div>
//   )
// }
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import ProductForm from '../components/ProductForm'
import LoadingSpinner from '../components/LoadingSpinner'
import '../styles/Products.css'

const API_URL = 'http://localhost:50005000/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProductId, setEditingProductId] = useState(null)
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

  const handleOpenForm = () => {
    setEditingProductId(null)
    setShowForm(true)
  }

  const handleEditProduct = (productId) => {
    setEditingProductId(productId)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProductId(null)
    fetchProducts()
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          setProducts(products.filter(p => p.id !== productId))
          alert('Xóa sản phẩm thành công')
        } else {
          alert('Lỗi khi xóa sản phẩm')
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Lỗi: Không thể xóa sản phẩm')
      }
    }
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

      {/* Nút thêm sản phẩm - luôn hiển thị */}
      <div className="form-toggle-section">
        <button 
          className="btn-add-product"
          onClick={handleOpenForm}
          disabled={showForm}
        >
          + Thêm Sản Phẩm Mới
        </button>
      </div>

      {/* Danh sách sản phẩm - luôn hiển thị ở phía sau */}
      <ProductGrid 
        products={products}
        onAddToCart={handleAddToCart}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Form modal - nằm phía trên */}
      {showForm && (
        <div className="product-form-container">
          <div className="product-form-backdrop" onClick={handleCloseForm}></div>
          <div className="product-form-modal">
            <button 
              className="btn-close-form"
              onClick={handleCloseForm}
            >
              ✕
            </button>
            <ProductForm 
              productId={editingProductId}
              onClose={handleCloseForm}
              onSaveSuccess={() => {
                handleCloseForm()
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
