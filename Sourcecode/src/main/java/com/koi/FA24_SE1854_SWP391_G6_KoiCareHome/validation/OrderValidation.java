package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.validation;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.CreateOrderDTO;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

public class OrderValidation {
    // Kiểm tra dữ liệu Order
    public static Map<String, String> validateOrder(CreateOrderDTO order) {
        Map<String, String> errors = new HashMap<>();

        if (order.getOrderDate() == null) {
            errors.put("orderDate", "Order date is required.");
        }

        if (order.getSubAmount() == null || order.getSubAmount().compareTo(BigDecimal.ZERO) <= 0) {
            errors.put("subAmount", "Sub amount must be greater than zero.");
        }

        if (order.getVat() == null || order.getVat().compareTo(BigDecimal.ZERO) < 0) {
            errors.put("vat", "VAT must be greater than or equal to zero.");
        }


        // Kiểm tra các OrderItems
        for (int i = 0; i < order.getOrderItems().size(); i++) {
            var item = order.getOrderItems().get(i);
            if (item.getProductName() == null || item.getProductName().isEmpty()) {
                errors.put("orderItems[" + i + "].productName", "Product name is required for item " + (i + 1));
            }
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                errors.put("orderItems[" + i + "].quantity", "Quantity must be greater than zero for item " + (i + 1));
            }



            if (item.getPrice() == null || order.getVat().compareTo(BigDecimal.ZERO) < 0) {
                errors.put("orderItems[" + i + "].price", "Price must be greater than zero for item " + (i + 1));
            }
        }

        return errors;
    }}
