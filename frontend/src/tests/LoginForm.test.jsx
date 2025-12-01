import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

// Mock fetch API
global.fetch = jest.fn();

describe('Login Mock Tests - Frontend', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // TC1: Mock - Login thành công
  test('Mock: Login thanh cong voi credentials hop le', async () => {
    const mockResponse = {
      success: true,
      message: 'Dang nhap thanh cong',
      token: 'mock-token-123',
      user: { 
        id: 1,
        username: 'testuser',
        role: 'user' 
      }
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const mockOnLoginSuccess = jest.fn();
    const mockOnToggleMode = jest.fn();

    render(
      <BrowserRouter>
        <LoginForm 
          onLoginSuccess={mockOnLoginSuccess}
          onToggleMode={mockOnToggleMode}
        />
      </BrowserRouter>
    );

    // Fill form
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123' } });
    fireEvent.click(loginButton);

    // Verify API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: 'testuser', 
            password: 'Test123' 
          })
        })
      );
    });

    // Verify localStorage
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mock-token-123');
      expect(mockOnLoginSuccess).toHaveBeenCalledTimes(1);
    });
  });

  // TC2: Mock - Login thất bại với credentials sai
  test('Mock: Login that bai voi username hoac password sai', async () => {
    const mockErrorResponse = {
      success: false,
      message: 'Username khong ton tai'
    };

    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse
    });

    const mockOnLoginSuccess = jest.fn();
    const mockOnToggleMode = jest.fn();

    render(
      <BrowserRouter>
        <LoginForm 
          onLoginSuccess={mockOnLoginSuccess}
          onToggleMode={mockOnToggleMode}
        />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'WrongPass123' } });
    fireEvent.click(loginButton);

    // Verify error message displayed
    await waitFor(() => {
      expect(screen.getByText(/Username khong ton tai/i)).toBeInTheDocument();
    });

    // Verify onLoginSuccess NOT called
    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  });

  // TC3: Mock - Network error
  test('Mock: Xu ly loi khi mat ket noi mang', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const mockOnLoginSuccess = jest.fn();
    const mockOnToggleMode = jest.fn();

    render(
      <BrowserRouter>
        <LoginForm 
          onLoginSuccess={mockOnLoginSuccess}
          onToggleMode={mockOnToggleMode}
        />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  // TC4: Mock - Verify fetch called with correct parameters
  test('Mock: Verify fetch duoc goi voi dung tham so', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, token: 'test-token' })
    });

    const mockOnLoginSuccess = jest.fn();

    render(
      <BrowserRouter>
        <LoginForm onLoginSuccess={mockOnLoginSuccess} onToggleMode={() => {}} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { 
      target: { value: 'testuser' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { 
      target: { value: 'Test123' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });
  });
});
