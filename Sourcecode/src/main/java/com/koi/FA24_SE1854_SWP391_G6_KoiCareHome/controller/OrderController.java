package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.DatabaseException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NetworkException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.validation.OrderValidation;
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
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Handle calculate amounts logic
    @PostMapping("/calculate")
    public ResponseEntity<OrderHistory> calculateAmounts(@RequestBody OrderHistory order) {
        try {
            OrderHistory calculatedOrder = orderService.calculateOrder(order);
            return ResponseEntity.ok(calculatedOrder);
        } catch (NetworkException ex) {
            throw new NetworkException("Error calculating amounts due to network issue: " + ex.getMessage());
        } catch (DatabaseException ex) {
            throw new DatabaseException("Database error while calculating amounts: " + ex.getMessage());
        } catch (Exception ex) {
            throw new RuntimeException("Unexpected error during calculation: " + ex.getMessage());
        }
    }

    // Handle adding an order
    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addOrder(@RequestBody CreateOrderDTO createOrderDTO) {
        // Validate the input data
        Map<String, String> validationErrors = OrderValidation.validateOrder(createOrderDTO);

        if (!validationErrors.isEmpty()) {
            return ResponseEntity.status(400).body(validationErrors);
        }

        try {
            orderService.addOrder(createOrderDTO);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Add success");
            return ResponseEntity.ok(response);
        } catch (DatabaseException ex) {
            throw new DatabaseException("Database error while adding order: " + ex.getMessage());
        } catch (NetworkException ex) {
            throw new NetworkException("Network error while adding order: " + ex.getMessage());
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Add failed");
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    // Handle updating an order
    @PutMapping("/update/{orderId}")
    public ResponseEntity<?> updateOrder(@PathVariable Integer orderId, @RequestBody CreateOrderDTO createOrderDTO) {
        Map<String, String> validationErrors = OrderValidation.validateOrder(createOrderDTO);

        if (!validationErrors.isEmpty()) {
            return ResponseEntity.status(400).body(validationErrors);
        }

        try {
            orderService.updateOrder(orderId, createOrderDTO);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Update success");
            return ResponseEntity.ok(response);
        } catch (DatabaseException ex) {
            throw new DatabaseException("Database error while updating order: " + ex.getMessage());
        } catch (NetworkException ex) {
            throw new NetworkException("Network error while updating order: " + ex.getMessage());
        } catch (Exception ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Update failed");
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    // Handle deleting an order
    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<Map<String, String>> deleteOrder(@PathVariable Integer orderId) {
        try {
            orderService.deleteOrder(orderId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Delete success");
            return ResponseEntity.ok(response);
        } catch (DatabaseException ex) {
            throw new DatabaseException("Database error while deleting order: " + ex.getMessage());
        } catch (NetworkException ex) {
            throw new NetworkException("Network error while deleting order: " + ex.getMessage());
        } catch (Exception ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Delete failed");
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    // Get all orders by MemberID
    @GetMapping("/{MemberID}")
    public ResponseEntity<List<CreateOrderDTO>> getOrdersByMemberID(@PathVariable Integer MemberID) {
        try {
            List<CreateOrderDTO> orders = orderService.getOrdersByMemberID(MemberID);
            return ResponseEntity.ok(orders);
        } catch (DatabaseException ex) {
            throw new DatabaseException("Database error while fetching orders for member: " + ex.getMessage());
        } catch (NetworkException ex) {
            throw new NetworkException("Network error while fetching orders: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(400).body(null);
        }
    }
}
