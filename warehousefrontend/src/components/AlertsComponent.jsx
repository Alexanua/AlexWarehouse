/* src/components/AlertsComponent.jsx */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const AlertsComponent = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/alerts')
            .then((response) => {
                setAlerts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching alerts:', error);
            });
    }, []);

    return (
        <div className="alert-container">
            <h2>Alerts</h2>
            {alerts.length > 0 ? (
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>{alert.message}</li>
                    ))}
                </ul>
            ) : (
                <p>No alerts</p>
            )}
        </div>
    );
};

export default AlertsComponent;
