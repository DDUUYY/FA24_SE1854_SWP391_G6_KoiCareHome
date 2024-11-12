/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../assets/HomeButton.png';
import { FaTrashAlt } from 'react-icons/fa'; // Import icon thùng rác
import './Reminder.css';

const Reminder = () => {
    const navigate = useNavigate();
    const [reminders, setReminders] = useState([]);
    const [notificationHistory, setNotificationHistory] = useState(
        JSON.parse(localStorage.getItem('notificationHistory')) || []
    );
    const [newReminder, setNewReminder] = useState({
        title: '',
        dateTime: '',
        frequency: ''
    });
    const memberID = parseInt(localStorage.getItem('userID'), 10);

    const requestNotificationPermission = async () => {
        if (Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    };

    const showNotification = (title, message) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body: message });
        }
    };

    useEffect(() => {
        requestNotificationPermission();
        const interval = setInterval(() => {
            const now = new Date();
            reminders.forEach((reminder) => {
                if (reminder.memberID === memberID) {
                    const reminderTime = new Date(reminder.dateTime);
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
                }
            });
        }, 60000);
        return () => clearInterval(interval);
    }, [reminders, notificationHistory, memberID]);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReminder({ ...newReminder, [name]: value });
    };

    const addReminder = async () => {
        try {
            const reminderData = { ...newReminder, memberID };
            const response = await axios.post('/api/reminders/create', reminderData);
            setReminders([...reminders, response.data]);
            setNewReminder({ title: '', dateTime: '', frequency: '' });
        } catch (error) {
            console.error('Error adding reminder:', error);
        }
    };

    const deleteReminder = async (id) => {
        try {
            await axios.delete(`/api/reminders/delete/${id}`);
            setReminders(reminders.filter((reminder) => reminder.id !== id));
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    const toggleReminderStatus = async (id, currentStatus) => {
        try {
            const updatedReminder = { isActive: !currentStatus };
            await axios.put(`/api/reminders/edit/${id}`, updatedReminder);
            setReminders((prevReminders) =>
                prevReminders.map((reminder) =>
                    reminder.id === id ? { ...reminder, isActive: !currentStatus } : reminder
                )
            );
        } catch (error) {
            console.error('Error updating reminder status:', error);
        }
    };

    const clearNotificationHistory = () => {
        setNotificationHistory([]);
        localStorage.setItem('notificationHistory', JSON.stringify([]));
    };

    return (
        <div className="reminder-container">
            <div className="navbar">
                <img 
                    src={HomeIcon} 
                    alt="Back to Home"  
                    className="home-icon" 
                    onClick={() => navigate('/home')} 
                />
            </div>
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
                                <th>Action</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reminders.map((reminder) => (
                                <tr key={reminder.id}>
                                    <td>{reminder.title}</td>
                                    <td>{new Date(reminder.dateTime).toLocaleString()}</td>
                                    <td>{reminder.frequency}</td>
                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={reminder.isActive}
                                                onChange={() => toggleReminderStatus(reminder.id, reminder.isActive)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteReminder(reminder.id)} className="delete-button">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cột 3: Lịch sử thông báo */}
                <div className="column">
                    <h3>Notification History</h3>
                    <button onClick={clearNotificationHistory} className="clear-history-button">Clear History Log</button>
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
                                .filter((notification) => notification.memberID === memberID)
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
