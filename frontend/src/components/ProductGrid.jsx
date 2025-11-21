import ProductCard from './ProductCard'
import '../styles/ProductGrid.css'

export default function ProductGrid({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return <div className="no-products">No products available</div>
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
