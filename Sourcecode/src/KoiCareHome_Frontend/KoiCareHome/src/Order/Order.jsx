import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';

function Order() {
    const [orders, setOrders] = useState([]);
    const [errors, setErrors] = useState({});
    const userId = localStorage.getItem('userID');
    const navigate = useNavigate();

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
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, [field]: value } : order
        );
        setOrders(updatedOrders);
    };

    const handleItemInputChange = (orderId, itemId, field, value) => {
        const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
                const updatedItems = order.orderItems.map((item) =>
                    item.id === itemId ? { ...item, [field]: value } : item
                );
                return { ...order, orderItems: updatedItems };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    const updateOrder = async (orderId) => {
        const orderToUpdate = orders.find((order) => order.id === orderId);
        setErrors({});
        try {
            const response = await fetch(`http://localhost:8080/orders/update/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderToUpdate),
            });
            const result = await response.json();
            if (response.ok) {
                // const data = await response.json();
                // alert(data.message);
                alert(result.message || 'Order Update successfully');
            } else {
                // const errorData = await response.json();
                // setErrors(errorData.errors || {});
                // alert('Error updating order: ' + (errorData.message || 'Unknown error'));
                setErrors(result);
            }
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Error updating order');
            // console.error('Error updating order:', error);
            // alert('Error updating order: ' + error.message);
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
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
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
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="order-container">
            <h1>Order</h1>
            <div className="order-list">
                {orders.length > 0 ? (
                    orders.map((order, orderIndex) => (
                        <div className="order-card" key={order.id}>
                            <h3>ORDER INFORMATION</h3>
                            <p>Order ID: {order.id}</p>
                            <div>
                                <label>Order Date:</label>
                                <input
                                    type="date"
                                    value={formatDate(order.orderDate)}
                                    onChange={(e) => handleInputChange(order.id, 'orderDate', e.target.value)}
                                />
                                {errors.orderDate && <div className="error-message">{errors.orderDate}</div>}
                            </div>
                            <div>
                                <label>Sub Amount:</label>
                                <input
                                    type="number"
                                    value={order.subAmount}
                                    onChange={(e) => handleInputChange(order.id, 'subAmount', e.target.value)}
                                />
                                {errors.subAmount && <div className="error-message">{errors.subAmount}</div>}

                            </div>
                            <div>
                                <label>VAT:</label>
                                <input
                                    type="number"
                                    value={order.vat}
                                    onChange={(e) => handleInputChange(order.id, 'vat', e.target.value)}
                                />
                                {errors.vat && <div className="error-message">{errors.vat}</div>}

                            </div>
                            <div>
                                <label>VAT Amount:</label>
                                <input type="number" value={order.vatAmount} readOnly />
                            </div>
                            <div>
                                <label>Total Amount:</label>
                                <input type="number" value={order.totalAmount} readOnly />
                            </div>

                            <h4>ORDER ITEMS</h4>
                            {order.orderItems.map((item, index) => (
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
                                        {errors[`orderItems[${index}].productName`] && (
                                            <div className="error-message">{errors[`orderItems[${index}].productName`]}</div>
                                        )}
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
                                        {errors[`orderItems[${index}].quantity`] && (
                                            <div className="error-message">{errors[`orderItems[${index}].quantity`]}</div>
                                        )}
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
                                        {errors[`orderItems[${index}].price`] && (
                                            <div className="error-message">{errors[`orderItems[${index}].price`]}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label>Amount:</label>
                                        <input type="number" value={item.amount || ''} readOnly />
                                    </div>
                                </div>
                            ))}

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
