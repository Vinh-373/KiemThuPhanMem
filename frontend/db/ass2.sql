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
