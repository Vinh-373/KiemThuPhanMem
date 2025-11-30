const API_BASE_URL = "/api";

const authService = {
  /**
   * Gửi request POST /api/auth/login
   * Trả về JSON response
   */
  loginUser: async (username, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      return await res.json();  // 🔥 trả về object JSON
    } catch (error) {
      return {
        success: false,
        message: error.message || "Lỗi kết nối server",
        token: null,
        user: null,
      };
    }
  },
};

export default authService;
