CREATE DATABASE IF NOT EXISTS assignment2;
USE assignment2;
-- =======================================================
-- BẢNG PRODUCT (Thông tin điện thoại)
-- =======================================================
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Khóa chính, mã định danh tự tăng cho mỗi điện thoại',
    name VARCHAR(100) NOT NULL COMMENT 'Tên điện thoại (ví dụ: iPhone 15 Pro Max, Samsung Galaxy S24)',
    company VARCHAR(50) NOT NULL COMMENT 'Hãng sản xuất điện thoại (ví dụ: Apple, Samsung, Xiaomi)',
    price DECIMAL(15,0) NOT NULL COMMENT 'Giá bán điện thoại',
    quantity INT NOT NULL DEFAULT 0 COMMENT 'Số lượng điện thoại hiện có trong kho',
    description TEXT COMMENT 'Mô tả chi tiết điện thoại: cấu hình, dung lượng, camera,...',
    img VARCHAR(255) COMMENT 'Đường dẫn hoặc URL ảnh minh họa của điện thoại',
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Trạng thái: 1 = đang bán, 0 = ngừng bán',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời điểm thêm điện thoại vào hệ thống',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Thời điểm cập nhật thông tin điện thoại gần nhất'
) COMMENT='Bảng lưu thông tin chi tiết các điện thoại trong cửa hàng';


-- =======================================================
-- BẢNG USER (Thông tin tài khoản người dùng)
-- =======================================================
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Khóa chính, mã định danh tự tăng cho mỗi người dùng',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên đăng nhập duy nhất của người dùng',
    password VARCHAR(255) NOT NULL COMMENT 'Mật khẩu người dùng (được mã hóa bằng bcrypt)',
    role VARCHAR(20) DEFAULT 'user' COMMENT 'Vai trò tài khoản: user | admin',
    status TINYINT(1) DEFAULT 1 COMMENT 'Trạng thái tài khoản: 1 = hoạt động, 0 = bị khóa',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời điểm tạo tài khoản'
) COMMENT='Bảng lưu thông tin người dùng trong hệ thống (đăng nhập, phân quyền)';
-- =======================================================
INSERT INTO product (name, company, price, quantity, description, img, status) VALUES
('iPhone 15 Pro Max 256GB', 'Apple', 32990000, 20, 
 'Màn hình Super Retina XDR OLED 6.7 inch, chip A17 Pro, RAM 8GB, camera 48MP, sạc nhanh 27W.', 
 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png', 1),

('Samsung Galaxy S24 Ultra 256GB', 'Samsung', 29990000, 25, 
 'Màn hình Dynamic AMOLED 2X 6.8 inch, Snapdragon 8 Gen 3, bút S-Pen, camera 200MP, pin 5000mAh.', 
 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222_3.png', 1),

('Xiaomi 14 Pro 256GB', 'Xiaomi', 21990000, 30, 
 'Màn hình AMOLED 6.73 inch 120Hz, Snapdragon 8 Gen 3, RAM 12GB, pin 4880mAh, sạc nhanh 120W.', 
 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14_2__2.png', 1),

('OPPO Find X7 Ultra 512GB', 'OPPO', 26990000, 15, 
 'Màn hình LTPO AMOLED 6.82 inch, Snapdragon 8 Gen 3, camera 50MP 1-inch, sạc nhanh 100W.', 
 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-find-x8_4__1_2.png', 1),

('Vivo X100 Pro 256GB', 'vivo', 24990000, 18, 
 'Màn hình AMOLED 6.78 inch 120Hz, Dimensity 9300, camera ZEISS 50MP, pin 5400mAh, sạc nhanh 100W.', 
 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-vivo-x100-pro_1_.png', 1),

('Google Pixel 8 Pro 256GB', 'Google', 25990000, 12, 
 'Màn hình LTPO OLED 6.7 inch, chip Google Tensor G3, camera AI 50MP, Android 14, sạc nhanh 30W.', 
 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-8-pro_7__2.png', 1),


('Asus ROG Phone 8 256GB', 'ASUS', 27990000, 10, 
 'Màn hình AMOLED 165Hz, Snapdragon 8 Gen 3, pin 5500mAh, hệ thống tản nhiệt nâng cao cho game thủ.', 
 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus-rog-phone-8.png', 1),

('Realme GT5 Pro 512GB', 'realme', 18990000, 22, 
 'Màn hình AMOLED 6.78 inch 144Hz, Snapdragon 8 Gen 3, RAM 16GB, camera 50MP, pin 5400mAh.', 
 'https://dienthoaihay.vn/images/products/2023/12/13/large/realme-gt5-pro-cam_1702456479.jpg', 1),

('Honor Magic6 Pro 512GB', 'Honor', 24990000, 14, 
 'Màn hình OLED 6.8 inch, Snapdragon 8 Gen 3, camera 180MP, pin 5600mAh, sạc nhanh 80W.', 
 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-honor-magic-6-pro_4_.png', 1);