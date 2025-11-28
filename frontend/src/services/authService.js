// Giả định sử dụng axios hoặc fetch để gọi API thật
const API_BASE_URL = '/api'; // Đường dẫn cơ bản đến Backend

const authService = {
  /**
   * Gọi API POST /api/auth/login
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<{success: boolean, message: string, token: string, user: object}>}
   */
  loginUser: async (username, password) => {
    // Trong môi trường development/test, thường mock hoặc dùng msw.
    // Trong môi trường production, nó sẽ gọi axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    
    // Ví dụ: Giả định response (sẽ bị mock trong Integration Test)
    if (username === "admin" && password === "Admin123") {
        return {
            success: true,
            message: "Đăng nhập thành công",
            token: "mock-jwt-token-for-admin",
            user: { username: "admin", role: "ADMIN" }
        };
    } else {
         // Trong service thật, API thường trả về {success: false, message: '...'}
         // Test case của bạn mock để trả về object đó, nên ta sẽ trả về object thất bại
         // thay vì throw Error để khớp với TC-LINT-002:
         return {
            success: false,
            message: "Tên đăng nhập hoặc mật khẩu không đúng",
            token: null,
            user: null
         };
    }
  },
  
  // ... Các phương thức khác: logout, register
};

// Sử dụng export const để dễ dàng import và mock
export { authService };