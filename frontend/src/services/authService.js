loginUser: async (username, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    let data = { success: false, message: "Đăng nhập thất bại" };

    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      return {
        success: false,
        message: data.message || `HTTP Error ${res.status}`,
        token: null,
        user: null,
      };
    }

    return data;

  } catch (error) {
    return {
      success: false,
      message: error.message || "Lỗi kết nối server",
      token: null,
      user: null,
    };
  }
},
