import React, { useState, useEffect } from 'react';
// Đảm bảo đường dẫn này đúng, file test sẽ mock nó
import productService from '../services/productService'; 

// Giả định component nhận product ID qua props (hoặc router)
const ProductDetail = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) {
            setProduct(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        
        productService.getById(productId)
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product detail:", err);
                setError("Lỗi tải chi tiết sản phẩm.");
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        // Khớp với text trong test case của bạn
        return <div data-testid="loading-detail">Đang tải chi tiết...</div>; 
    }
    
    // Xử lý lỗi (API thất bại)
    if (error) {
        return <div data-testid="error-detail">{error}</div>;
    }

    // Xử lý không tìm thấy sản phẩm (API trả về null hoặc undefined)
    if (!product) {
        return <div>Không tìm thấy sản phẩm.</div>;
    }

    // --- Render chi tiết sản phẩm ---
    const { name, price } = product;
    
    return (
        <div data-testid="product-detail">
            <h2>Chi tiết Sản phẩm: **{name}**</h2>
            <p>Tên: <span data-testid="product-name">{name}</span></p>
            {/* Sử dụng toLocaleString() để định dạng tiền tệ như trong test case*/}
            <p>Giá: <span data-testid="product-price">{price.toLocaleString()} VNĐ</span></p> 
        </div>
    );
};

export default ProductDetail;