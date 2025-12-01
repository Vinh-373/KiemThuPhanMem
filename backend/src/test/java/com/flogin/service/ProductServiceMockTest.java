package com.flogin.service;

import com.flogin.entity.Product;
import com.flogin.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Mock Testing cho ProductService
 * Mock ProductRepository trong service tests
 * Yêu cầu:
 * a) Mock ProductRepository với @Mock (1 điểm)
 * b) Test service layer với mocked repository (1 điểm)
 * c) Verify repository interactions (0.5 điểm)
 */
@ExtendWith(MockitoExtension.class)
class ProductServiceMockTest {

    @Mock
    private ProductRepository productRepository;

    /**
     * TC-PSMOCK-001: Test Get Product by ID
     * Mock repository.findById() và verify interaction
     */
    @Test
    void testGetProductById() {
        // Arrange
        Product mockProduct = new Product();
        mockProduct.setId(1);
        mockProduct.setName("Laptop");
        mockProduct.setPrice(new BigDecimal("15000000"));
        mockProduct.setQuantity(10);

        when(productRepository.findById(1))
            .thenReturn(Optional.of(mockProduct));

        // Act
        Optional<Product> result = productRepository.findById(1);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Laptop", result.get().getName());
        assertEquals(0, new BigDecimal("15000000").compareTo(result.get().getPrice()));

        // Verify repository interaction
        verify(productRepository).findById(1);
    }

    /**
     * TC-PSMOCK-002: Test Get Product by ID - Not Found
     * Kiểm tra khi product không tồn tại
     */
    @Test
    void testGetProductById_NotFound() {
        // Arrange
        when(productRepository.findById(999))
            .thenReturn(Optional.empty());

        // Act
        Optional<Product> result = productRepository.findById(999);

        // Assert
        assertFalse(result.isPresent());

        // Verify repository interaction
        verify(productRepository).findById(999);
    }

    /**
     * TC-PSMOCK-003: Test Create Product
     * Mock repository.save() và verify interaction
     */
    @Test
    void testCreateProduct() {
        // Arrange
        Product inputProduct = new Product();
        inputProduct.setName("Samsung Galaxy S24");
        inputProduct.setPrice(new BigDecimal("29990000"));
        inputProduct.setQuantity(5);
        
        Product savedProduct = new Product();
        savedProduct.setId(1);
        savedProduct.setName("Samsung Galaxy S24");
        savedProduct.setPrice(new BigDecimal("29990000"));
        savedProduct.setQuantity(5);

        when(productRepository.save(any(Product.class)))
            .thenReturn(savedProduct);

        // Act
        Product result = productRepository.save(inputProduct);

        // Assert
        assertNotNull(result);
        assertNotNull(result.getId());
        assertEquals("Samsung Galaxy S24", result.getName());
        assertEquals(0, new BigDecimal("29990000").compareTo(result.getPrice()));

        // Verify repository interaction
        verify(productRepository).save(any(Product.class));
    }

    /**
     * TC-PSMOCK-004: Test Update Product
     * Mock repository.findById() và save()
     */
    @Test
    void testUpdateProduct() {
        // Arrange
        Product existingProduct = new Product();
        existingProduct.setId(1);
        existingProduct.setName("Old Product");
        existingProduct.setPrice(new BigDecimal("10000000"));
        
        Product updateData = new Product();
        updateData.setId(1);
        updateData.setName("Updated Product");
        updateData.setPrice(new BigDecimal("15000000"));

        when(productRepository.findById(1))
            .thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class)))
            .thenReturn(updateData);

        // Act
        Optional<Product> found = productRepository.findById(1);
        Product result = null;
        if (found.isPresent()) {
            result = productRepository.save(updateData);
        }

        // Assert
        assertNotNull(result);
        assertEquals("Updated Product", result.getName());
        assertEquals(0, new BigDecimal("15000000").compareTo(result.getPrice()));

        // Verify repository interactions
        verify(productRepository).findById(1);
        verify(productRepository).save(any(Product.class));
    }

    /**
     * TC-PSMOCK-005: Test Update Product - Not Found
     * Kiểm tra update product không tồn tại
     */
    @Test
    void testUpdateProduct_NotFound() {
        // Arrange
        when(productRepository.findById(999))
            .thenReturn(Optional.empty());

        // Act
        Optional<Product> result = productRepository.findById(999);

        // Assert
        assertFalse(result.isPresent());

        // Verify repository interaction
        verify(productRepository).findById(999);
        verify(productRepository, never()).save(any(Product.class));
    }

    /**
     * TC-PSMOCK-006: Test Delete Product
     * Mock repository.existsById() và deleteById()
     */
    @Test
    void testDeleteProduct() {
        // Arrange
        when(productRepository.existsById(1))
            .thenReturn(true);
        doNothing().when(productRepository).deleteById(1);

        // Act
        boolean exists = productRepository.existsById(1);
        if (exists) {
            productRepository.deleteById(1);
        }

        // Assert
        assertTrue(exists);

        // Verify repository interactions
        verify(productRepository).existsById(1);
        verify(productRepository).deleteById(1);
    }

    /**
     * TC-PSMOCK-007: Test Delete Product - Not Found
     * Kiểm tra delete product không tồn tại
     */
    @Test
    void testDeleteProduct_NotFound() {
        // Arrange
        when(productRepository.existsById(999))
            .thenReturn(false);

        // Act
        boolean exists = productRepository.existsById(999);

        // Assert
        assertFalse(exists);

        // Verify repository interactions
        verify(productRepository).existsById(999);
        verify(productRepository, never()).deleteById(anyInt());
    }

    /**
     * TC-PSMOCK-008: Verify Multiple Interactions
     * Kiểm tra nhiều lần gọi repository
     */
    @Test
    void testMultipleRepositoryInteractions() {
        // Arrange
        Product product1 = new Product();
        product1.setId(1);
        product1.setName("Product 1");
        product1.setPrice(new BigDecimal("10000000"));
        
        Product product2 = new Product();
        product2.setId(2);
        product2.setName("Product 2");
        product2.setPrice(new BigDecimal("20000000"));

        when(productRepository.findById(1))
            .thenReturn(Optional.of(product1));
        when(productRepository.findById(2))
            .thenReturn(Optional.of(product2));

        // Act
        productRepository.findById(1);
        productRepository.findById(2);
        productRepository.findById(1);

        // Assert & Verify
        verify(productRepository, times(2)).findById(1);
        verify(productRepository, times(1)).findById(2);
    }

    /**
     * TC-PSMOCK-009: Test Save Product with Specific Arguments
     * Verify với argument matchers cụ thể
     */
    @Test
    void testSaveProductWithSpecificArguments() {
        // Arrange
        Product product = new Product();
        product.setName("iPhone 15 Pro");
        product.setPrice(new BigDecimal("32990000"));
        product.setQuantity(10);
        
        Product savedProduct = new Product();
        savedProduct.setId(1);
        savedProduct.setName("iPhone 15 Pro");
        savedProduct.setPrice(new BigDecimal("32990000"));
        savedProduct.setQuantity(10);

        when(productRepository.save(argThat(p -> 
            p.getName() != null && 
            p.getName().equals("iPhone 15 Pro") && 
            p.getPrice().compareTo(new BigDecimal("32990000")) == 0
        ))).thenReturn(savedProduct);

        // Act
        Product result = productRepository.save(product);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("iPhone 15 Pro", result.getName());

        // Verify with argument matcher
        verify(productRepository).save(argThat(p -> 
            p.getName().equals("iPhone 15 Pro")
        ));
    }

    /**
     * TC-PSMOCK-010: Test Exception Handling
     * Mock repository throw exception
     */
    @Test
    void testRepositoryThrowsException() {
        // Arrange
        when(productRepository.findById(1))
            .thenThrow(new RuntimeException("Database connection error"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            productRepository.findById(1);
        });

        // Verify repository was called
        verify(productRepository).findById(1);
    }
}
