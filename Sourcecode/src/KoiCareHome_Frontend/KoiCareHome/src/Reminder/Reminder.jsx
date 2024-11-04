/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reminder.css';

const Reminder = () => {
    // State lưu trữ danh sách các reminder
    const [reminders, setReminders] = useState([]);

    // State lưu lịch sử thông báo
    const [notificationHistory, setNotificationHistory] = useState(
        JSON.parse(localStorage.getItem('notificationHistory')) || []
    );

    // State cho reminder mới cần thêm
    const [newReminder, setNewReminder] = useState({
        title: '',
        dateTime: '',
        frequency: ''
    });

    // State để xác định có đang chỉnh sửa reminder không
    const [isEditing, setIsEditing] = useState(false);

    // Lưu ID của reminder đang chỉnh sửa
    const [editingId, setEditingId] = useState(null);

    // Lấy memberID từ localStorage
    const memberID = parseInt(localStorage.getItem('userID'), 10);

    // Yêu cầu quyền thông báo từ người dùng nếu chưa được cấp phép
    const requestNotificationPermission = async () => {
        if (Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    };

    // Hiển thị thông báo nếu quyền đã được cấp
    const showNotification = (title, message) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body: message });
        }
    };

    // useEffect để kiểm tra và thông báo các reminder đã đến giờ
    useEffect(() => {
        requestNotificationPermission();
        const interval = setInterval(() => {
            const now = new Date();
            reminders.forEach((reminder) => {
                const reminderTime = new Date(reminder.dateTime);
                // Kiểm tra nếu reminderTime đã đến và chưa thông báo trước đó
                if (reminderTime <= now && reminderTime > new Date(now.getTime() - 60000)) {
                    showNotification(reminder.title, `It's time for your reminder: ${reminder.frequency}`);
                    const newNotification = {
                        title: reminder.title,
                        dateTime: now.toLocaleString(),
                        frequency: reminder.frequency
                    };
                    const updatedHistory = [...notificationHistory, newNotification];
                    setNotificationHistory(updatedHistory);
                    localStorage.setItem('notificationHistory', JSON.stringify(updatedHistory));
                }
            });
        }, 60000); // Kiểm tra mỗi phút

        return () => clearInterval(interval);
    }, [reminders, notificationHistory]);

    // useEffect để lấy danh sách reminders từ API khi component mount
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get(`/api/reminders/user/${memberID}`);
                setReminders(response.data); 
            } catch (error) {
                console.error('Error fetching reminders:', error);
            }
        };

        fetchReminders();
    }, [memberID]);

    // Hàm xử lý thay đổi dữ liệu trong input khi thêm reminder mới
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReminder({ ...newReminder, [name]: value });
    };

    // Hàm thêm reminder mới qua API và cập nhật danh sách reminders
    const addReminder = async () => {
        try {
            const reminderData = { ...newReminder, memberID }; // Thêm memberID vào payload
            const response = await axios.post('/api/reminders/create', reminderData);
            setReminders([...reminders, response.data]);
            setNewReminder({ title: '', dateTime: '', frequency: '' });
        } catch (error) {
            console.error('Error adding reminder:', error);
        }
    };

    // // Hàm cập nhật reminder
    // const updateReminder = async (id, updatedData) => {
    //     try {
    //         const response = await axios.put(`/api/reminders/edit/${id}`, updatedData);
    //         // Cập nhật danh sách reminders sau khi thành công
    //         setReminders(reminders.map((reminder) =>
    //             reminder.id === id ? response.data : reminder
    //         ));
    //     } catch (error) {
    //         console.error('Error updating reminder:', error);
    //     }
    // };

    return (
        <div className="reminder-container">
            <h2>Reminders</h2>
            <div className="three-column-layout">
                {/* Cột 1: Thêm reminder */}
                <div className="column">
                    <h3>Add Reminder</h3>
                    <form className="reminder-form">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={newReminder.title}
                            onChange={handleInputChange}
                            placeholder="Enter reminder title"
                        />
                        <label>Time</label>
                        <input
                            type="datetime-local"
                            name="dateTime"
                            value={newReminder.dateTime}
                            onChange={handleInputChange}
                        />
                        <label>Frequency</label>
                        <select
                            name="frequency"
                            value={newReminder.frequency}
                            onChange={handleInputChange}
                        >
                            <option value="">Select frequency</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Every 2 Weeks</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        <button type="button" onClick={addReminder}>Add Reminder</button>
                    </form>
                </div>

                {/* Cột 2: Danh sách reminder */}
                <div className="column middle-column">
                    <h3>Your Reminders</h3>
                    <table className="reminder-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reminders.map((reminder) => (
                                <tr key={reminder.id}>
                                    <td>{reminder.title}</td>
                                    <td>{new Date(reminder.dateTime).toLocaleString()}</td>
                                    <td>{reminder.frequency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cột 3: Lịch sử thông báo */}
                <div className="column">
                    <h3>Notification History</h3>
                    <table className="reminder-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notificationHistory.map((notification, index) => (
                                <tr key={index}>
                                    <td>{notification.title}</td>
                                    <td>{notification.dateTime}</td>
                                    <td>{notification.frequency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reminder;