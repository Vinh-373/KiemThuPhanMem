package com.flogin.service;

import com.flogin.model.Product;
import com.flogin.dto.ProductDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.math.BigDecimal;
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
        Product product = new Product("iPhone 15 Pro", new BigDecimal("32990000"), 10);
        product.setCompany("Apple");
        product.setDescription("Điện thoại cao cấp từ Apple");

        // Act
        Product created = productService.createProduct(product);

        // Assert
        assertNotNull(created.getId());
        assertEquals("iPhone 15 Pro", created.getName());
        assertEquals(new BigDecimal("32990000"), created.getPrice());
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
        Product p1 = new Product("Samsung Galaxy S24", new BigDecimal("29990000"), 5);
        Product created = productService.createProduct(p1);
        int createdId = created.getId();

        // Act
        Product retrieved = productService.getProduct(createdId);

        // Assert
        assertNotNull(retrieved);
        assertEquals("Samsung Galaxy S24", retrieved.getName());
        assertEquals(new BigDecimal("29990000"), retrieved.getPrice());
        assertEquals(createdId, retrieved.getId());
    }

    // TC-PSMOCK-003: Test Update Product
    @Test
    @DisplayName("Mock: Update product thành công - Kiểm tra cập nhật dữ liệu")
    void testUpdateProduct() {
        Product p1 = new Product("Xiaomi 14 Pro", new BigDecimal("21990000"), 15);
        p1.setCompany("Xiaomi");
        Product created = productService.createProduct(p1);
        int createdId = created.getId();

        Product updateData = new Product("Xiaomi 14 Pro Max", new BigDecimal("25990000"), 20);
        updateData.setCompany("Xiaomi");
        Product updated = productService.updateProduct(createdId, updateData);

        assertNotNull(updated);
        assertEquals("Xiaomi 14 Pro Max", updated.getName());
        assertEquals(new BigDecimal("25990000"), updated.getPrice());
        assertEquals(20, updated.getQuantity());
        assertEquals(createdId, updated.getId());
    }

    @Test
    @DisplayName("Mock: Update product không tồn tại - Trả về null")
    void testUpdateProductNotFound() {
        Product updateData = new Product("Non-existent Product", new BigDecimal("1000000"), 5);

        Product result = productService.updateProduct(999L, updateData);

        assertNull(result);
    }

    @Test
    @DisplayName("Mock: Delete product thành công - Kiểm tra xóa khỏi danh sách")
    void testDeleteProduct() {
        Product p1 = new Product("OPPO Find X7", new BigDecimal("26990000"), 8);
        Product created = productService.createProduct(p1);
        int createdId = created.getId();

        assertEquals(1, productService.getAllProducts().size());

        boolean deleted = productService.deleteProduct(createdId);

        assertTrue(deleted);
        assertEquals(0, productService.getAllProducts().size());
        assertNull(productService.getProduct(createdId));
    }

    @Test
    @DisplayName("Mock: Delete product không tồn tại - Trả về false")
    void testDeleteNonExistentProduct() {
        boolean deleted = productService.deleteProduct(999L);
        assertFalse(deleted);
    }

    @Test
    @DisplayName("Mock: Get products with pagination - Kiểm tra phân trang")
    void testGetAllWithPagination() {
        for (int i = 1; i <= 10; i++) {
            Product p = new Product("Product " + i, new BigDecimal(String.valueOf(1000000L * i)), i);
            productService.createProduct(p);
        }

        List<Product> page1 = productService.getAll(1, 5);
        List<Product> page2 = productService.getAll(2, 5);
        List<Product> page3 = productService.getAll(3, 5);

        assertEquals(5, page1.size());
        assertEquals(5, page2.size());
        assertTrue(page3.isEmpty());

        assertEquals("Product 1", page1.get(0).getName());
        assertEquals("Product 6", page2.get(0).getName());
    }

    @Test
    @DisplayName("Mock: Convert Product to ProductDTO thành công")
    void testConvertToDto() {
        Product p = new Product("Vivo X100 Pro", new BigDecimal("24990000"), 12);
        p.setCompany("Vivo");
        p.setDescription("Flagship phone from Vivo");
        p.setId(55);

        ProductDto dto = productService.toDto(p);

        assertNotNull(dto);
        assertEquals(55L, dto.getId());
        assertEquals("Vivo X100 Pro", dto.getName());
        assertEquals(new BigDecimal("24990000"), dto.getPrice());
        assertEquals(12, dto.getQuantity());
        assertEquals("Vivo", dto.getCompany());
    }

    @Test
    @DisplayName("Mock: Convert ProductDTO to Product thành công")
    void testConvertToEntity() {
        ProductDto dto = new ProductDto(
                0,
                "Google Pixel 8 Pro",
                "Google",
                new BigDecimal("25990000"),
                6,
                "AI-powered phone",
                null,
                1,
                null,
                null
        );

        Product entity = productService.toEntity(dto);

        assertNotNull(entity);
        assertEquals("Google Pixel 8 Pro", entity.getName());
        assertEquals(new BigDecimal("25990000"), entity.getPrice());
        assertEquals(6, entity.getQuantity());
        assertEquals("Google", entity.getCompany());
    }
}
