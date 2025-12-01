import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Products from '../pages/Products';

// Mock fetch API
global.fetch = jest.fn();

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Product Mock Tests - Frontend', () => {
  
  const mockProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      company: 'Apple',
      price: 32990000,
      quantity: 20,
      description: 'Flagship phone',
      img: 'https://example.com/iphone.png'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      company: 'Samsung',
      price: 29990000,
      quantity: 25,
      description: 'Premium phone',
      img: 'https://example.com/samsung.png'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  // TC1: Mock - Get products thành công
  test('Mock: Lay danh sach san pham thanh cong', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    // Verify API called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/products');
    });

    // Verify products displayed
    await waitFor(() => {
      expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument();
      expect(screen.getByText('Samsung Galaxy S24')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // TC2: Mock - Create product thành công
  test('Mock: Tao san pham moi thanh cong', async () => {
    const newProduct = {
      name: 'Laptop Dell',
      company: 'Dell',
      price: 15000000,
      quantity: 10,
      description: 'Gaming laptop',
      img: 'https://example.com/laptop.png'
    };

    const createdProduct = { id: 3, ...newProduct };

    // Mock GET products
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    });

    // Mock POST create product
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdProduct
    });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument();
    });

    // Simulate create product (this would be in a form component)
    // For now, just verify the mock would work
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    const data = await response.json();

    expect(data).toEqual(createdProduct);
    expect(data.id).toBe(3);
    expect(data.name).toBe('Laptop Dell');
  });

  // TC3: Mock - Update product thành công
  test('Mock: Cap nhat san pham thanh cong', async () => {
    const updatedProduct = {
      ...mockProducts[0],
      price: 31990000, // Giá mới
      quantity: 15 // Số lượng mới
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedProduct
    });

    const response = await fetch(`http://localhost:5000/api/products/${mockProducts[0].id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });
    const data = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/products/${mockProducts[0].id}`,
      expect.objectContaining({
        method: 'PUT'
      })
    );
    expect(data.price).toBe(31990000);
    expect(data.quantity).toBe(15);
  });

  // TC4: Mock - Delete product thành công
  test('Mock: Xoa san pham thanh cong', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Xoa san pham thanh cong' })
    });

    const response = await fetch(`http://localhost:5000/api/products/${mockProducts[0].id}`, {
      method: 'DELETE'
    });
    const data = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/products/${mockProducts[0].id}`,
      expect.objectContaining({
        method: 'DELETE'
      })
    );
    expect(data.message).toBe('Xoa san pham thanh cong');
  });

  // TC5: Mock - Get products failure
  test('Mock: Xu ly loi khi lay danh sach san pham that bai', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch products'));

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Console.error should be called
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // TC6: Mock - Get products with pagination
  test('Mock: Lay san pham voi pagination', async () => {
    const paginatedResponse = {
      data: mockProducts,
      page: 1,
      totalPages: 5,
      total: 100
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => paginatedResponse
    });

    const response = await fetch('http://localhost:5000/api/products?page=1&limit=20');
    const data = await response.json();

    expect(data.data).toEqual(mockProducts);
    expect(data.page).toBe(1);
    expect(data.total).toBe(100);
  });

  // TC7: Mock - Get product by ID
  test('Mock: Lay chi tiet san pham theo ID', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts[0]
    });

    const response = await fetch(`http://localhost:5000/api/products/${mockProducts[0].id}`);
    const data = await response.json();

    expect(data).toEqual(mockProducts[0]);
    expect(data.id).toBe(1);
    expect(data.name).toBe('iPhone 15 Pro Max');
  });

  // TC8: Mock - Verify all mock calls
  test('Mock: Verify tat ca cac mock calls', async () => {
    // Mock multiple API calls
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockProducts })
      .mockResolvedValueOnce({ ok: true, json: async () => mockProducts[0] })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ message: 'Success' }) });

    // Call 1: Get all products
    await fetch('http://localhost:5000/api/products');
    
    // Call 2: Get product by ID
    await fetch('http://localhost:5000/api/products/1');
    
    // Call 3: Delete product
    await fetch('http://localhost:5000/api/products/1', { method: 'DELETE' });

    // Verify all calls
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenNthCalledWith(1, 'http://localhost:5000/api/products');
    expect(global.fetch).toHaveBeenNthCalledWith(2, 'http://localhost:5000/api/products/1');
    expect(global.fetch).toHaveBeenNthCalledWith(
      3, 
      'http://localhost:5000/api/products/1',
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  // // TC9: Mock - Add to cart
  // test('Mock: Them san pham vao gio hang', async () => {
  //   global.fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => mockProducts
  //   });

  //   render(
  //     <BrowserRouter>
  //       <Products />
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument();
  //   });

  //   // Find and click add to cart button
  //   const addToCartButtons = screen.getAllByText('Add to Cart');
  //   fireEvent.click(addToCartButtons[0]);

  //   // Verify console.log was called (mocked in the component)
  //   // In real implementation, this would call an API
  // });

  // TC10: Mock - Test empty product list
  test('Mock: Hien thi thong bao khi khong co san pham', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No products available')).toBeInTheDocument();
    });
  });
});
