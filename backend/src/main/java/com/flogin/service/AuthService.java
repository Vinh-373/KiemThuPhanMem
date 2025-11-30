package com.flogin.service;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;

/**
 * Interface cho dịch vụ xác thực (Authentication Service).
 * Nó định nghĩa các phương thức nghiệp vụ mà lớp triển khai (AuthServiceImpl) phải thực hiện,
 * đồng thời giúp cho việc Mocking trong testing (như AuthControllerIntegrationTest) trở nên dễ dàng.
 */
public interface AuthService {
    /**
     * Xử lý logic xác thực người dùng.
     * @param request Dữ liệu đăng nhập.
     * @return LoginResponse chứa kết quả xác thực.
     */
    LoginResponse authenticate(LoginRequest request);
}
