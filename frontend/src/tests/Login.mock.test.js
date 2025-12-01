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

    // TC-LMOCK-004: Test HTTP Error - Response status không ok
    test('Mock: HTTP Error - Mock fetch() trả về response không ok', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(getByTestId('username-input'), { target: { value: 'testuser' } });
        fireEvent.change(getByTestId('password-input'), { target: { value: 'Test123' } });
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Thông báo lỗi HTTP được hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('HTTP Error: 500');
        });

        // Kiểm tra: onLoginSuccess KHÔNG được gọi khi có HTTP error
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });

    // TC-LMOCK-005: Test Validation Error - Username trống
    test('Mock: Validation Error - Username trống', async () => {
        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        // Chỉ nhập password, để username trống
        fireEvent.change(getByTestId('password-input'), { target: { value: 'Test123' } });
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Lỗi validation hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('username-error')).toHaveTextContent(
                'Tên đăng nhập không được để trống.'
            );
        });

        // Kiểm tra: fetch KHÔNG được gọi khi validation thất bại
        expect(global.fetch).not.toHaveBeenCalled();
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });

    // TC-LMOCK-006: Test Validation Error - Password trống
    test('Mock: Validation Error - Password trống', async () => {
        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        // Chỉ nhập username, để password trống
        fireEvent.change(getByTestId('username-input'), { target: { value: 'testuser' } });
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Lỗi validation hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('password-error')).toHaveTextContent(
                'Mật khẩu không được để trống.'
            );
        });

        // Kiểm tra: fetch KHÔNG được gọi khi validation thất bại
        expect(global.fetch).not.toHaveBeenCalled();
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });

    // TC-LMOCK-007: Test Network Error - Fetch thất bại
    test('Mock: Network Error - fetch() throw exception', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(getByTestId('username-input'), { target: { value: 'testuser' } });
        fireEvent.change(getByTestId('password-input'), { target: { value: 'Test123' } });
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Thông báo lỗi mạng được hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Network error');
        });

        // Kiểm tra: onLoginSuccess KHÔNG được gọi khi có network error
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });

    // TC-LMOCK-008: Test Both validation errors - Username và Password đều trống
    test('Mock: Both validation errors - Username và Password đều trống', async () => {
        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        // Để trống cả username và password
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Lỗi validation hiển thị cho cả hai field
        await waitFor(() => {
            expect(screen.getByTestId('username-error')).toHaveTextContent(
                'Tên đăng nhập không được để trống.'
            );
            expect(screen.getByTestId('password-error')).toHaveTextContent(
                'Mật khẩu không được để trống.'
            );
        });

        // Kiểm tra: fetch KHÔNG được gọi
        expect(global.fetch).not.toHaveBeenCalled();
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });

    // TC-LMOCK-009: Test Server response without success field
    test('Mock: Server response không có success field - fallback message', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                message: 'Đăng nhập thất bại',
            }),
        });

        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(getByTestId('username-input'), { target: { value: 'testuser' } });
        fireEvent.change(getByTestId('password-input'), { target: { value: 'Test123' } });
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Thông báo từ server được hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Đăng nhập thất bại');
        });

        // Kiểm tra: onLoginSuccess KHÔNG được gọi
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });

    // TC-LMOCK-010: Test JSON parse error
    test('Mock: JSON parse error - response.json() throws exception', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                throw new Error('Invalid JSON');
            },
        });

        const { getByTestId } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(getByTestId('username-input'), { target: { value: 'testuser' } });
        fireEvent.change(getByTestId('password-input'), { target: { value: 'Test123' } });
        fireEvent.click(getByTestId('login-button'));

        // Kiểm tra: Thông báo lỗi được hiển thị
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Invalid JSON');
        });

        // Kiểm tra: onLoginSuccess KHÔNG được gọi
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
});
