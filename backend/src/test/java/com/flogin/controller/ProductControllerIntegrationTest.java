package com.flogin.controller; 

import com.flogin.dto.ProductDto;
import com.flogin.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductControllerTest.class)
@AutoConfigureMockMvc(addFilters = false) // Tắt các bộ lọc MVC khác nếu cần
@WithMockUser(username = "testuser", roles = {"admin"}) // Giả lập người dùng có role ADMIN
@DisplayName("Product API Integration Tests (Using Mocked CRUD)")
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;
    
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final String API_PRODUCTS_URL = "/api/products/test";
    private static final int EXISTING_ID = 1;
    private static final int NON_EXISTENT_ID = 99;

    // a) Test POST /api/products (Create) (1 điểm)
    @Test
    @DisplayName(" POST /api/products - Tạo sản phẩm mới thành công")
    void testCreateProduct() throws Exception {
        // GIVEN
        ProductDto newProductRequest = new ProductDto(0, "Keyboard", "Company", new BigDecimal(800000), 25, "Desc", "img.png",1,null,null);
        // Giả định ID được gán (vì service giả định của bạn gán ID bằng System.currentTimeMillis())
        ProductDto createdProductResponse = new ProductDto(1, "Keyboard", "Company", new BigDecimal(800000), 25, "Desc", "img.png",1,null,null);
        
        // MOCK: Sử dụng create_Product
        when(productService.create_Product(any(ProductDto.class))).thenReturn(createdProductResponse);
        
        String productJson = objectMapper.writeValueAsString(newProductRequest);

        // WHEN & THEN
        mockMvc.perform(post(API_PRODUCTS_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productJson))
                .andExpect(status().isCreated()) 
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Keyboard"));
        
        verify(productService, times(1)).create_Product(any(ProductDto.class));
    }

    // b) Test GET /api/products (Read all) (1 điểm)
    @Test
    @DisplayName(" GET /api/products - Lấy danh sách sản phẩm thành công")
    void testGetAllProducts() throws Exception {
        // GIVEN
        List<ProductDto> products = Arrays.asList(
                new ProductDto(3, "Laptop",null, new BigDecimal(15000000), 10,null, null,1, null, null),
                new ProductDto(4, "Mouse",null, new BigDecimal(200000), 50,null, null,1, null, null)
        );

        // MOCK: Sử dụng get_AllProduct
        when(productService.get_AllProduct()).thenReturn(products);

        // WHEN & THEN
        mockMvc.perform(get(API_PRODUCTS_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Laptop"));
        
        verify(productService, times(1)).get_AllProduct();
    }
    
    @Test
    @DisplayName(" GET /api/products - Trả về danh sách rỗng")
    void testGetAllProducts_EmptyList() throws Exception {
        // MOCK: Sử dụng get_AllProduct
        when(productService.get_AllProduct()).thenReturn(Collections.emptyList());

        // WHEN & THEN
        mockMvc.perform(get(API_PRODUCTS_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
        
        verify(productService, times(1)).get_AllProduct();
    }

    // c) Test GET /api/products/{id} (Read one) (1 điểm)
    @Test
    @DisplayName(" GET /api/products/{id} - Lấy một sản phẩm Tồn tại")
    void testGetProductById_Existing() throws Exception {
        // GIVEN
        ProductDto product = new ProductDto(EXISTING_ID, "Monitor",null, new BigDecimal(5000000), 5, null,null,1, null, null);
        
        // MOCK: Sử dụng get_ProductById
        when(productService.get_ProductById(EXISTING_ID)).thenReturn(product);

        // WHEN & THEN
        mockMvc.perform(get(API_PRODUCTS_URL + "/{id}", EXISTING_ID))
                .andExpect(status().isOk()) 
                .andExpect(jsonPath("$.id").value(EXISTING_ID))
                .andExpect(jsonPath("$.name").value("Monitor"));
        
        verify(productService, times(1)).get_ProductById(EXISTING_ID);
    }
    
    @Test
    @DisplayName(" GET /api/products/{id} - Lấy một sản phẩm KHÔNG tồn tại")
    void testGetProductById_NonExistent() throws Exception {
        // MOCK: Sử dụng get_ProductById (trả về null)
        when(productService.get_ProductById(NON_EXISTENT_ID)).thenReturn(null);

        // WHEN & THEN
        mockMvc.perform(get(API_PRODUCTS_URL + "/{id}", NON_EXISTENT_ID))
                .andExpect(status().isNotFound()); 

        verify(productService, times(1)).get_ProductById(NON_EXISTENT_ID);
    }

    // d) Test PUT /api/products/{id} (Update) (1 điểm)
    @Test
    @DisplayName(" PUT /api/products/{id} - Cập nhật sản phẩm thành công")
    void testUpdateProduct_Existing() throws Exception {
        // GIVEN
        ProductDto updatedDetails = new ProductDto(EXISTING_ID, "Updated Speaker",null, new BigDecimal(3500000), 15, "new desc", "new img",1, null,null);
        
        // MOCK: Sử dụng update_Product
        when(productService.update_Product(eq(EXISTING_ID), any(ProductDto.class))).thenReturn(updatedDetails);
        
        String updateJson = objectMapper.writeValueAsString(updatedDetails);

        // WHEN & THEN
        mockMvc.perform(put(API_PRODUCTS_URL + "/{id}", EXISTING_ID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk()) 
                .andExpect(jsonPath("$.id").value(EXISTING_ID))
                .andExpect(jsonPath("$.name").value("Updated Speaker"));

        verify(productService, times(1)).update_Product(eq(EXISTING_ID), any(ProductDto.class));
    }
    
    // e) Test DELETE /api/products/{id} (Delete) (1 điểm)
    @Test
    @DisplayName(" DELETE /api/products/{id} - Xóa một sản phẩm thành công")
    void testDeleteProduct() throws Exception {
        // MOCK: Sử dụng delete_Product (là void method)
        doNothing().when(productService).delete_Product(EXISTING_ID);

        // WHEN & THEN
        mockMvc.perform(delete(API_PRODUCTS_URL + "/{id}", EXISTING_ID))
                .andExpect(status().isNoContent()); 

        verify(productService, times(1)).delete_Product(EXISTING_ID);
    }
}