/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Reminder.css';

const Reminder = () => {
    const navigate = useNavigate(); // Sử dụng hook điều hướng
    const [reminders, setReminders] = useState([]); // Lưu trữ danh sách reminders
    const [notificationHistory, setNotificationHistory] = useState(
        JSON.parse(localStorage.getItem('notificationHistory')) || [] // Lưu trữ lịch sử thông báo từ localStorage
    );
    const [newReminder, setNewReminder] = useState({
        title: '',
        dateTime: '',
        frequency: ''
    });
    const memberID = parseInt(localStorage.getItem('userID'), 10); // Lấy memberID từ localStorage để xác định tài khoản hiện tại

    // Yêu cầu quyền thông báo từ trình duyệt nếu chưa được cấp phép
    const requestNotificationPermission = async () => {
        if (Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    };

    // Hàm hiển thị thông báo nếu quyền đã được cấp
    const showNotification = (title, message) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body: message });
        }
    };

    // Kiểm tra thời gian của các reminder để hiện thông báo
    useEffect(() => {
        requestNotificationPermission();
        const interval = setInterval(() => {
            const now = new Date(); // Lấy thời gian hiện tại
            reminders.forEach((reminder) => {
                if (reminder.memberID === memberID) { // Chỉ thông báo cho reminders của tài khoản hiện tại
                    const reminderTime = new Date(reminder.dateTime);
                    if (reminderTime <= now && reminderTime > new Date(now.getTime() - 60000)) { // Kiểm tra nếu đến giờ thông báo
                        showNotification(reminder.title, `It's time for your reminder: ${reminder.frequency}`);
                        const newNotification = {
                            title: reminder.title,
                            dateTime: now.toLocaleString(),
                            frequency: reminder.frequency
                        };
                        const updatedHistory = [...notificationHistory, newNotification]; // Cập nhật lịch sử thông báo
                        setNotificationHistory(updatedHistory);
                        localStorage.setItem('notificationHistory', JSON.stringify(updatedHistory)); // Lưu vào localStorage
                    }
                }
            });
        }, 60000); // Kiểm tra mỗi phút

        return () => clearInterval(interval); // Clear interval khi component unmount
    }, [reminders, notificationHistory, memberID]);

    // Fetch danh sách reminders từ API khi component được render lần đầu
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get(`/api/reminders/user/${memberID}`);
                setReminders(response.data); // Lưu danh sách reminders vào state
            } catch (error) {
                console.error('Error fetching reminders:', error);
            }
        };
        fetchReminders();
    }, [memberID]);

    // Cập nhật state khi người dùng nhập vào form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReminder({ ...newReminder, [name]: value });
    };

    // Hàm thêm reminder mới vào danh sách và gửi lên server
    const addReminder = async () => {
        try {
            const reminderData = { ...newReminder, memberID }; // Thêm memberID vào dữ liệu reminder
            const response = await axios.post('/api/reminders/create', reminderData);
            setReminders([...reminders, response.data]); // Cập nhật danh sách reminders sau khi thêm mới
            setNewReminder({ title: '', dateTime: '', frequency: '' }); // Reset form sau khi thêm
        } catch (error) {
            console.error('Error adding reminder:', error);
        }
    };

    // Hàm xóa reminder khỏi danh sách và server
    const deleteReminder = async (id) => {
        try {
            await axios.delete(`/api/reminders/delete/${id}`);
            setReminders(reminders.filter((reminder) => reminder.id !== id)); // Cập nhật danh sách sau khi xóa
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    // Hàm xóa toàn bộ lịch sử thông báo của tài khoản hiện tại
    const clearNotificationHistory = () => {
        setNotificationHistory([]); // Xóa trong state
        localStorage.setItem('notificationHistory', JSON.stringify([])); // Xóa trong localStorage
    };

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
                    {/* Nút quay về trang Home */}
                    <button className="back-button" onClick={() => navigate('/home')}>Back to Home</button>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reminders.map((reminder) => (
                                <tr key={reminder.id}>
                                    <td>{reminder.title}</td>
                                    <td>{new Date(reminder.dateTime).toLocaleString()}</td>
                                    <td>{reminder.frequency}</td>
                                    <td>
                                        <button onClick={() => deleteReminder(reminder.id)}>Delete</button> {/* Nút xóa reminder */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cột 3: Lịch sử thông báo */}
                <div className="column">
                    <h3>Notification History</h3>
                    <button onClick={clearNotificationHistory} className="clear-history-button">Clear History Log</button> {/* Nút xóa lịch sử */}
                    <table className="reminder-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notificationHistory
                                .filter((notification) => notification.memberID === memberID) // Chỉ hiển thị log của tài khoản hiện tại
                                .map((notification, index) => (
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
