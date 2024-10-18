package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.CreateOrderDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.OrderHistory;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.OrderItem;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.MemberRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.OrderHistoryRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.OrderItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderHistoryRepository orderHistoryRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private MemberRepository memberRepository;

    public OrderHistory addOrder(CreateOrderDTO createOrderDTO) throws Exception {
        // Fetch member from repository
        Member member = memberRepository.findById(createOrderDTO.getMemberId())
                .orElseThrow(() -> new Exception("Member not found"));

        // Create OrderHistory
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setMember(member);
        orderHistory.setOrderDate(createOrderDTO.getOrderDate() != null ? createOrderDTO.getOrderDate() : Instant.now());
        orderHistory.setSubAmount(createOrderDTO.getSubAmount());
        orderHistory.setVat(createOrderDTO.getVat());
        orderHistory.setVatAmount(createOrderDTO.getVatAmount());
        orderHistory.setTotalAmount(createOrderDTO.getTotalAmount());
        orderHistory.setIsActive(true);  // Active by default
        orderHistory.setCreateDate(Instant.now());
        orderHistory.setCreateBy(member.getFirstName() + " " + member.getLastName());  // Set createdBy using member info

        // Create associated OrderItems
        List<OrderItem> orderItems = new ArrayList<>();
        for (CreateOrderDTO.OrderItemDTO itemDTO : createOrderDTO.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderHistory(orderHistory);  // Link order item to the order history
            orderItem.setProductName(itemDTO.getProductName());
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setPrice(itemDTO.getPrice());
            orderItem.setAmount(itemDTO.getAmount());
            orderItem.setIsActive(true);  // Active by default
            orderItem.setCreateDate(OffsetDateTime.now());
            orderItem.setCreateBy(member.getFirstName() + " " + member.getLastName());

            orderItems.add(orderItem);
        }
        orderHistory.setOrderItems(orderItems);

        // Save OrderHistory and its items
        orderHistory = orderHistoryRepository.save(orderHistory);
//        orderItemRepository.saveAll(orderItems);

        return orderHistory;
    }
}
