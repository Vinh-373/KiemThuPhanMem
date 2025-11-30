// package com.flogin.controller; // Thay đổi package name cho phù hợp với Service của bạn

// import com.flogin.dto.ProductDto;
// import com.flogin.service.ProductService;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;

// @RestController
// @RequestMapping("/api/products")
// public class ProductController {

//     private final ProductService productService;

//     public ProductController(ProductService productService) {
//         this.productService = productService;
//     }

//     // a) POST /api/products (Create)
//     @PostMapping
//     public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
//         // Sử dụng create_Product
//         ProductDto createdProduct = productService.create_Product(productDto); 
//         return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
//     }

//     // b) GET /api/products (Read all)
//     @GetMapping
//     public ResponseEntity<List<ProductDto>> getAllProducts() {
//         // Sử dụng get_AllProduct
//         List<ProductDto> products = productService.get_AllProduct(); 
//         return ResponseEntity.ok(products);
//     }

//     // c) GET /api/products/{id} (Read one)
//     @GetMapping("/{id}")
//     public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
//         // Sử dụng get_ProductById
//         ProductDto product = productService.get_ProductById(id); 
//         return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
//     }

//     // d) PUT /api/products/{id} (Update)
//     @PutMapping("/{id}")
//     public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
//         // Sử dụng update_Product
//         ProductDto updatedProduct = productService.update_Product(id, productDto);

//         // Giả định: Nếu update_Product trả về null/hoặc có lỗi thì coi là 404 (tùy thuộc vào logic Service)
//         // Hiện tại, Service giả định của bạn luôn trả về DTO với ID, nên chúng ta sẽ giả định thành công.
//         // Tuy nhiên, trong môi trường thực, cần xử lý lỗi Not Found. Ở đây ta giả định thành công cho test pass.
//         if (updatedProduct == null) {
//              return ResponseEntity.notFound().build(); 
//         }
//         return ResponseEntity.ok(updatedProduct);
//     }

//     // e) DELETE /api/products/{id} (Delete)
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
//         // Sử dụng delete_Product
//         productService.delete_Product(id); 
//         return ResponseEntity.noContent().build();
//     }
// }
package com.flogin.controller;

import com.flogin.dto.ProductDto;
import com.flogin.entity.Product;
import com.flogin.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {


    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET /api/products - Lấy tất cả sản phẩm
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = products.stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(productDtos);
    }

    // GET /api/products/{id} - Lấy sản phẩm theo ID
    @GetMapping("/{id}")

    public ResponseEntity<ProductDto> getProductById(@PathVariable Integer id) {
        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new ProductDto(product));
    }

    // POST /api/products - Tạo sản phẩm mới
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setCompany(productDto.getCompany());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());
        product.setDescription(productDto.getDescription());
        product.setImg(productDto.getImg());
        product.setStatus((int) 1);
        product.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        Product savedProduct = productRepository.save(product);
        return new ResponseEntity<>(new ProductDto(savedProduct), HttpStatus.CREATED);
    }

    // PUT /api/products/{id} - Cập nhật sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Integer id, @RequestBody ProductDto productDto) {
        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        if (productDto.getName() != null) {
            product.setName(productDto.getName());
        }
        if (productDto.getCompany() != null) {
            product.setCompany(productDto.getCompany());
        }
        if (productDto.getPrice() != null) {
            product.setPrice(productDto.getPrice());
        }
        if (productDto.getQuantity() >= 0) {
            product.setQuantity(productDto.getQuantity());
        }
        if (productDto.getDescription() != null) {
            product.setDescription(productDto.getDescription());
        }
        if (productDto.getImg() != null) {
            product.setImg(productDto.getImg());
        }
        if (productDto.getStatus() == 1 || productDto.getStatus() == 0) {
            product.setStatus(productDto.getStatus());
        }

        product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok(new ProductDto(updatedProduct));
    }

    // DELETE /api/products/{id} - Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    
}