import React, { useState, useEffect } from 'react';
// Đảm bảo đường dẫn này đúng, file test sẽ mock nó
import productService from '../services/productService'; 

// Giả định component này được dùng cho cả tạo mới (productId = null)
// và chỉnh sửa (có productId)
const ProductForm = ({ productId = null }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false); // Thêm state loading để disabled nút

    // Load dữ liệu khi ở chế độ chỉnh sửa
    useEffect(() => {
        if (productId) {
            setIsEditMode(true);
            setLoading(true);
            
            productService.getById(productId)
                .then(product => {
                    setName(product.name);
                    setPrice(product.price.toString());
                    setQuantity(product.quantity.toString());
                })
                .catch(error => {
                    console.error('Lỗi tải dữ liệu sản phẩm:', error);
                    setMessage('Không thể tải dữ liệu sản phẩm.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        // Xóa message khi productId thay đổi (chuyển đổi form)
        setMessage(''); 
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        
        // Kiểm tra dữ liệu hợp lệ cơ bản
        if (!name || !price || !quantity) {
             setMessage('Vui lòng điền đầy đủ các trường.');
             setLoading(false);
             return;
        }

        const productData = {
            name,
            // Đảm bảo giá và số lượng là số nguyên
            price: parseInt(price, 10),
            quantity: parseInt(quantity, 10),
        };

        try {
            if (isEditMode) {
                // Thao tác chỉnh sửa
                await productService.update(productId, productData);
                setMessage('Cập nhật sản phẩm thành công');
            } else {
                // Thao tác tạo mới
                await productService.create(productData);
                
                // Reset form sau khi tạo thành công
                setName('');
                setPrice('');
                setQuantity('');
                setMessage('Them san pham thanh cong'); // Giữ nguyên chuỗi khớp với test case cũ
            }
        } catch (error) {
            console.error('Lỗi API:', error);
            setMessage('Lỗi: Không thể lưu sản phẩm.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} data-testid="product-form">
            <h2>{isEditMode ? 'Chỉnh sửa Sản phẩm' : 'Tạo Sản phẩm Mới'}</h2>

            {/* Loading cho chế độ chỉnh sửa */}
            {loading && isEditMode && <p>Đang tải dữ liệu...</p>}

            <div>
                <label htmlFor="name">Tên sản phẩm</label>
                <input 
                    id="name"
                    aria-label="Ten san pham"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="price">Giá</label>
                <input 
                    id="price"
                    aria-label="Gia"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="quantity">Số lượng</label>
                <input 
                    id="quantity"
                    aria-label="So luong"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Đang Xử Lý...' : 'Luu'}
            </button>

            {/* Hiển thị thông báo */}
            {message && <p role="alert">{message}</p>}
        </form>
    );
};

export default ProductForm;