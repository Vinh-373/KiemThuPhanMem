package com.flogin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Collections;
import org.springframework.stereotype.Service; 


import com.flogin.model.Product;
import com.flogin.dto.ProductDto;

@Service //Spring quản lý
public class ProductService {

    private final List<Product> products = new ArrayList<>();
    private long idCounter = 1;

    // CREATE
    public Product createProduct(Product product) {
        product.setId(idCounter++);
        products.add(product);
        return product;
    }

    // GET
    public Product getProduct(long id) {
        return products.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null);
    }

    // UPDATE
    public Product updateProduct(long id, Product updated) {
        Product existing = getProduct(id);
        if (existing == null) return null;

        existing.setName(updated.getName());
        existing.setPrice(updated.getPrice());
        existing.setQuantity(updated.getQuantity());
        existing.setDescription(updated.getDescription());
        existing.setImg(updated.getImg());
        existing.setCompany(updated.getCompany());
        return existing;
    }

    // DELETE
    public boolean deleteProduct(long id) {
        return products.removeIf(p -> p.getId() == id);
    }

    // GET ALL with pagination
    public List<Product> getAll(int page, int limit) {
        int start = (page - 1) * limit;
        int end = Math.min(start + limit, products.size());
        if (start >= products.size()) return new ArrayList<>();
        return new ArrayList<>(products.subList(start, end));
    }

    public List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }

    public List<Product> getProductsByCompany(String company) {
        return products.stream()
                .filter(p -> company.equals(p.getCompany()))
                .collect(Collectors.toList());
    }

    // RESET
    public void reset() {
        products.clear();
        idCounter = 1;
    }

    // CONVERT Product -> ProductDto
    public ProductDto toDto(Product p) {
        if (p == null) return null;
        return new ProductDto(
                p.getId(),
                p.getName(),
                p.getPrice(),
                p.getQuantity(),
                p.getDescription(),
                p.getImg(),
                p.getCompany()
        );
    }

    // CONVERT ProductDto -> Product
    public Product toEntity(ProductDto dto) {
        if (dto == null) return null;
        Product p = new Product(
                dto.getName(),
                dto.getPrice(),
                dto.getQuantity(),
                dto.getDescription(),
                dto.getImg(),
                dto.getCompany()
        );
        p.setId(dto.getId());
        return p;
    }

    // Convert List<Product> -> List<ProductDto>
    public List<ProductDto> toDtoList(List<Product> list) {
        return list.stream().map(this::toDto).collect(Collectors.toList());
    }
    
    public List<ProductDto> get_AllProduct() {
        // Thực tế sẽ gọi Repository
        return Collections.emptyList();
    }
    
    public ProductDto get_ProductById(Long id) {
        // Thực tế sẽ gọi Repository
        return null; 
    }
    
    public ProductDto create_Product(ProductDto productDto) {
        // Thực tế sẽ gọi Repository và lưu vào DB
        productDto.setId(System.currentTimeMillis()); // Giả định Id
        return productDto;
    }
    
    public ProductDto update_Product(Long id, ProductDto productDto) {
        // Thực tế sẽ gọi Repository và cập nhật
        productDto.setId(id);
        return productDto;
    }
    
    public void delete_Product(Long id) {
        // Thực tế sẽ gọi Repository và xóa
        System.out.println("Product " + id + " deleted.");
    }
}

// // File: backend/src/main/java/com/flogin/service/ProductService.java
// package com.flogin.service;

// import com.flogin.dto.ProductDto;
// import org.springframework.stereotype.Service;

// import java.util.Collections;
// import java.util.List;

// // Giả định một Service (chỉ là skeleton)
// @Service
// public class ProductService {
    
//     // Các hàm này sẽ được Mock trong ProductControllerIntegrationTest
    
//     public List<ProductDto> getAllProducts() {
//         // Thực tế sẽ gọi Repository
//         return Collections.emptyList();
//     }
    
//     public ProductDto getProductById(Long id) {
//         // Thực tế sẽ gọi Repository
//         return null; 
//     }
    
//     public ProductDto createProduct(ProductDto productDto) {
//         // Thực tế sẽ gọi Repository và lưu vào DB
//         productDto.setId(System.currentTimeMillis()); // Giả định Id
//         return productDto;
//     }
    
//     public ProductDto updateProduct(Long id, ProductDto productDto) {
//         // Thực tế sẽ gọi Repository và cập nhật
//         productDto.setId(id);
//         return productDto;
//     }
    
//     public void deleteProduct(Long id) {
//         // Thực tế sẽ gọi Repository và xóa
//         System.out.println("Product " + id + " deleted.");
//     }
// }