import productService from '../services/productService';

// Mock toàn bộ module productService để kiểm soát kết quả API
jest.mock('../services/productService', () => ({
    __esModule: true,
    default: {
        getAll: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    }
}));

describe('Product Mock Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Đảm bảo test độc lập
    });

    
    // TC-PMOCK-001: Mock Create Product 
    test('Mock: Create product thành công - Mock productService.create() trả về product mới', async () => {
        // Mock productService.create() để trả về sản phẩm đã tạo
        const mockNewProduct = {
            id: 99,
            name: 'Laptop Dell XPS 13',
            price: 15000000,
            quantity: 10,
            company: 'Dell',
            description: 'Laptop mỏng nhẹ, hiệu năng cao'
        };

        productService.create.mockResolvedValue(mockNewProduct);

        // Act - Gọi mock function
        const result = await productService.create({
            name: 'Laptop Dell XPS 13',
            price: 15000000,
            quantity: 10,
            company: 'Dell'
        });

        // Assert
        expect(productService.create).toHaveBeenCalledTimes(1);
        expect(result.id).toBe(99);
        expect(result.name).toBe('Laptop Dell XPS 13');
        expect(result.price).toBe(15000000);
    });

    // TC-PMOCK-002: Mock Get Products 
    test('Mock: Get all products thành công - Mock productService.getAll() trả về danh sách', async () => {
        // Mock productService.getAll() để trả về danh sách sản phẩm
        const mockProducts = [
            { id: 1, name: 'Laptop', price: 15000000, quantity: 5 },
            { id: 2, name: 'Mouse', price: 200000, quantity: 20 },
            { id: 3, name: 'Keyboard', price: 1000000, quantity: 15 }
        ];

        productService.getAll.mockResolvedValue(mockProducts);

        // Act
        const result = await productService.getAll();

        // Assert
        expect(productService.getAll).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(3);
        expect(result[0].name).toBe('Laptop');
        expect(result[1].name).toBe('Mouse');
    });

    // TC-PMOCK-003: Mock Get Product by ID 
    test('Mock: Get product by ID thành công - Mock productService.getById() trả về sản phẩm', async () => {
        const mockProduct = {
            id: 42,
            name: 'Bàn phím cơ RGB',
            price: 3500000,
            quantity: 50,
            company: 'Corsair'
        };

        productService.getById.mockResolvedValue(mockProduct);

        // Act
        const result = await productService.getById(42);

        // Assert
        expect(productService.getById).toHaveBeenCalledWith(42);
        expect(result.id).toBe(42);
        expect(result.name).toBe('Bàn phím cơ RGB');
        expect(result.price).toBe(3500000);
    });

    
    // TC-PMOCK-004: Mock Update Product Success
    test('Mock: Update product thành công - Mock productService.update() trả về updated product', async () => {
        const updatedProduct = {
            id: 1,
            name: 'Laptop Pro Max',
            price: 20000000,
            quantity: 8
        };
        productService.update.mockResolvedValue(updatedProduct);

        // Act
        const result = await productService.update(1, {
            name: 'Laptop Pro Max',
            price: 20000000,
            quantity: 8
        });

        // Assert
        expect(productService.update).toHaveBeenCalledTimes(1);
        expect(result.id).toBe(1);
        expect(result.name).toBe('Laptop Pro Max');
        expect(result.price).toBe(20000000);
    });

    // TC-PMOCK-005: Mock Delete Product Success 
    test('Mock: Delete product thành công - Mock productService.remove() trả về true', async () => {
        productService.remove.mockResolvedValue(true);

        // Act
        const result = await productService.remove(1);

        // Assert
        expect(productService.remove).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    
    // TC-PMOCK-006: Verify all mock calls
    test('Mock: Verify tất cả các mock calls cho CRUD operations', async () => {
        // Setup all mocks
        productService.getAll.mockResolvedValue([
            { id: 1, name: 'Product 1', price: 1000000, quantity: 10 }
        ]);
        productService.getById.mockResolvedValue(
            { id: 1, name: 'Product 1', price: 1000000, quantity: 10 }
        );
        productService.create.mockResolvedValue(
            { id: 2, name: 'Product 2', price: 2000000, quantity: 5 }
        );
        productService.update.mockResolvedValue(
            { id: 2, name: 'Updated Product 2', price: 2000000, quantity: 5 }
        );
        productService.remove.mockResolvedValue(true);

        // Act - Gọi tất cả các mock functions
        await productService.getAll();
        await productService.getById(1);
        await productService.create({ name: 'Product 2' });
        await productService.update(2, { name: 'Updated Product 2' });
        await productService.remove(2);

        // Assert - Verify all were called
        expect(productService.getAll).toHaveBeenCalledTimes(1);
        expect(productService.getById).toHaveBeenCalledTimes(1);
        expect(productService.create).toHaveBeenCalledTimes(1);
        expect(productService.update).toHaveBeenCalledTimes(1);
        expect(productService.remove).toHaveBeenCalledTimes(1);
    });

    // TC-PMOCK-007: Test success scenario - Create product
    test('Mock: Success scenario - Create product returns new product with ID', async () => {
        const mockNewProduct = {
            id: 100,
            name: 'New Product',
            price: 5000000,
            quantity: 15,
            company: 'New Company'
        };

        productService.create.mockResolvedValue(mockNewProduct);

        // Act
        const result = await productService.create({
            name: 'New Product',
            price: 5000000,
            quantity: 15,
            company: 'New Company'
        });

        // Assert - Kiểm tra success scenario
        expect(result).toBeDefined();
        expect(result.id).toBe(100);
        expect(result.name).toBe('New Product');
        expect(result.price).toBe(5000000);
        expect(productService.create).toHaveBeenCalled();
    });

    // TC-PMOCK-008: Test failure scenario - Get product by invalid ID
    test('Mock: Failure scenario - Get product by invalid ID returns null', async () => {
        productService.getById.mockResolvedValue(null);

        // Act
        const result = await productService.getById(999);

        // Assert - Kiểm tra failure scenario
        expect(result).toBeNull();
        expect(productService.getById).toHaveBeenCalledWith(999);
    });

    // TC-PMOCK-009: Test failure scenario - Delete non-existent product
    test('Mock: Failure scenario - Delete non-existent product returns false', async () => {
        productService.remove.mockResolvedValue(false);

        // Act
        const result = await productService.remove(999);

        // Assert
        expect(result).toBe(false);
        expect(productService.remove).toHaveBeenCalledWith(999);
    });

    // TC-PMOCK-010: Test success scenario - Update product
    test('Mock: Success scenario - Update product with new data', async () => {
        const updatedProduct = {
            id: 5,
            name: 'Updated Product Name',
            price: 7500000,
            quantity: 25,
            company: 'Updated Company'
        };

        productService.update.mockResolvedValue(updatedProduct);

        // Act
        const result = await productService.update(5, {
            name: 'Updated Product Name',
            price: 7500000,
            quantity: 25,
            company: 'Updated Company'
        });

        // Assert
        expect(result).toBeDefined();
        expect(result.id).toBe(5);
        expect(result.name).toBe('Updated Product Name');
        expect(result.price).toBe(7500000);
        expect(productService.update).toHaveBeenCalledTimes(1);
    });

    // TC-PMOCK-011: Test failure scenario - Create product with invalid data
    test('Mock: Failure scenario - Create product with invalid data throws error', async () => {
        const error = new Error('Invalid product data');
        productService.create.mockRejectedValue(error);

        // Act & Assert
        await expect(productService.create(null)).rejects.toThrow('Invalid product data');
        expect(productService.create).toHaveBeenCalled();
    });
});
