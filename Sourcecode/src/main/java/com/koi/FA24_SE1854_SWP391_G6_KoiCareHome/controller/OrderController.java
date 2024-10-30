package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.CreateOrderDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.OrderHistory;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
//@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addOrder(@RequestBody CreateOrderDTO createOrderDTO) {
        try {
            orderService.addOrder(createOrderDTO);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Add success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Add failed");
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    @PutMapping("/update/{orderId}")
    public ResponseEntity<Map<String, String>> updateOrder(@PathVariable Integer orderId, @RequestBody CreateOrderDTO createOrderDTO) {
        try {
            orderService.updateOrder(orderId, createOrderDTO);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Update success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Update failed");
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<Map<String, String>> deleteOrder(@PathVariable Integer orderId) {
        try {
            orderService.deleteOrder(orderId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Delete success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Delete failed");
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    // Method to get all orders by memberId

    @GetMapping("/{memberId}")
    public ResponseEntity<List<CreateOrderDTO>> getOrdersByMemberId(@PathVariable Integer memberId) {
        try {
            List<CreateOrderDTO> orders = orderService.getOrdersByMemberId(memberId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }
}
