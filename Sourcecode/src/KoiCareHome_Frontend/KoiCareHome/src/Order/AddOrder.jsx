import React, { useState, useEffect } from 'react';
import './AddOrder.css'; // Assuming you're using a CSS file for consistent styling

function AddOrder() {
    const [order, setOrder] = useState({
        memberId: '',  // Hidden from input, filled automatically
        orderDate: '',
        subAmount: '',
        vat: '',
        orderItems: [
            { productName: '', quantity: '', price: '', amount: '' }
        ]
    });

    const [errors, setErrors] = useState({}); // To hold error messages for validation

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID) {
            setOrder(prevState => ({
                ...prevState,
                memberId: userID
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...order.orderItems];
        items[index][name] = value;
        setOrder({ ...order, orderItems: items });
    };

    const addItem = () => {
        setOrder({
            ...order,
            orderItems: [...order.orderItems, { productName: '', quantity: '', price: '', amount: '' }]
        });
    };

    const deleteItem = (index) => {
        const items = [...order.orderItems];
        items.splice(index, 1);
        setOrder({ ...order, orderItems: items });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({});

        try {
            const response = await fetch('http://localhost:8080/orders/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message || 'Order added successfully');
                setOrder({
                    memberId: localStorage.getItem('userID') || '',
                    orderDate: '',
                    subAmount: '',
                    vat: '',
                    orderItems: [{ productName: '', quantity: '', price: '', amount: '' }]
                });
            } else {
                // Handle validation error messages from backend
                setErrors(result);
            }
        } catch (error) {
            console.error('Error adding order:', error);
            alert('Error adding order');
        }
    };

    return (
        <div className="add-order-container">
            <h1 className="form-header">ADD NEW ORDER</h1>
            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                    <label>Order Date:</label>
                    <input
                        type="date"
                        name="orderDate"
                        value={order.orderDate}
                        onChange={handleChange}
                        required
                    />
                    {errors.orderDate && <div className="error-message">{errors.orderDate}</div>}
                </div>
                <div className="form-group">
                    <label>Sub Amount:</label>
                    <input
                        type="number"
                        name="subAmount"
                        value={order.subAmount}
                        onChange={handleChange}
                        required
                    />
                    {errors.subAmount && <div className="error-message">{errors.subAmount}</div>}
                </div>
                <div className="form-group">
                    <label>VAT (%):</label>
                    <input
                        type="number"
                        name="vat"
                        value={order.vat}
                        onChange={handleChange}
                        required
                    />
                    {errors.vat && <div className="error-message">{errors.vat}</div>}
                </div>

                <h3 className="item-header">ORDER ITEMS</h3>
                {order.orderItems.map((item, index) => (
                    <div key={index} className="order-item-group">
                        <div className="form-group">
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="productName"
                                value={item.productName}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            {errors[`orderItems[${index}].productName`] && (
                                <div className="error-message">{errors[`orderItems[${index}].productName`]}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            {errors[`orderItems[${index}].quantity`] && (
                                <div className="error-message">{errors[`orderItems[${index}].quantity`]}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            {errors[`orderItems[${index}].price`] && (
                                <div className="error-message">{errors[`orderItems[${index}].price`]}</div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => deleteItem(index)}
                            className="delete-item-button"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                <div className="button-container">
                    <button type="button" onClick={addItem} className="add-item-button">Add Item</button>
                    <button type="submit" className="submit-button">Submit Order</button>
                </div>
            </form>
        </div>
    );
}

export default AddOrder;
