package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "OrderItem", schema = "dbo")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderItemID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID")
    @JsonBackReference
    private OrderHistory orderHistory;


    @Nationalized
    @Column(name = "ProductName", nullable = false, length = 50)
    private String productName;

    @Column(name = "Quantity")
    private Integer quantity;

    @Column(name = "Price", nullable = false, precision = 18, scale = 2)
    private BigDecimal price;

    @Column(name = "Amount", precision = 18, scale = 2)
    private BigDecimal amount;


    @Column(name = "isActive")
    public Boolean isActive;

    @Column(name = "CreateDate")
    private OffsetDateTime createDate;

    @Nationalized
    @Column(name = "CreateBy", length = 50)
    private String createBy;

    @Column(name = "UpdateDate")
    private OffsetDateTime updateDate;

    @Nationalized
    @Column(name = "UpdateBy", length = 50)
    private String updateBy;

}