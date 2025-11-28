// // Product.integration.test.js

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ProductList from '../components/ProductList';
// import ProductForm from '../components/ProductForm'; // Giả định có component này
// import ProductDetail from '../components/ProductDetail'; // Giả định có component này
// import productService from '../services/productService';

// // Mock toàn bộ module productService để kiểm soát kết quả API
// jest.mock('../services/productService', () => ({
//   getAll: jest.fn(),
//   getById: jest.fn(),
//   create: jest.fn(),
//   update: jest.fn(),
//   remove: jest.fn(),
// }));

// describe('Product Component Integration Tests', () => {

//   // --- a) Test ProductList component với API (2 điểm) ---
//   test('Hiển thị danh sách sản phẩm sau khi gọi API thành công', async () => {
//     // Thiết lập mock cho lời gọi getAll thành công
//     productService.getAll.mockResolvedValue([
//       { id: 101, name: 'Smart TV', price: 10000000, quantity: 5 },
//       { id: 102, name: 'Smartphone', price: 8000000, quantity: 20 },
//     ]);

//     render(<ProductList />);

//     // Kiểm tra trạng thái tải ban đầu
//     expect(screen.getByText('Đang tải...')).toBeInTheDocument();

//     // Chờ cho đến khi dữ liệu được tải và hiển thị
//     await waitFor(() => {
//       expect(screen.queryByText('Đang tải...')).not.toBeInTheDocument();
//       // Kiểm tra xem các sản phẩm đã được hiển thị
//       expect(screen.getByText('Smart TV')).toBeInTheDocument();
//       expect(screen.getByText('Smartphone')).toBeInTheDocument();
//       // Kiểm tra tổng số lượng sản phẩm
//       expect(screen.getAllByTestId('product-item')).toHaveLength(2);
//     });
//   });

//   // --- b) Test ProductForm component (create/edit) (2 điểm) ---
//   test('Tạo sản phẩm mới thành công', async () => {
//     // Thiết lập mock cho lời gọi create thành công
//     productService.create.mockResolvedValue({ id: 99, name: 'Laptop Dell', price: 15000000, quantity: 10 });

//     // Sử dụng ProductForm.js (được cung cấp trong ví dụ của bạn)
//     // Giả định ProductForm được sửa để mock API thay vì gọi API thật.
//     render(<ProductForm />);

//     fireEvent.change(screen.getByLabelText('Ten san pham'), {
//       target: { value: 'Laptop Dell' }
//     });
//     fireEvent.change(screen.getByLabelText('Gia'), {
//       target: { value: '15000000' }
//     });
//     fireEvent.change(screen.getByLabelText('So luong'), {
//       target: { value: '10' }
//     });

//     fireEvent.click(screen.getByText('Luu'));

//     await waitFor(() => {
//       // Kiểm tra xem hàm create đã được gọi với dữ liệu đúng
//       expect(productService.create).toHaveBeenCalledWith({
//         name: 'Laptop Dell',
//         price: 15000000,
//         quantity: 10,
//       });
//       // Kiểm tra thông báo thành công (Giả định ProductForm hiển thị thông báo này)
//       expect(screen.getByText('Them san pham thanh cong')).toBeInTheDocument();
//     });
//   });

//   test('Chỉnh sửa sản phẩm thành công', async () => {
//     const editProductId = 55;

//     // 1. Mock để tải dữ liệu ban đầu cho form (Get by Id)
//     productService.getById.mockResolvedValue({
//         id: editProductId,
//         name: 'Máy ảnh Canon 6D',
//         price: 30000000,
//         quantity: 5
//     });

//     // 2. Mock cho lời gọi cập nhật (Update) thành công
//     productService.update.mockResolvedValue({ 
//         id: editProductId, 
//         name: 'Máy ảnh Canon 6D Mark II', // Tên mới
//         price: 45000000, 
//         quantity: 5 
//     });

//     // Render component ở chế độ chỉnh sửa (truyền productId)
//     render(<ProductForm productId={editProductId} />);

//     // Chờ cho đến khi dữ liệu cũ được tải vào form
//     await waitFor(() => {
//         expect(screen.getByLabelText('Ten san pham')).toHaveValue('Máy ảnh Canon 6D');
//     });

//     // 3. Thay đổi dữ liệu
//     fireEvent.change(screen.getByLabelText('Ten san pham'), {
//         target: { value: 'Máy ảnh Canon 6D Mark II' } // Tên mới
//     });
//     fireEvent.change(screen.getByLabelText('Gia'), {
//         target: { value: '45000000' } // Giá mới
//     });

//     // 4. Nhấn nút Lưu
//     fireEvent.click(screen.getByText('Luu'));

//     await waitFor(() => {
//         // Kiểm tra xem hàm update đã được gọi với ID và dữ liệu mới đúng
//         expect(productService.update).toHaveBeenCalledWith(editProductId, {
//             name: 'Máy ảnh Canon 6D Mark II',
//             price: 45000000,
//             quantity: 5, // Quantity giữ nguyên từ dữ liệu cũ
//         });

//         // Kiểm tra thông báo thành công (Giả định ProductForm hiển thị thông báo này)
//         expect(screen.getByText('Cập nhật sản phẩm thành công')).toBeInTheDocument();
//     });
//   });

//   // --- c) Test ProductDetail component (1 điểm) ---
//   test('Hiển thị chi tiết sản phẩm sau khi gọi API thành công', async () => {
//     const mockProductId = 42;
//     // Thiết lập mock cho lời gọi getById thành công
//     productService.getById.mockResolvedValue({
//       id: mockProductId,
//       name: 'Bàn phím cơ',
//       price: 3500000,
//       quantity: 50
//     });

//     // Truyền productId giả định
//     render(<ProductDetail productId={mockProductId} />);

//     // Kiểm tra trạng thái tải
//     expect(screen.getByText('Đang tải chi tiết...')).toBeInTheDocument();

//     // Chờ cho đến khi dữ liệu được tải và hiển thị
//     await waitFor(() => {
//       expect(screen.queryByText('Đang tải chi tiết...')).not.toBeInTheDocument();
//       // Kiểm tra thông tin chi tiết sản phẩm
//       expect(screen.getByTestId('product-name')).toHaveTextContent('Bàn phím cơ');
//       expect(screen.getByTestId('product-price')).toHaveTextContent('3,500,000 VND');
//       // Kiểm tra xem hàm getById đã được gọi với ID đúng
//       expect(productService.getById).toHaveBeenCalledWith(mockProductId);
//     });
//   });
// });

// Product.integration.test.js

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Import các component
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import ProductDetail from '../components/ProductDetail';
import productService from '../services/productService'; // Import service thật

// Mock toàn bộ module productService để kiểm soát kết quả API
jest.mock('../services/productService', () => ({
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
}));

describe('Product Component Integration Tests', () => {

    // --- SETUP/TEARDOWN CHUNG ---
    beforeEach(() => {
        // Reset tất cả các lần gọi và giá trị mock giữa các test
        jest.clearAllMocks();
    });

    afterEach(() => {
        // Đảm bảo không có mock nào còn sót lại ảnh hưởng đến các file test khác
        jest.restoreAllMocks();
    });
    // ----------------------------

    // --- a) Test ProductList component với API (2 điểm) ---
    test('Hiển thị danh sách sản phẩm sau khi gọi API thành công', async () => {
        // Thiết lập mock cho lời gọi getAll thành công
        productService.getAll.mockResolvedValue([
            { id: 101, name: 'Smart TV', price: 10000000, quantity: 5 },
            { id: 102, name: 'Smartphone', price: 8000000, quantity: 20 },
        ]);

        render(<ProductList />);

        // Kiểm tra trạng thái tải ban đầu
        expect(screen.getByText('Đang tải...')).toBeInTheDocument();

        // Chờ cho đến khi dữ liệu được tải và hiển thị
        await waitFor(() => {
            expect(screen.queryByText('Đang tải...')).not.toBeInTheDocument();
            expect(productService.getAll).toHaveBeenCalledTimes(1);
            // Kiểm tra xem các sản phẩm đã được hiển thị
            expect(screen.getByText('Smart TV')).toBeInTheDocument();
            expect(screen.getByText('Smartphone')).toBeInTheDocument();
            // Kiểm tra tổng số lượng sản phẩm (Dựa trên ProductList.jsx mẫu)
            expect(screen.getAllByTestId('product-item')).toHaveLength(2);
        });
    });

    // --- b) Test ProductForm component (create/edit) (2 điểm) ---
    test('Tạo sản phẩm mới thành công', async () => {
        // Thiết lập mock cho lời gọi create thành công (trả về Promise)
        productService.create.mockResolvedValue({ id: 99, name: 'Laptop Dell', price: 15000000, quantity: 10 });

        render(<ProductForm />);

        fireEvent.change(screen.getByLabelText('Ten san pham'), {
            target: { value: 'Laptop Dell' }
        });
        fireEvent.change(screen.getByLabelText('Gia'), {
            target: { value: '15000000' }
        });
        fireEvent.change(screen.getByLabelText('So luong'), {
            target: { value: '10' }
        });

        // Sửa lỗi chính tả: dùng 'Luu' để khớp với component ProductForm.jsx
        fireEvent.click(screen.getByText('Luu'));

        // Đợi trạng thái loading 'Đang Xử Lý...' biến mất (nếu bạn check loading trong test)
        // expect(screen.getByText('Đang Xử Lý...')).toBeInTheDocument();

        await waitFor(() => {
            // Kiểm tra xem hàm create đã được gọi với dữ liệu đúng
            expect(productService.create).toHaveBeenCalledWith({
                name: 'Laptop Dell',
                price: 15000000,
                quantity: 10,
            });
            // Kiểm tra thông báo thành công (chuỗi đã được thống nhất với component)
            expect(screen.getByText('Them san pham thanh cong')).toBeInTheDocument();
        });
    });

    test('Chỉnh sửa sản phẩm thành công', async () => {
        const editProductId = 55;

        // 1. Mock để tải dữ liệu ban đầu cho form (Get by Id)
        const initialProductData = {
            id: editProductId,
            name: 'Máy ảnh Canon 6D',
            price: 30000000,
            quantity: 5
        };
        productService.getById.mockResolvedValue(initialProductData);

        // 2. Mock cho lời gọi cập nhật (Update) thành công
        productService.update.mockResolvedValue(true);

        // Render component ở chế độ chỉnh sửa (truyền productId)
        render(<ProductForm productId={editProductId} />);

        // Chờ cho đến khi dữ liệu cũ được tải vào form (productService.getById đã resolve)
        await waitFor(() => {
            // Đảm bảo dữ liệu đã được điền vào input
            expect(screen.getByLabelText('Ten san pham')).toHaveValue('Máy ảnh Canon 6D');
        });

        // 🛑 Kiểm tra: getById chỉ nên được gọi 1 lần khi render
        expect(productService.getById).toHaveBeenCalledTimes(1);

        // 3. Thay đổi dữ liệu
        fireEvent.change(screen.getByLabelText('Ten san pham'), {
            target: { value: 'Máy ảnh Canon 6D Mark II' } // Tên mới
        });
        fireEvent.change(screen.getByLabelText('Gia'), {
            target: { value: '45000000' } // Giá mới
        });

        // 4. Nhấn nút Lưu (Sửa lỗi chính tả)
        fireEvent.click(screen.getByText('Luu'));

        await waitFor(() => {
            // Kiểm tra xem hàm update đã được gọi với ID và dữ liệu mới đúng
            expect(productService.update).toHaveBeenCalledWith(editProductId, {
                name: 'Máy ảnh Canon 6D Mark II',
                price: 45000000,
                quantity: 5, // Quantity lấy từ dữ liệu initial
            });

            // Kiểm tra thông báo thành công
            expect(screen.getByText('Cập nhật sản phẩm thành công')).toBeInTheDocument();
        });
    });

    // --- c) Test ProductDetail component (1 điểm) ---
    test('Hiển thị chi tiết sản phẩm sau khi gọi API thành công', async () => {
        const mockProductId = 42;
        // Thiết lập mock cho lời gọi getById thành công (Mock phải trả về Promise)
        productService.getById.mockResolvedValue({
            id: mockProductId,
            name: 'Bàn phím cơ',
            price: 3500000,
            quantity: 50
        });

        // Truyền productId giả định
        render(<ProductDetail productId={mockProductId} />);

        // Kiểm tra trạng thái tải
        expect(screen.getByText('Đang tải chi tiết...')).toBeInTheDocument();

        // Chờ cho đến khi dữ liệu được tải và hiển thị
        await waitFor(() => {
            expect(screen.queryByText('Đang tải chi tiết...')).not.toBeInTheDocument();
            // Kiểm tra thông tin chi tiết sản phẩm
            expect(screen.getByTestId('product-name')).toHaveTextContent('Bàn phím cơ');
            // Chuỗi format phải khớp với ProductDetail.jsx: 3,500,000 VNĐ
            expect(screen.getByTestId('product-price')).toHaveTextContent('3,500,000 VNĐ');
            // Kiểm tra xem hàm getById đã được gọi với ID đúng
            expect(productService.getById).toHaveBeenCalledWith(mockProductId);
        });
    });
});