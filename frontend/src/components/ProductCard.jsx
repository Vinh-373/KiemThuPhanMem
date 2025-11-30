// import '../styles/ProductCard.css'

// export default function ProductCard({ product, onAddToCart }) {
//   return (
//     <div className="product-card">
//       {product.img && <img src={product.img} alt={product.name} className="product-img" />}
//       <h3>{product.name}</h3>
//       <p className="company">{product.company}</p>
//       <p className="description">{product.description}</p>
//       <p className="quantity">Stock: {product.quantity}</p>
//       <p className="price">{product.price} VNĐ</p>
//       <button onClick={() => onAddToCart(product)}>Add to Cart</button>
//     </div>
//   )
// }
import '../styles/ProductCard.css'

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      {product.img && <img src={product.img} alt={product.name} className="product-img" />}
      <h3>{product.name}</h3>
      <p className="company">{product.company}</p>
      <p className="description">{product.description}</p>
      <p className="quantity">Stock: {product.quantity}</p>
      <p className="price">{product.price} VNĐ</p>
      
      <div className="product-actions">
        {/* <button 
          className="btn-add-cart"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button> */}
        
        {onEdit && (
          <button 
            className="btn-edit"
            onClick={() => onEdit(product.id)}
          >
            Edit
          </button>
        )}
        
        {onDelete && (
          <button 
            className="btn-delete"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
