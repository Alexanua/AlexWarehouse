import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const AlertsComponent = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = () => {
        console.log("Fetching alerts...");
        axios.get('http://localhost:8081/api/alerts/getAllAlerts')
            .then((response) => {
                console.log("Alerts fetched successfully", response.data);
                setAlerts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching alerts:', error);
                setError('Failed to load alerts');
                setLoading(false);
            });
    };

    const markAsRead = (id) => {
        console.log(`Marking alert ${id} as read...`);
        axios.put(`http://localhost:8081/api/alerts/markAsRead/${id}`)
            .then(() => {
                console.log(`Alert ${id} marked as read`);
                setAlerts(alerts.map(alert =>
                    alert.id === id ? { ...alert, isRead: true } : alert
                ));
            })
            .catch((error) => {
                console.error('Error marking alert as read:', error);
                setError('Failed to update alert');
            });
    };

    const clearAlerts = () => {
        console.log("Clearing all alerts...");
        axios.delete('http://localhost:8081/api/alerts/clearAlerts')
            .then(() => {
                console.log("All alerts cleared");
                setAlerts([]);
            })
            .catch((error) => {
                console.error('Error clearing alerts:', error);
                setError('Failed to clear alerts');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="alert-container">
            <h2>Alerts</h2>
            {alerts.length > 0 ? (
                <div>
                    <ul>
                        {alerts.map((alert, index) => (
                            <li key={index}>
                                {alert.message}
                                {!alert.isRead && (
                                    <button onClick={() => markAsRead(alert.id)}>Mark as Read</button>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearAlerts}>Clear All Alerts</button>
                </div>
            ) : (
                <p>No alerts</p>
            )}
        </div>
    );
};

export default AlertsComponent;
