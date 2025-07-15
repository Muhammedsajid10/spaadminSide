import React, { useEffect, useState } from 'react';
import './Todayandbody.css';
import api from '../Service/Api';

const AppointmentsRedesign = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Admin endpoint for all bookings
                const res = await api.get('/bookings/admin/all');
                setAppointments(res.data.data.bookings || []);
            } catch (err) {
                console.error('Error fetching appointments:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    // Helper: Format date and time
    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
    };
    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    };

    // Today's date string for filtering
    const todayStr = new Date().toISOString().slice(0, 10);

    // Filter for today's next appointments
    const todaysAppointments = appointments.filter(app =>
        app.appointmentDate && app.appointmentDate.slice(0, 10) === todayStr
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className='appointments-layout'>
            <div className="appointments-left-section">
                <div className="activity-container">
                    <h2>Appointments Activity</h2>
                    <div className="activity-scroll-wrapper">
                        <div className="activity-list">
                            {appointments.map((app, index) => (
                                <div key={app._id || index} className="activity-card">
                                    <div className="activity-date">{formatDate(app.appointmentDate)}</div>
                                    <div className="activity-details">
                                        <div className="activity-time-status">
                                            <span className="activity-time">{formatTime(app.appointmentDate)}</span>
                                            <span className={`activity-status ${app.status?.toLowerCase()}`}>{app.status}</span>
                                        </div>
                                        <div className="activity-title">{app.services?.[0]?.service?.name || 'Service'}</div>
                                        <div className="activity-type">
                                            {app.services?.[0]?.employee?.user?.firstName ? `${app.services[0].employee.user.firstName} ${app.services[0].employee.user.lastName}` : 'Employee'}
                                        </div>
                                        {app.paymentMethod && <div className="activity-payment">{app.paymentMethod}</div>}
                                    </div>
                                    <div className="activity-price">AED {app.finalAmount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="appointments-right-section">
                <div>
                    <h3 className="next-appointment-heading">Today's Next Appointments</h3>
                </div>
                <div className="next-appointment-container">
                    {todaysAppointments.length === 0 && <div>No appointments today.</div>}
                    {todaysAppointments.map((app, idx) => (
                        <div className='next-appointment-box' key={app._id || idx}>
                            <div className="next-date-box">
                                <div className="next-date">{new Date(app.appointmentDate).getDate()}</div>
                                <div className="next-month">{new Date(app.appointmentDate).toLocaleString('default', { month: 'short' })}</div>
                            </div>
                            <div className="next-details">
                                <div className="next-time-status">
                                    <span className="next-time">{formatTime(app.appointmentDate)}</span>
                                    <span className="next-status">{app.status}</span>
                                </div>
                                <div className="next-title">{app.services?.[0]?.service?.name || 'Service'}</div>
                                <div className="next-info">{app.services?.[0]?.employee?.user?.firstName ? `${app.services[0].employee.user.firstName} ${app.services[0].employee.user.lastName}` : 'Employee'}</div>
                                <div className="next-location">{app.location || ''}</div>
                            </div>
                            <div className="next-price">AED {app.finalAmount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppointmentsRedesign;
