import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';

function Order() {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userID');
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (userId) {
            fetchOrdersByMemberId(userId);
        }
    }, [userId]);

    const fetchOrdersByMemberId = async (memberId) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/${memberId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleInputChange = (orderId, field, value) => {
        const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
                const updatedOrder = { ...order, [field]: value };

                // Tính toán VATAmount và TotalAmount
                const subAmount = parseFloat(updatedOrder.subAmount) || 0;
                const vatPercentage = parseFloat(updatedOrder.vat) || 0;

                updatedOrder.vatAmount = subAmount * (vatPercentage / 100);
                updatedOrder.totalAmount = subAmount + updatedOrder.vatAmount;

                return updatedOrder;
            }
            return order;
        });

        setOrders(updatedOrders);
    };

    const handleItemInputChange = (orderId, itemId, field, value) => {
        setOrders(
            orders.map((order) =>
                order.id === orderId
                    ? {
                        ...order,
                        orderItems: order.orderItems.map((item) =>
                            item.id === itemId ? { ...item, [field]: value } : item
                        ),
                    }
                    : order
            )
        );
    };

    const updateOrder = async (orderId) => {
        const orderToUpdate = orders.find((order) => order.id === orderId);
        try {
            const response = await fetch(`http://localhost:8080/orders/update/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderToUpdate),
            });
            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/delete/${orderId}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setOrders(orders.filter((order) => order.id !== orderId));
            } else {
                alert(data.message || 'Delete failed');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const formatDate = (dateTimeString) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        return date.toISOString().split("T")[0];
    };

    return (
        <div className="order-container">
            <h1>Order</h1>
            <div className="order-list">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div className="order-card" key={order.id}>
                            <h3>ORDER INFORMATION</h3>
                            <p>Order ID: {order.id}</p>
                            <div>
                                <label>Order Date:</label>
                                <input
                                    type="date"
                                    value={formatDate(order.orderDate)}
                                    onChange={(e) =>
                                        handleInputChange(order.id, 'orderDate', e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label>Sub Amount:</label>
                                <input
                                    type="number"
                                    value={order.subAmount}
                                    onChange={(e) =>
                                        handleInputChange(order.id, 'subAmount', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label>VAT:</label>
                                <input
                                    type="number"
                                    value={order.vat}
                                    onChange={(e) =>
                                        handleInputChange(order.id, 'vat', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label>VAT Amount:</label>
                                <input
                                    type="number"
                                    value={order.vatAmount}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label>Total Amount:</label>
                                <input
                                    type="number"
                                    value={order.totalAmount}
                                    readOnly
                                />
                            </div>

                            <h4>ORDER ITEMS</h4>
                            {order.orderItems.length > 0 ? (
                                order.orderItems.map((item) => (
                                    <div key={item.id} className="order-item-card">
                                        <p>Item ID: {item.id}</p>
                                        <div>
                                            <label>Product Name:</label>
                                            <input
                                                type="text"
                                                value={item.productName}
                                                onChange={(e) =>
                                                    handleItemInputChange(order.id, item.id, 'productName', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label>Quantity:</label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleItemInputChange(order.id, item.id, 'quantity', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label>Price:</label>
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) =>
                                                    handleItemInputChange(order.id, item.id, 'price', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label>Amount:</label>
                                            <input
                                                type="number"
                                                value={item.amount}
                                                onChange={(e) =>
                                                    handleItemInputChange(order.id, item.id, 'amount', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No items in this order.</p>
                            )}

                            <div className="order-buttons">
                                <button onClick={() => updateOrder(order.id)}>Update</button>
                                <button onClick={() => deleteOrder(order.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
            <button className="add-button" onClick={() => navigate('/add-order')}>Add New Order</button>
        </div>
    );
}

export default Order;