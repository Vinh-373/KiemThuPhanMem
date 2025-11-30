
// dùng cho product.integration.test.js
// Giả lập (Mock) các hàm gọi API
const productService = {
  // Lấy danh sách sản phẩm
  getAll: async () => [
    { id: 1, name: 'Laptop Dell', price: 15000000, quantity: 10 },
    { id: 2, name: 'Mouse', price: 200000, quantity: 50 },
  ],
  // Lấy chi tiết sản phẩm theo ID
  getById: async (id) => {
    if (id === 42) {
      return { id: 42, name: 'Bàn phím cơ', price: 3500000, quantity: 50 };
    }
    return { id: id, name: 'Sản phẩm X', price: 1000000, quantity: 10 };
  },
  // Tạo sản phẩm mới
  create: async (productData) => {
    console.log("Service: Tạo sản phẩm mới", productData);
    // Giả định thành công sau 100ms
    return new Promise(resolve => setTimeout(() => resolve({ ...productData, id: Date.now() }), 100));
  },
  // Cập nhật sản phẩm
  update: async (id, productData) => {
    console.log(`Service: Cập nhật sản phẩm ID ${id}`, productData);
    return { id: id, ...productData };
  },
  // Xóa sản phẩm
  remove: async (id) => true,
};

export default productService;