package com.flogin.model;

import java.math.BigDecimal;

public class Product {
    private int id;
    private String name;
    private BigDecimal price;
    private int quantity;
    private String description;
    private String img;
    private String company;
    private int status;

    // Constructor đầy đủ
    public Product(String name, BigDecimal price, int quantity, String description, String img, String company, int status) {
        
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.img = img;
        this.company = company;
        this.status = status;
    }

    // Constructor tiện lợi 3 tham số (dùng test)
    public Product(String name, BigDecimal price, int quantity) {
        this(name, price, quantity, null, null, null,1);
         
    }

    // Constructor mặc định
    public Product() {}

    // Getter & Setter
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
     public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
}
