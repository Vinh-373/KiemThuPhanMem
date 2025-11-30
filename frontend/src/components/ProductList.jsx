import React, { useState, useEffect } from 'react';
// Đảm bảo đường dẫn này đúng, file test sẽ mock nó
import productService from '../services/productService'; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Thêm state để xử lý lỗi

    useEffect(() => {
        productService.getAll()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product list:", err);
                setError("Lỗi tải dữ liệu.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        // Khớp với text loading bạn định nghĩa
        return <div data-testid="loading-list">Đang tải...</div>; 
    }
    
    // Xử lý lỗi
    if (error) {
        return <div data-testid="error-list">{error}</div>;
    }

    // Xử lý danh sách rỗng
    if (products.length === 0) {
        return <div>Không có sản phẩm nào.</div>;
    }

    // --- Render danh sách sản phẩm ---
    return (
        <div data-testid="product-list-container">
            <h2>Danh sách Sản phẩm</h2>
            {products.map(product => (
                <div key={product.id} data-testid="product-item">
                    <span>{product.name}</span> - 
                    {/* Sử dụng toLocaleString() để định dạng tiền tệ */}
                    <span>{product.price.toLocaleString()} VND</span>
                </div>
            ))}
        </div>
    );
};
export default ProductList;