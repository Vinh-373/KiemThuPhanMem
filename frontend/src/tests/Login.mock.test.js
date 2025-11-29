import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/LoginForm';
import { authService } from '../services/authService';

// Mock toàn bộ module authService để kiểm soát kết quả API
jest.mock('../services/authService', () => ({
  authService: {
    loginUser: jest.fn(), // Spy on the loginUser method
  },
}));

describe('Login Mock Tests', () => {
    let mockOnLoginSuccess;

    beforeEach(() => {
        jest.clearAllMocks(); // Đảm bảo test độc lập
        mockOnLoginSuccess = jest.fn(); // Reset mock function
    });

    // TC-LMOCK-001: Mock Login thành công 
    test('Mock: Đăng nhập thành công - Mock authService.loginUser() trả về success: true', async () => {
        // Mock authService.loginUser() để trả về kết quả thành công
        authService.loginUser.mockResolvedValue({
            success: true,
            message: 'Đăng nhập thành công',
            token: 'mock-token-123',
            user: { username: 'testuser' },
        });

        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        // User nhập tên đăng nhập và mật khẩu
        fireEvent.change(screen.getByTestId('username-input'), { 
            target: { value: 'testuser' } 
        });
        fireEvent.change(screen.getByTestId('password-input'), { 
            target: { value: 'Test123' } 
        });
        
        // Nhấn nút đăng nhập
        fireEvent.click(screen.getByTestId('login-button'));

        // Kiểm tra: authService.loginUser() đã được gọi với đúng dữ liệu
        expect(authService.loginUser).toHaveBeenCalledWith('testuser', 'Test123');

        // Kiểm tra: Thông báo thành công được hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Đăng nhập thành công');
        });
    });

    // TC-LMOCK-002: Mock Login thất bại (1 điểm)
    test('Mock: Đăng nhập thất bại - Mock authService.loginUser() trả về success: false', async () => {
        // Mock authService.loginUser() để trả về kết quả thất bại
        authService.loginUser.mockResolvedValue({
            success: false,
            message: 'Tên đăng nhập hoặc mật khẩu không đúng',
        });

        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(screen.getByTestId('username-input'), { 
            target: { value: 'wronguser' } 
        });
        fireEvent.change(screen.getByTestId('password-input'), { 
            target: { value: 'Wrong123' } 
        });
        fireEvent.click(screen.getByTestId('login-button'));

        // Kiểm tra: Thông báo lỗi được hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent(
                'Tên đăng nhập hoặc mật khẩu không đúng'
            );
        });
        
        // Kiểm tra: authService.loginUser() đã được gọi
        expect(authService.loginUser).toHaveBeenCalledTimes(1);
        
        // Kiểm tra: onLoginSuccess KHÔNG được gọi khi đăng nhập thất bại
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
    
    // TC-LMOCK-003: Verify mock calls (0.5 điểm)
    test('Mock: Verify mock calls - Kiểm tra authService.loginUser() được gọi đúng số lần', async () => {
        authService.loginUser.mockResolvedValue({
            success: true,
            message: 'Đăng nhập thành công',
            token: 'token-123',
            user: { username: 'testuser' },
        });

        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        // Lần gọi đầu tiên
        fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'user1' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'pass1' } });
        fireEvent.click(screen.getByTestId('login-button'));

        await waitFor(() => {
            expect(authService.loginUser).toHaveBeenCalledTimes(1);
            expect(authService.loginUser).toHaveBeenCalledWith('user1', 'pass1');
        });
    });
});
