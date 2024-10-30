package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CreateOrderDTO {
    private Integer id;
    private Integer memberId;               // ID of the member placing the order
    private Date orderDate;              // Order date
    private BigDecimal subAmount;           // Subtotal
    private BigDecimal vat;                     // VAT percentage
    private BigDecimal vatAmount;           // VAT Amount
    private BigDecimal totalAmount;         // Total amount
    private List<OrderItemDTO> orderItems;  // List of order items


    @Getter
    @Setter
    public static class OrderItemDTO {
        private Integer id;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal amount;
    }
}