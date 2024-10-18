package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.CreateOrderDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.OrderHistory;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<OrderHistory> addOrder(@RequestBody CreateOrderDTO createOrderDTO) {
        try {
            OrderHistory newOrder = orderService.addOrder(createOrderDTO);
            return ResponseEntity.ok(newOrder);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }
}
