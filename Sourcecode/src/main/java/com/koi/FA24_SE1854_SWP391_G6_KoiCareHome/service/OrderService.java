package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.CreateOrderDTO;
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

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

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

        // Retrieve member from repository
        Member member = memberRepository.findById(createOrderDTO.getMemberId())
                .orElseThrow(() -> new Exception("Member not found"));

        // Create new OrderHistory instance
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setMember(member);
        orderHistory.setOrderDate(createOrderDTO.getOrderDate() != null
                ? createOrderDTO.getOrderDate()
                : java.sql.Date.valueOf(LocalDate.now()));

        // Set SubAmount and VAT from CreateOrderDTO
        orderHistory.setSubAmount(createOrderDTO.getSubAmount());
        orderHistory.setVat(createOrderDTO.getVat());

        // Calculate VATAmount and TotalAmount
        BigDecimal vatAmount = orderHistory.getSubAmount().multiply(orderHistory.getVat().divide(BigDecimal.valueOf(100)));
        BigDecimal totalAmount = orderHistory.getSubAmount().add(vatAmount);

        orderHistory.setVatAmount(vatAmount);
        orderHistory.setTotalAmount(totalAmount);

        // Set audit fields
        orderHistory.setIsActive(true);  // Active by default
        orderHistory.setCreateDate(Instant.now());
        orderHistory.setCreateBy(member.getFirstName() + " " + member.getLastName());

        // Process OrderItems
        List<OrderItem> orderItems = new ArrayList<>();
        for (CreateOrderDTO.OrderItemDTO itemDTO : createOrderDTO.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderHistory(orderHistory);
            orderItem.setProductName(itemDTO.getProductName());
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setPrice(itemDTO.getPrice());
            orderItem.setAmount(itemDTO.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity()))); // Calculate amount
            orderItem.setIsActive(true);  // Active by default
            orderItem.setCreateDate(OffsetDateTime.now());
            orderItem.setCreateBy(member.getFirstName() + " " + member.getLastName());

            orderItems.add(orderItem);
        }
        orderHistory.setOrderItems(orderItems);

        // Save OrderHistory to the repository
        orderHistory = orderHistoryRepository.save(orderHistory);
        return orderHistory;
    }

    public OrderHistory updateOrder(Integer orderId, CreateOrderDTO createOrderDTO) throws Exception {
        OrderHistory existingOrderHistory = orderHistoryRepository.findById(orderId)
                .orElseThrow(() -> new Exception("Order not found"));

        existingOrderHistory.setOrderDate(createOrderDTO.getOrderDate() != null ? createOrderDTO.getOrderDate() : existingOrderHistory.getOrderDate());
        existingOrderHistory.setSubAmount(createOrderDTO.getSubAmount() != null ? createOrderDTO.getSubAmount() : existingOrderHistory.getSubAmount());
        existingOrderHistory.setVat(createOrderDTO.getVat() != null ? createOrderDTO.getVat() : existingOrderHistory.getVat());

        // Tính toán lại VATAmount và TotalAmount
        BigDecimal subAmount = existingOrderHistory.getSubAmount();
        BigDecimal vatPercentage = existingOrderHistory.getVat().divide(new BigDecimal(100)); // Chia cho 100 để chuyển đổi phần trăm thành số thập phân

        BigDecimal vatAmount = subAmount.multiply(vatPercentage);
        BigDecimal totalAmount = subAmount.add(vatAmount); // Cộng VAT vào SubAmount

        existingOrderHistory.setVatAmount(vatAmount);
        existingOrderHistory.setTotalAmount(totalAmount);

        existingOrderHistory.setUpdateDate(OffsetDateTime.now());
        existingOrderHistory.setUpdateBy(existingOrderHistory.getMember().getFirstName() + " " + existingOrderHistory.getMember().getLastName());

        if (createOrderDTO.getOrderItems() != null) {
            List<OrderItem> existingOrderItems = existingOrderHistory.getOrderItems();
            Map<Integer, OrderItem> existingItemsMap = existingOrderItems.stream()
                    .collect(Collectors.toMap(OrderItem::getId, Function.identity()));

            for (CreateOrderDTO.OrderItemDTO itemDTO : createOrderDTO.getOrderItems()) {
                if (itemDTO.getId() != null && existingItemsMap.containsKey(itemDTO.getId())) {
                    OrderItem existingItem = existingItemsMap.get(itemDTO.getId());
                    existingItem.setProductName(itemDTO.getProductName() != null ? itemDTO.getProductName() : existingItem.getProductName());
                    existingItem.setQuantity(itemDTO.getQuantity() != null ? itemDTO.getQuantity() : existingItem.getQuantity());
                    existingItem.setPrice(itemDTO.getPrice() != null ? itemDTO.getPrice() : existingItem.getPrice());
                    existingItem.setAmount(itemDTO.getAmount() != null ? itemDTO.getAmount() : existingItem.getAmount());
                    existingItem.setUpdateDate(OffsetDateTime.now());
                    existingItem.setUpdateBy(existingOrderHistory.getMember().getFirstName() + " " + existingOrderHistory.getMember().getLastName());
                }
            }
        }

        orderHistoryRepository.save(existingOrderHistory);
        return existingOrderHistory;
    }

    public OrderHistory deleteOrder(Integer orderId) throws Exception {

        OrderHistory existingOrder = orderHistoryRepository.findById(orderId)
                .orElseThrow(() -> new Exception("Order not found"));


        existingOrder.setIsActive(false);
        existingOrder.setUpdateDate(OffsetDateTime.now());


        existingOrder.setUpdateBy(existingOrder.getMember().getFirstName() + " " + existingOrder.getMember().getLastName());


        // Lưu lại trong cơ sở dữ liệu
        return orderHistoryRepository.save(existingOrder);
    }

    public List<CreateOrderDTO> getOrdersByMemberId(Integer memberID) {
        List<OrderHistory> orders = orderHistoryRepository.findByMember_MemberID(memberID);
        return orders.stream()
                .filter(order -> Boolean.TRUE.equals(order.getIsActive())) // Chỉ lấy các đơn hàng đang hoạt động
                .map(order -> {
                    CreateOrderDTO orderDTO = new CreateOrderDTO();
                    orderDTO.setId(order.getId());
                    orderDTO.setMemberId(order.getMember().getMemberID());
                    orderDTO.setOrderDate(order.getOrderDate());
                    orderDTO.setSubAmount(order.getSubAmount());
                    orderDTO.setVat(order.getVat());
                    orderDTO.setVatAmount(order.getVatAmount());
                    orderDTO.setTotalAmount(order.getTotalAmount());

                    List<CreateOrderDTO.OrderItemDTO> orderItems = order.getOrderItems().stream().map(item -> {
                        CreateOrderDTO.OrderItemDTO itemDTO = new CreateOrderDTO.OrderItemDTO();
                        itemDTO.setId(item.getId());
                        itemDTO.setProductName(item.getProductName());
                        itemDTO.setQuantity(item.getQuantity());
                        itemDTO.setPrice(item.getPrice());
                        itemDTO.setAmount(item.getAmount());
                        return itemDTO;
                    }).collect(Collectors.toList());

                    orderDTO.setOrderItems(orderItems);
                    return orderDTO;
                }).collect(Collectors.toList());
    }

    public OrderHistory calculateOrder(OrderHistory order) {
        if (order.getVat() != null && order.getSubAmount() != null) {
            BigDecimal subAmount = order.getSubAmount();
            BigDecimal vatPercentage = order.getVatAmount();

            BigDecimal vatAmount = subAmount.multiply(vatPercentage.divide(BigDecimal.valueOf(100)));
            BigDecimal totalAmount = subAmount.add(vatAmount);

            order.setTotalAmount(totalAmount);
            order.setTotalAmount(totalAmount);
        }
        return order;
    }

}

