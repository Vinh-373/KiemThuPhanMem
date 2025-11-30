package com.flogin.controller; 

import com.flogin.dto.ProductDto;
import com.flogin.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/test")
public class ProductControllerTest {

    private final ProductService productService;

    public ProductControllerTest(ProductService productService) {
        this.productService = productService;
    }

    // a) POST /api/products (Create)
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        // Sử dụng create_Product
        ProductDto createdProduct = productService.create_Product(productDto); 
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    // b) GET /api/products (Read all)
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        // Sử dụng get_AllProduct
        List<ProductDto> products = productService.get_AllProduct(); 
        return ResponseEntity.ok(products);
    }

    // c) GET /api/products/{id} (Read one)
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable int id) {
        // Sử dụng get_ProductById
        ProductDto product = productService.get_ProductById(id); 
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    // d) PUT /api/products/{id} (Update)
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable int id, @RequestBody ProductDto productDto) {
        // Sử dụng update_Product
        ProductDto updatedProduct = productService.update_Product(id, productDto);

        // Giả định: Nếu update_Product trả về null/hoặc có lỗi thì coi là 404 (tùy thuộc vào logic Service)
        // Hiện tại, Service giả định của bạn luôn trả về DTO với ID, nên chúng ta sẽ giả định thành công.
        // Tuy nhiên, trong môi trường thực, cần xử lý lỗi Not Found. Ở đây ta giả định thành công cho test pass.
        if (updatedProduct == null) {
             return ResponseEntity.notFound().build(); 
        }
        return ResponseEntity.ok(updatedProduct);
    }

    // e) DELETE /api/products/{id} (Delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        // Sử dụng delete_Product
        productService.delete_Product(id); 
        return ResponseEntity.noContent().build();
    }
}