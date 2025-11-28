package com.flogin.service;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.dto.UserDto;
import org.springframework.stereotype.Service;

/**
 * Triển khai cụ thể cho AuthService Interface, xử lý logic nghiệp vụ đăng nhập.
 *
 * Lưu ý: Các class DTO (LoginRequest, LoginResponse, UserDto) được import
 * từ package com.flogin.dto nên không cần định nghĩa lại tại đây.
 */
@Service // Đánh dấu là Bean của Spring
public class AuthServiceImpl implements AuthService {

    // Tài khoản giả lập theo logic cũ của bạn
    private static final String SUCCESS_USERNAME = "Minh";
    private static final String SUCCESS_PASSWORD = "123";

    /**
     * Xử lý logic xác thực người dùng.
     * @param request Dữ liệu đăng nhập.
     * @return LoginResponse chứa kết quả xác thực.
     */
    @Override
    public LoginResponse authenticate(LoginRequest request) {
        // LoginResponse hiện tại có 4 tham số: success, message, token, user

        // 1. Kiểm tra Request null (Kiểm tra dữ liệu đầu vào)
        if (request == null) {
            return new LoginResponse(false, "Yêu cầu đăng nhập không được rỗng.", null, null);
        }

        // 2. Kiểm tra Username/Password rỗng
        // Vì LoginRequest là record, ta truy cập bằng request.username() và request.password()
        if (request.getUsername() == null || request.getUsername().isEmpty() || 
            request.getPassword() == null || request.getPassword().isEmpty()) {
            return new LoginResponse(false, "Tên đăng nhập và mật khẩu không được để trống.", null, null);
        }

        // 3. Xử lý logic đăng nhập
        if (request.getUsername().equals(SUCCESS_USERNAME) && request.getPassword().equals(SUCCESS_PASSWORD)) {
            // Đăng nhập thành công (success=true)
            UserDto userDto = new UserDto(SUCCESS_USERNAME, SUCCESS_USERNAME.toLowerCase() + "@example.com");
            return new LoginResponse(true, "Đăng nhập thành công", "token123", userDto);
            
        } else {
            // Đăng nhập thất bại (success=false)
            // Trong môi trường thực tế nên dùng một thông báo chung để bảo mật.
            return new LoginResponse(false, "Tên đăng nhập hoặc mật khẩu không đúng", null, null);
        }
    }
}