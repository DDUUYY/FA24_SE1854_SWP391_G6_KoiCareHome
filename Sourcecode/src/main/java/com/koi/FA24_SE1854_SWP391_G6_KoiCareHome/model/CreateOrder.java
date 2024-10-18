package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
public class CreateOrderDTO {
    private Integer memberId;  // ID of the member placing the order
    private Instant orderDate; // Order date
    private BigDecimal subAmount; // Subtotal
    private Double vat; // VAT percentage
    private BigDecimal vatAmount; // VAT Amount
    private BigDecimal totalAmount; // Total amount
    private List<OrderItemDTO> orderItems; // List of order items

    // Nested DTO for OrderItem
    @Getter
    @Setter
    public static class OrderItemDTO {
        private String productName;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal amount;
    }
}