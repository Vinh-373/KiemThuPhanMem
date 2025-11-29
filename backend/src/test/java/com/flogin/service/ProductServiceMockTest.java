package com.flogin.service;

import com.flogin.model.Product;
import com.flogin.dto.ProductDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Product Service Mock Tests")
class ProductServiceMockTest {

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService();
        productService.reset(); // Reset để bắt đầu với danh sách rỗng
    }


    
    // TC-PSMOCK-001: Test Create Product
    @Test
    @DisplayName("Mock: Create product thành công - Kiểm tra product được thêm vào")
    void testCreateProduct() {
        // Arrange
        Product product = new Product("iPhone 15 Pro", 32990000, 10);
        product.setCompany("Apple");
        product.setDescription("Điện thoại cao cấp từ Apple");

        // Act
        Product created = productService.createProduct(product);

        // Assert
        assertNotNull(created.getId());
        assertEquals("iPhone 15 Pro", created.getName());
        assertEquals(32990000, created.getPrice());
        assertEquals(10, created.getQuantity());
        assertEquals("Apple", created.getCompany());
        
        // Verify product có trong danh sách
        assertEquals(1, productService.getAllProducts().size());
    }

    // TC-PSMOCK-002: Test Get Product by ID
    @Test
    @DisplayName("Mock: Get product by ID - Kiểm tra tìm kiếm product theo ID")
    void testGetProductById() {
        // Arrange
        Product p1 = new Product("Samsung Galaxy S24", 29990000, 5);
        Product created = productService.createProduct(p1);
        Long createdId = created.getId();

        // Act
        Product retrieved = productService.getProduct(createdId);

        // Assert
        assertNotNull(retrieved);
        assertEquals("Samsung Galaxy S24", retrieved.getName());
        assertEquals(29990000, retrieved.getPrice());
        assertEquals(createdId, retrieved.getId());
    }

    
    // TC-PSMOCK-003: Test Update Product
    @Test
    @DisplayName("Mock: Update product thành công - Kiểm tra cập nhật dữ liệu")
    void testUpdateProduct() {
        // Arrange - Tạo product ban đầu
        Product p1 = new Product("Xiaomi 14 Pro", 21990000, 15);
        p1.setCompany("Xiaomi");
        Product created = productService.createProduct(p1);
        Long createdId = created.getId();

        // Act - Update với dữ liệu mới
        Product updateData = new Product("Xiaomi 14 Pro Max", 25990000, 20);
        updateData.setCompany("Xiaomi");
        Product updated = productService.updateProduct(createdId, updateData);

        // Assert
        assertNotNull(updated);
        assertEquals("Xiaomi 14 Pro Max", updated.getName());
        assertEquals(25990000, updated.getPrice());
        assertEquals(20, updated.getQuantity());
        assertEquals(createdId, updated.getId());
    }

    // TC-PSMOCK-004: Test Update Product Not Found
    @Test
    @DisplayName("Mock: Update product không tồn tại - Trả về null")
    void testUpdateProductNotFound() {
        // Arrange
        Product updateData = new Product("Non-existent Product", 1000000, 5);

        // Act
        Product result = productService.updateProduct(999L, updateData);

        // Assert
        assertNull(result);
    }

    
    // TC-PSMOCK-005: Test Delete Product
    @Test
    @DisplayName("Mock: Delete product thành công - Kiểm tra xóa khỏi danh sách")
    void testDeleteProduct() {
        // Arrange
        Product p1 = new Product("OPPO Find X7", 26990000, 8);
        Product created = productService.createProduct(p1);
        Long createdId = created.getId();
        
        assertEquals(1, productService.getAllProducts().size());

        // Act
        boolean deleted = productService.deleteProduct(createdId);

        // Assert
        assertTrue(deleted);
        assertEquals(0, productService.getAllProducts().size());
        assertNull(productService.getProduct(createdId));
    }

    // TC-PSMOCK-006: Test Delete Non-existent Product
    @Test
    @DisplayName("Mock: Delete product không tồn tại - Trả về false")
    void testDeleteNonExistentProduct() {
        // Act
        boolean deleted = productService.deleteProduct(999L);

        // Assert
        assertFalse(deleted);
    }

    // TC-PSMOCK-007: Test Get All Products with Pagination
    @Test
    @DisplayName("Mock: Get products with pagination - Kiểm tra phân trang")
    void testGetAllWithPagination() {
        // Arrange - Tạo 10 products
        for (int i = 1; i <= 10; i++) {
            Product p = new Product("Product " + i, 1000000 * i, i);
            productService.createProduct(p);
        }

        // Act
        List<Product> page1 = productService.getAll(1, 5);
        List<Product> page2 = productService.getAll(2, 5);
        List<Product> page3 = productService.getAll(3, 5);

        // Assert
        assertEquals(5, page1.size());
        assertEquals(5, page2.size());
        assertTrue(page3.isEmpty()); // Trang 3 không có dữ liệu
        
        assertEquals("Product 1", page1.get(0).getName());
        assertEquals("Product 6", page2.get(0).getName());
    }

    
    // TC-PSMOCK-008: Test Convert Product to DTO
    @Test
    @DisplayName("Mock: Convert Product to ProductDTO thành công")
    void testConvertToDto() {
        // Arrange
        Product p = new Product("Vivo X100 Pro", 24990000, 12);
        p.setCompany("Vivo");
        p.setDescription("Flagship phone from Vivo");
        p.setId(55L);

        // Act
        ProductDto dto = productService.toDto(p);

        // Assert
        assertNotNull(dto);
        assertEquals(55L, dto.getId());
        assertEquals("Vivo X100 Pro", dto.getName());
        assertEquals(24990000, dto.getPrice());
        assertEquals(12, dto.getQuantity());
        assertEquals("Vivo", dto.getCompany());
    }

    // TC-PSMOCK-009: Test Convert ProductDTO to Product
    @Test
    @DisplayName("Mock: Convert ProductDTO to Product thành công")
    void testConvertToEntity() {
        // Arrange
        ProductDto dto = new ProductDto(
            null,
            "Google Pixel 8 Pro",
            25990000,
            6,
            "AI-powered phone",
            null,
            "Google"
        );

        // Act
        Product entity = productService.toEntity(dto);

        // Assert
        assertNotNull(entity);
        assertEquals("Google Pixel 8 Pro", entity.getName());
        assertEquals(25990000, entity.getPrice());
        assertEquals(6, entity.getQuantity());
        assertEquals("Google", entity.getCompany());
    }

    // TC-PSMOCK-010: Test Convert Null DTO to Entity
    @Test
    @DisplayName("Mock: Convert null DTO - Trả về null")
    void testConvertNullToEntity() {
        // Act
        Product entity = productService.toEntity(null);

        // Assert
        assertNull(entity);
    }

    // TC-PSMOCK-011: Test Get Products by Company
    @Test
    @DisplayName("Mock: Get products by company - Kiểm tra lọc theo công ty")
    void testGetProductsByCompany() {
        // Arrange
        Product p1 = new Product("iPhone 15", 32990000, 5);
        p1.setCompany("Apple");
        Product p2 = new Product("iPhone 15 Pro", 35990000, 3);
        p2.setCompany("Apple");
        Product p3 = new Product("Galaxy S24", 29990000, 8);
        p3.setCompany("Samsung");

        productService.createProduct(p1);
        productService.createProduct(p2);
        productService.createProduct(p3);

        // Act
        List<Product> appleProducts = productService.getProductsByCompany("Apple");
        List<Product> samsungProducts = productService.getProductsByCompany("Samsung");
        List<Product> xiaomiProducts = productService.getProductsByCompany("Xiaomi");

        // Assert
        assertEquals(2, appleProducts.size());
        assertEquals(1, samsungProducts.size());
        assertTrue(xiaomiProducts.isEmpty());
        
        assertEquals("Apple", appleProducts.get(0).getCompany());
        assertEquals("Apple", appleProducts.get(1).getCompany());
    }

    // TC-PSMOCK-012: Test Convert List of Products to DTOs
    @Test
    @DisplayName("Mock: Convert list of Products to ProductDTOs")
    void testConvertListToDto() {
        // Arrange
        Product p1 = new Product("Asus ROG Phone", 27990000, 10);
        p1.setCompany("ASUS");
        Product p2 = new Product("Realme GT5", 18990000, 20);
        p2.setCompany("Realme");

        productService.createProduct(p1);
        productService.createProduct(p2);

        List<Product> products = productService.getAllProducts();

        // Act
        List<ProductDto> dtoList = productService.toDtoList(products);

        // Assert
        assertEquals(2, dtoList.size());
        assertEquals("Asus ROG Phone", dtoList.get(0).getName());
        assertEquals("Realme GT5", dtoList.get(1).getName());
        assertEquals("ASUS", dtoList.get(0).getCompany());
        assertEquals("Realme", dtoList.get(1).getCompany());
    }
}
