package com.flogin.service;

import com.flogin.model.Product;
import com.flogin.dto.ProductDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ProductServiceTest {

    private ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService();
        productService.reset();
    }

    @Test
    @DisplayName("TC1: Test tao san pham thanh cong")
    void testCreateProduct() {
        Product p1 = new Product("Laptop", 1000.0, 5);
        Product created = productService.createProduct(p1);

        assertNotNull(created.getId());
        assertEquals("Laptop", created.getName());
        assertEquals(1000.0, created.getPrice());
        assertEquals(5, created.getQuantity());
    }

    @Test
    @DisplayName("TC2: Test cap nhat san pham thanh cong")
    void testUpdateProduct() {
        Product p1 = new Product("Laptop", 1000.0, 5);
        Product created = productService.createProduct(p1);

        Product updateInfo = new Product("Laptop Pro", 1200.0, 10);
        Product updated = productService.updateProduct(created.getId(), updateInfo);

        assertEquals("Laptop Pro", updated.getName());
        assertEquals(1200.0, updated.getPrice());
        assertEquals(10, updated.getQuantity());
    }
    @Test
    @DisplayName("TC3: Test cap nhat san pham khong thanh cong voi id khong ton tai")
    void testUpdateProductWithIdIsNull() {
        //Product p1 = new Product("Laptop", 1000.0, 5);
        ///Product created = productService.createProduct(p1);
        Product updateInfo = new Product("Laptop Pro", 1200.0, 10);
        Product updated = productService.updateProduct(999L, updateInfo);
        assertNull(updated);
    }
    @Test
    @DisplayName("TC4: Test xoa san pham ")
    void testDeleteProduct() {
        Product p1 = new Product("Laptop", 1000.0, 5);
        Product created = productService.createProduct(p1);

        boolean deleted = productService.deleteProduct(created.getId());
        assertTrue(deleted);

        Product shouldBeNull = productService.getProduct(created.getId());
        assertNull(shouldBeNull);
        
    }

    @Test
    @DisplayName("TC5: Test lay tat ca san pham thanh cong")
    void testGetAllProducts() {
        productService.createProduct(new Product("Laptop", 1000.0, 5));
        productService.createProduct(new Product("Phone", 500.0, 10));

        List<Product> all = productService.getAllProducts();
        assertEquals(2, all.size());
    }
    @Test
    @DisplayName("TC6: Test lay tat ca san pham theo company")
    void testGetALLProductsByCompany() {
        Product p1 = new Product("Laptop", 1000, 5);
        p1.setCompany("CompanyA");
        Product p2 = new Product("Phone", 500, 10);
        p2.setCompany("CompanyB");
        Product p3 = new Product("Tablet", 300, 15);
        p3.setCompany("CompanyA");

        productService.createProduct(p1);
        productService.createProduct(p2);
        productService.createProduct(p3);

        List<Product> companyAProducts = productService.getProductsByCompany("CompanyA");
        assertEquals(2, companyAProducts.size());
    }
    @Test
    @DisplayName("TC7: Test lay tat ca san pham theo company khong ton tai")
    void testGetProductsByCompanyReturnEmpty() {
        Product p1 = new Product("Laptop", 1000, 5);
        p1.setCompany("CompanyA");
        Product p2 = new Product("Phone", 500, 10);
        p2.setCompany("CompanyB");

        productService.createProduct(p1);
        productService.createProduct(p2);

        List<Product> companyCProducts = productService.getProductsByCompany("CompanyC");
        assertTrue(companyCProducts.isEmpty());
    }
    @Test
    @DisplayName("TC8: Test lay san pham chia theo tung trang")
    void testPagination() {
        for (int i = 1; i <= 10; i++) {
            productService.createProduct(new Product("Product" + i, 100 * i, i));
        }

        List<Product> page1 = productService.getAll(1, 5);
        List<Product> page2 = productService.getAll(2, 5);

        assertEquals(5, page1.size());
        assertEquals("Product1", page1.get(0).getName());
        assertEquals(5, page2.size());
        assertEquals("Product6", page2.get(0).getName());
    }
    @Test
    @DisplayName("TC9: Test lay san pham voi so trang vuot qua gioi han")
    void testPaginationExceedLimit() {
        for (int i = 1; i <= 10; i++) {
            productService.createProduct(new Product("Product" + i, 100 * i, i));
        }

        List<Product> page3 = productService.getAll(3, 5);

        assertTrue(page3.isEmpty());
    }

    @Test 
    @DisplayName("TC10: chuyen doi Product sang ProductDto thanh cong")
    void testConvertToDto() {
        Product p1 = new Product("Laptop", 1000.0, 5);
        Product created = productService.createProduct(p1);

        ProductDto dto = productService.toDto(created);

        assertEquals(created.getId(), dto.getId());
        assertEquals(created.getName(), dto.getName());
        assertEquals(created.getPrice(), dto.getPrice());
        assertEquals(created.getQuantity(), dto.getQuantity());
    }
    @Test 
    @DisplayName("TC11: chuyen doi Product sang ProductDto voi Product null")
    void testConvertToDtoWithNull() {
        ProductDto dto = productService.toDto(null);
        assertNull(dto);
    }

    @Test 
    @DisplayName("TC12: chuyen doi ProductDto sang Product thanh cong")
    void testConvertToEntity() {
        ProductDto dto = new ProductDto(null, "Laptop", 1000.0, 5, null, null, null);
        Product entity = productService.toEntity(dto);

        assertEquals(dto.getName(), entity.getName());
        assertEquals(dto.getPrice(), entity.getPrice());
        assertEquals(dto.getQuantity(), entity.getQuantity());
    }
    @Test 
    @DisplayName("TC13: chuyen doi ProductDto sang Product voi ProductDto null")
    void testConvertToEntityWithNull() {
        Product entity = productService.toEntity(null);
        assertNull(entity);
    }

    @Test
    @DisplayName("TC14: chuyen doi List<Product> sang List<ProductDto> thanh cong")
    void testConvertToDtoList() {
        Product p1 = new Product("Laptop", 1000.0, 5);
        Product p2 = new Product("Phone", 500.0, 10);
        productService.createProduct(p1);
        productService.createProduct(p2);

        List<ProductDto> dtoList = productService.toDtoList(productService.getAllProducts());

        assertEquals(2, dtoList.size());
        assertEquals(p1.getName(), dtoList.get(0).getName());
        assertEquals(p2.getName(), dtoList.get(1).getName());
    }
}
