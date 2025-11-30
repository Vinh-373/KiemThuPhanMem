// package com.flogin.dto;

// public class ProductDto {
//     private Long id;
//     private String name;
//     private double price;
//     private int quantity;
//     private String description;
//     private String img;
//     private String company;

//     // Constructor đầy đủ
//     public ProductDto(Long id, String name, double price, int quantity, String description, String img, String company) {
//         this.id = id;
//         this.name = name;
//         this.price = price;
//         this.quantity = quantity;
//         this.description = description;
//         this.img = img;
//         this.company = company;
//     }

//     // Constructor mặc định
//     public ProductDto() {}

//     // Getter & Setter
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public double getPrice() { return price; }
//     public void setPrice(double price) { this.price = price; }

//     public int getQuantity() { return quantity; }
//     public void setQuantity(int quantity) { this.quantity = quantity; }

//     public String getDescription() { return description; }
//     public void setDescription(String description) { this.description = description; }

//     public String getImg() { return img; }
//     public void setImg(String img) { this.img = img; }

//     public String getCompany() { return company; }
//     public void setCompany(String company) { this.company = company; }
// }
package com.flogin.dto;

import com.flogin.entity.Product;
import java.math.BigDecimal;
import java.sql.Timestamp;

public class ProductDto {
    private int id;
    private String name;
    private String company;
    private BigDecimal price;
    private int quantity;
    private String description;
    private String img;
    private int status;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    // Constructor đầy đủ
    public ProductDto(int id, String name, String company, BigDecimal price, int quantity, 
                      String description, String img, int status, Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.img = img;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // ✅ Constructor từ Product entity
    public ProductDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.company = product.getCompany();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.description = product.getDescription();
        this.img = product.getImg();
        this.status = product.getStatus();
        this.createdAt = product.getCreatedAt();
        this.updatedAt = product.getUpdatedAt();
    }

    // Constructor mặc định
    public ProductDto() {}

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
}