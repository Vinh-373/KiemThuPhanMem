import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/LoginForm';

// Mock fetch API để kiểm soát kết quả từ server
global.fetch = jest.fn();

describe('Login Mock Tests', () => {
    let mockOnLoginSuccess;

    beforeEach(() => {
        jest.clearAllMocks(); // Đảm bảo test độc lập
        mockOnLoginSuccess = jest.fn(); // Reset mock function
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // TC-LMOCK-001: Mock Login thành công 
    test('Mock: Đăng nhập thành công - Mock fetch() trả về success: true', async () => {
        // Mock fetch() để trả về kết quả thành công
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: true,
                message: 'Đăng nhập thành công',
                token: 'mock-token-123',
                user: { username: 'testuser' },
            }),
        });

        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        // User nhập tên đăng nhập và mật khẩu
        fireEvent.change(getByTestId('username-input'), { 
            target: { value: 'testuser' } 
        });
        fireEvent.change(getByTestId('password-input'), { 
            target: { value: 'Test123' } 
        });
        
        // Nhấn nút đăng nhập
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Thông báo thành công được hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Đăng nhập thành công');
        });

        // Kiểm tra: fetch đã được gọi với đúng URL và dữ liệu
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8080/api/auth/login',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'testuser', password: 'Test123' })
            })
        );

        // Kiểm tra: onLoginSuccess callback được gọi
        expect(mockOnLoginSuccess).toHaveBeenCalled();
    });

    // TC-LMOCK-002: Mock Login thất bại (1 điểm)
    test('Mock: Đăng nhập thất bại - Mock fetch() trả về success: false', async () => {
        // Mock fetch() để trả về kết quả thất bại
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng',
            }),
        });

        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(getByTestId('username-input'), { 
            target: { value: 'wronguser' } 
        });
        fireEvent.change(getByTestId('password-input'), { 
            target: { value: 'Wrong123' } 
        });
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Thông báo lỗi được hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent(
                'Tên đăng nhập hoặc mật khẩu không đúng'
            );
        });
        
        // Kiểm tra: fetch đã được gọi
        expect(global.fetch).toHaveBeenCalled();
        
        // Kiểm tra: onLoginSuccess KHÔNG được gọi khi đăng nhập thất bại
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
    
    // TC-LMOCK-003: Verify mock calls (0.5 điểm)
    test('Mock: Verify mock calls - Kiểm tra fetch() được gọi đúng số lần', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: true,
                message: 'Đăng nhập thành công',
                token: 'token-123',
                user: { username: 'testuser' },
            }),
        });

        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        // Lần gọi đầu tiên
        fireEvent.change(getByTestId('username-input'), { target: { value: 'user1' } });
        fireEvent.change(getByTestId('password-input'), { target: { value: 'pass1' } });
        fireEvent.click(getByTestId('login-button'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8080/api/auth/login',
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ username: 'user1', password: 'pass1' })
                })
            );
        });
    });
});
