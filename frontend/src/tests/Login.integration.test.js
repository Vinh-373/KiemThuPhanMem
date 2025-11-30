// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import Login from '../components/LoginForm';
// import { authService } from '../services/authService'; 

// // Mock toàn bộ module authService để kiểm soát kết quả API
// jest.mock('../services/authService', () => ({
//   authService: {
//     loginUser: jest.fn(), // Spy on the loginUser method
//   },
// }));

// describe('Login Component Integration Tests', () => {
//     let mockOnLoginSuccess;

//     beforeEach(() => {
//         jest.clearAllMocks(); // Đảm bảo test độc lập
//         mockOnLoginSuccess = jest.fn(); // Reset mock function
//     });

//     // TC-LINT-001: Đăng nhập thành công
//     test('Đăng nhập thành công - Hiển thị thông báo success và gọi API', async () => {
//         // Gán giá trị mock thành công cho API call
//         authService.loginUser.mockResolvedValue({ // <--- Dùng authService.loginUser
//             success: true,
//             message: 'Đăng nhập thành công',
//             token: 'mock-token-123',
//             user: { username: 'testuser' },
//         });

//         // Truyền mockOnLoginSuccess vào component
//         render(<Login onLoginSuccess={mockOnLoginSuccess} />); 

//         // 1. User Interactions: Change input values
//         const usernameInput = screen.getByTestId('username-input');
//         const passwordInput = screen.getByTestId('password-input');
//         const submitButton = screen.getByTestId('login-button');

//         fireEvent.change(usernameInput, { target: { value: 'testuser' } });
//         fireEvent.change(passwordInput, { target: { value: 'Test123' } });

//         // 2. Form Submission: Click button
//         fireEvent.click(submitButton);

//         // 3. API Call: Verify service was called with correct data
//         expect(authService.loginUser).toHaveBeenCalledWith('testuser', 'Test123'); // <--- Dùng authService.loginUser

//         // 4. Success Message: Wait for and check success message
//         await waitFor(() => {
//             expect(screen.getByTestId('login-message')).toHaveTextContent('Đăng nhập thành công');
//         });

//         // 5. Verify onLoginSuccess was called
//         // Component có setTimeout, nên ta cần dùng waitFor để đảm bảo nó được gọi
//         await waitFor(() => {
//             expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1); 
//         });
//     });

//     // TC-LINT-002: Xử lý lỗi API
//     test('Đăng nhập thất bại - Hiển thị thông báo lỗi API', async () => {
//         // Gán giá trị mock thất bại cho API call
//         authService.loginUser.mockResolvedValue({ // <--- Dùng authService.loginUser
//             success: false,
//             message: 'Tên đăng nhập hoặc mật khẩu không đúng',
//         });

//         render(<Login onLoginSuccess={mockOnLoginSuccess} />);

//         fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'wronguser' } });
//         fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Wrong123' } });
//         fireEvent.click(screen.getByTestId('login-button'));

//         // Wait for and check error message
//         await waitFor(() => {
//             expect(screen.getByTestId('login-message')).toHaveTextContent('Tên đăng nhập hoặc mật khẩu không đúng');
//         });

//         // Ensure API was called
//         expect(authService.loginUser).toHaveBeenCalledTimes(1);
//         expect(mockOnLoginSuccess).not.toHaveBeenCalled();
//     });

//     // TC-LINT-003: Hiển thị lỗi validation (Test rendering và user interactions)
//     test('Hiển thị lỗi validation khi submit form rỗng (Dữ liệu không hợp lệ)', async () => {
//         // Ensure API call is NOT called
//         authService.loginUser.mockResolvedValue({ success: true }); // <--- Dùng authService.loginUser

//         render(<Login onLoginSuccess={mockOnLoginSuccess} />);

//         fireEvent.click(screen.getByTestId('login-button'));

//         // Wait for validation error messages to appear
//         await waitFor(() => {
//             expect(screen.getByTestId('username-error')).toHaveTextContent('Tên đăng nhập không được để trống.'); // Kiểm tra nội dung
//             expect(screen.getByTestId('password-error')).toHaveTextContent('Mật khẩu không được để trống.'); // Kiểm tra nội dung
//         });

//         // Verify that the API service was NOT called
//         expect(authService.loginUser).not.toHaveBeenCalled();
//         expect(mockOnLoginSuccess).not.toHaveBeenCalled();
//     });
// });

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/LoginForm';

//  Nếu cần, bạn phải đảm bảo đã cài đặt và kích hoạt jest-fetch-mock
// (thường là require('jest-fetch-mock').enableMocks() trong setupTests.js)

// Khai báo Mock cho hàm fetch toàn cục
const fetch = global.fetch;

describe('Login Component Integration Tests (Mocking Fetch)', () => {
    let mockOnLoginSuccess;
    let localStorageMock; // Biến cục bộ để truy cập các hàm jest.fn() đã mock

    beforeEach(() => {
        // Reset mock fetch sau mỗi test
        fetch.resetMocks();
        mockOnLoginSuccess = jest.fn();

        // Tạo Mock cho localStorage
        localStorageMock = {
            setItem: jest.fn(),
            getItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        };

        // Ghi đè global.localStorage bằng mock, sử dụng phương pháp Object.defineProperty
        // để đảm bảo Jest nhận ra các hàm là Spy/Mock
        Object.defineProperty(global, 'localStorage', {
            value: localStorageMock,
            writable: true,
            configurable: true, // Thêm configurable để đảm bảo có thể ghi đè
        });
    });

    // TC-LINT-001: Đăng nhập thành công
    test('Đăng nhập thành công - Hiển thị thông báo success và gọi API', async () => {
        const successResponse = {
            success: true,
            message: 'Đăng nhập thành công',
            token: 'mock-token-123',
            user: { username: 'testuser' },
        };

        // 1. Mock fetch trả về thành công
        fetch.mockResponseOnce(JSON.stringify(successResponse), { status: 200 });

        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        // User Interactions: Change input values
        const usernameInput = screen.getByTestId('username-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('login-button');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'Test123' } });

        // Form Submission: Click button
        fireEvent.click(submitButton);

        // 2. API Call: Verify fetch was called
        expect(fetch).toHaveBeenCalledTimes(1);

        // 3. Success Message: Wait for and check success message
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Đăng nhập thành công');
        });

        // 4. Verify onLoginSuccess was called
        await waitFor(() => {
            expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1);
        });

        // 5. Verify localStorage calls (Sử dụng biến cục bộ đã được mock)
        expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'mock-token-123');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(successResponse.user));
    });

    // TC-LINT-002: Xử lý lỗi API (lỗi nghiệp vụ)
    test('Đăng nhập thất bại - Hiển thị thông báo lỗi API', async () => {
        const failureResponse = {
            success: false,
            message: 'Tên đăng nhập hoặc mật khẩu không đúng',
        };

        // 1. Mock fetch trả về thất bại (status 200 nhưng logic success: false)
        fetch.mockResponseOnce(JSON.stringify(failureResponse), { status: 200 });

        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Wrong123' } });
        fireEvent.click(screen.getByTestId('login-button'));

        // Wait for and check error message
        await waitFor(() => {
            expect(screen.getByTestId('login-message')).toHaveTextContent('Tên đăng nhập hoặc mật khẩu không đúng');
        });

        // Ensure fetch was called
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });

    // TC-LINT-003: Hiển thị lỗi validation (Không gọi API)
    test('Hiển thị lỗi validation khi submit form rỗng (Dữ liệu không hợp lệ)', async () => {
        // KHÔNG CẦN MOCK fetch vì validation sẽ ngăn API call

        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.click(screen.getByTestId('login-button'));

        // Wait for validation error messages to appear
        await waitFor(() => {
            expect(screen.getByTestId('username-error')).toHaveTextContent('Tên đăng nhập không được để trống.');
            expect(screen.getByTestId('password-error')).toHaveTextContent('Mật khẩu không được để trống.');
        });

        // Verify that the API service was NOT called
        expect(fetch).not.toHaveBeenCalled();
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });

    // TC-LINT-004: Xử lý lỗi HTTP (Lỗi mạng hoặc 4xx/5xx)
    test('Xử lý lỗi HTTP khi API trả về 500', async () => {

        // 1. Mock fetch trả về lỗi HTTP 500
        fetch.mockResponseOnce('Server Error', { status: 500, statusText: 'Internal Server Error' });

        render(<Login onLoginSuccess={mockOnLoginSuccess} />);

        fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'user' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Pass123' } });
        fireEvent.click(screen.getByTestId('login-button'));

        // Component sẽ bắt lỗi và hiển thị message từ error.message
        await waitFor(() => {
            // Logic lỗi trong component là: throw new Error(`HTTP Error: ${response.status}`);
            expect(screen.getByTestId('login-message')).toHaveTextContent('HTTP Error: 500');
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    });
});