package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "OrderHistory", schema = "dbo")
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MemberID", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "orderHistory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(name = "OrderDate", nullable = false)
    private Instant orderDate;

    @Column(name = "SubAmount", precision = 18, scale = 2)
    private BigDecimal subAmount;

    @Column(name = "VAT")
    private Double vat;

    @Column(name = "VATAmount", precision = 18, scale = 2)
    private BigDecimal vatAmount;

    @Column(name = "TotalAmount", nullable = false, precision = 18, scale = 2)
    private BigDecimal totalAmount;


    @Column(name = "isActive")
    private Boolean isActive;

    @Column(name = "CreateDate")
    private Instant createDate;

    @Nationalized
    @Column(name = "CreateBy", length = 50)
    private String createBy;

    @Column(name = "UpdateDate")
    private OffsetDateTime updateDate;

    @Nationalized
    @Column(name = "UpdateBy", length = 50)
    private String updateBy;

}