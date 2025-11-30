// import React, { useState, useEffect } from 'react';
// // Đảm bảo đường dẫn này đúng, file test sẽ mock nó
// import productService from '../services/productService'; 

// // Giả định component này được dùng cho cả tạo mới (productId = null)
// // và chỉnh sửa (có productId)
// const ProductForm = ({ productId = null }) => {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [message, setMessage] = useState('');
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [loading, setLoading] = useState(false); // Thêm state loading để disabled nút

//     // Load dữ liệu khi ở chế độ chỉnh sửa
//     useEffect(() => {
//         if (productId) {
//             setIsEditMode(true);
//             setLoading(true);
            
//             productService.getById(productId)
//                 .then(product => {
//                     setName(product.name);
//                     setPrice(product.price.toString());
//                     setQuantity(product.quantity.toString());
//                 })
//                 .catch(error => {
//                     console.error('Lỗi tải dữ liệu sản phẩm:', error);
//                     setMessage('Không thể tải dữ liệu sản phẩm.');
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         }
//         // Xóa message khi productId thay đổi (chuyển đổi form)
//         setMessage(''); 
//     }, [productId]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         setLoading(true);
        
//         // Kiểm tra dữ liệu hợp lệ cơ bản
//         if (!name || !price || !quantity) {
//              setMessage('Vui lòng điền đầy đủ các trường.');
//              setLoading(false);
//              return;
//         }

//         const productData = {
//             name,
//             // Đảm bảo giá và số lượng là số nguyên
//             price: parseInt(price, 10),
//             quantity: parseInt(quantity, 10),
//         };

//         try {
//             if (isEditMode) {
//                 // Thao tác chỉnh sửa
//                 await productService.update(productId, productData);
//                 setMessage('Cập nhật sản phẩm thành công');
//             } else {
//                 // Thao tác tạo mới
//                 await productService.create(productData);
                
//                 // Reset form sau khi tạo thành công
//                 setName('');
//                 setPrice('');
//                 setQuantity('');
//                 setMessage('Them san pham thanh cong'); // Giữ nguyên chuỗi khớp với test case cũ
//             }
//         } catch (error) {
//             console.error('Lỗi API:', error);
//             setMessage('Lỗi: Không thể lưu sản phẩm.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} data-testid="product-form">
//             <h2>{isEditMode ? 'Chỉnh sửa Sản phẩm' : 'Tạo Sản phẩm Mới'}</h2>

//             {/* Loading cho chế độ chỉnh sửa */}
//             {loading && isEditMode && <p>Đang tải dữ liệu...</p>}

//             <div>
//                 <label htmlFor="name">Tên sản phẩm</label>
//                 <input 
//                     id="name"
//                     aria-label="Ten san pham"
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     disabled={loading}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="price">Giá</label>
//                 <input 
//                     id="price"
//                     aria-label="Gia"
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     required
//                     disabled={loading}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="quantity">Số lượng</label>
//                 <input 
//                     id="quantity"
//                     aria-label="So luong"
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                     required
//                     disabled={loading}
//                 />
//             </div>

//             <button type="submit" disabled={loading}>
//                 {loading ? 'Đang Xử Lý...' : 'Luu'}
//             </button>

//             {/* Hiển thị thông báo */}
//             {message && <p role="alert">{message}</p>}
//         </form>
//     );
// };

// export default ProductForm;
import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import '../styles/ProductForm.css'

const ProductForm = ({ productId = null, onClose, onSaveSuccess }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [message, setMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productId) {
            setIsEditMode(true);
            setLoading(true);
            
            productService.getById(productId)
                .then(product => {
                    setName(product.name);
                    setCompany(product.company || '');
                    setPrice(product.price.toString());
                    setQuantity(product.quantity.toString());
                    setDescription(product.description || '');
                    setImg(product.img || '');
                })
                .catch(error => {
                    console.error('Lỗi tải dữ liệu sản phẩm:', error);
                    setMessage('Không thể tải dữ liệu sản phẩm.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        setMessage('');
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        
        if (!name || !price || !quantity) {
             setMessage('Vui lòng điền đầy đủ các trường: Tên, Giá, Số lượng.');
             setLoading(false);
             return;
        }

        const productData = {
            name,
            company,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            description,
            img,
        };

        try {
            if (isEditMode) {
                await productService.update(productId, productData);
                setMessage('Cập nhật sản phẩm thành công');
                setTimeout(() => {
                    onSaveSuccess && onSaveSuccess();
                }, 1000);
            } else {
                await productService.create(productData);
                
                setName('');
                setCompany('');
                setPrice('');
                setQuantity('');
                setDescription('');
                setImg('');
                setMessage('Thêm sản phẩm thành công');
                setTimeout(() => {
                    onSaveSuccess && onSaveSuccess();
                }, 1000);
            }
        } catch (error) {
            console.error('Lỗi API:', error);
            setMessage('Lỗi: Không thể lưu sản phẩm.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} data-testid="product-form" className="product-form">
            <h2>{isEditMode ? 'Chỉnh sửa Sản phẩm' : 'Tạo Sản phẩm Mới'}</h2>

            {loading && isEditMode && <p className="loading-text">Đang tải dữ liệu...</p>}

            {/* Tên sản phẩm */}
            <div className="form-group">
                <label htmlFor="name">Tên sản phẩm *</label>
                <input 
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên sản phẩm"
                    required
                    disabled={loading}
                />
            </div>

            {/* Hãng sản xuất */}
            <div className="form-group">
                <label htmlFor="company">Hãng sản xuất</label>
                <input 
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nhập tên hãng (VD: Apple, Samsung)"
                    disabled={loading}
                />
            </div>

            {/* Giá */}
            <div className="form-group">
                <label htmlFor="price">Giá (VNĐ) *</label>
                <input 
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Nhập giá"
                    required
                    disabled={loading}
                />
            </div>

            {/* Số lượng */}
            <div className="form-group">
                <label htmlFor="quantity">Số lượng *</label>
                <input 
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Nhập số lượng"
                    required
                    disabled={loading}
                />
            </div>

            {/* Mô tả */}
            <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <textarea 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập mô tả chi tiết sản phẩm"
                    rows="4"
                    disabled={loading}
                />
            </div>

            {/* URL ảnh */}
            <div className="form-group">
                <label htmlFor="img">URL Ảnh</label>
                <input 
                    id="img"
                    type="url"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    disabled={loading}
                />
            </div>

            {/* Nút hành động */}
            <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-submit">
                    {loading ? 'Đang Xử Lý...' : isEditMode ? 'Cập nhật' : 'Thêm Sản phẩm'}
                </button>
                {onClose && (
                    <button 
                        type="button" 
                        onClick={onClose} 
                        disabled={loading}
                        className="btn-cancel"
                    >
                        Hủy
                    </button>
                )}
            </div>

            {/* Thông báo */}
            {message && <p className={`message ${message.includes('thành công') ? 'success' : 'error'}`} role="alert">{message}</p>}
        </form>
    );
};

export default ProductForm;