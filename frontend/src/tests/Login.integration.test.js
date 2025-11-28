import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/LoginForm';
import { authService } from '../services/authService'; 

// Mock toàn bộ module authService để kiểm soát kết quả API
jest.mock('../services/authService', () => ({
  authService: {
    loginUser: jest.fn(), // Spy on the loginUser method
  },
}));

describe('Login Component Integration Tests', () => {
    let mockOnLoginSuccess;

    beforeEach(() => {
        jest.clearAllMocks(); // Đảm bảo test độc lập
        mockOnLoginSuccess = jest.fn(); // Reset mock function
    });

    // TC-LINT-001: Đăng nhập thành công
    test('Đăng nhập thành công - Hiển thị thông báo success và gọi API', async () => {
        // Gán giá trị mock thành công cho API call
        authService.loginUser.mockResolvedValue({ // <--- Dùng authService.loginUser
            success: true,
            message: 'Đăng nhập thành công',
            token: 'mock-token-123',
            user: { username: 'testuser' },
        });

        // Truyền mockOnLoginSuccess vào component
        render(<Login onLoginSuccess={mockOnLoginSuccess} />); 

        // 1. User Interactions: Change input values
        const usernameInput = screen.getByTestId('username-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('login-button');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'Test123' } });
        
        // 2. Form Submission: Click button
        fireEvent.click(submitButton);

        // 3. API Call: Verify service was called with correct data
        expect(authService.loginUser).toHaveBeenCalledWith('testuser', 'Test123'); // <--- Dùng authService.loginUser

        // 4. Success Message: Wait for and check success message
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Đăng nhập thành công');
        });

        // 5. Verify onLoginSuccess was called
        // Component có setTimeout, nên ta cần dùng waitFor để đảm bảo nó được gọi
        await waitFor(() => {
            expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1); 
        });
    });

    // TC-LINT-002: Xử lý lỗi API
    test('Đăng nhập thất bại - Hiển thị thông báo lỗi API', async () => {
        // Gán giá trị mock thất bại cho API call
        authService.loginUser.mockResolvedValue({ // <--- Dùng authService.loginUser
            success: false,
            message: 'Tên đăng nhập hoặc mật khẩu không đúng',
        });

        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Wrong123' } });
        fireEvent.click(screen.getByTestId('login-button'));

        // Wait for and check error message
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Tên đăng nhập hoặc mật khẩu không đúng');
        });
        
        // Ensure API was called
        expect(authService.loginUser).toHaveBeenCalledTimes(1);
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
    
    // TC-LINT-003: Hiển thị lỗi validation (Test rendering và user interactions)
    test('Hiển thị lỗi validation khi submit form rỗng (Dữ liệu không hợp lệ)', async () => {
        // Ensure API call is NOT called
        authService.loginUser.mockResolvedValue({ success: true }); // <--- Dùng authService.loginUser
        
        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.click(screen.getByTestId('login-button'));

        // Wait for validation error messages to appear
        await waitFor(() => {
            expect(screen.getByTestId('username-error')).toHaveTextContent('Tên đăng nhập không được để trống.'); // Kiểm tra nội dung
            expect(screen.getByTestId('password-error')).toHaveTextContent('Mật khẩu không được để trống.'); // Kiểm tra nội dung
        });
        
        // Verify that the API service was NOT called
        expect(authService.loginUser).not.toHaveBeenCalled();
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
});