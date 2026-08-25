import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Ticket.css';

const TicketSummary = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`https://bingetix-server.onrender.com/api/booking/${bookingId}`);
                setBooking(response.data);
            } catch (err) {
                console.error("Error fetching ticket:", err);
            }
        };
        if (bookingId) fetchBooking();
    }, [bookingId]);

    if (!booking) {
        return <div className="loading-ticket"><h2>Loading Ticket Details...</h2></div>;
    }

    return (
        <div className="ticket-page-container">
            <div className="ticket-card">
                <div className="ticket-header">
                    <span className="success-badge">BOOKING CONFIRMED</span>
                    <h2>{booking.movieId?.title}</h2>
                </div>

                <div className="ticket-body">
                    <div className="ticket-info">
                        <p><strong>Theatre:</strong> {booking.showId?.theatre}</p>
                        <p><strong>Date & Time:</strong> {booking.showId?.date} | {booking.showId?.time}</p>
                        <p><strong>Seats:</strong> <span className="highlight-seats">{booking.seats?.join(', ')}</span></p>
                        <p><strong>Booking ID:</strong> {booking._id}</p>
                        <p><strong>Total Paid:</strong> ₹{booking.totalAmount}</p>
                    </div>

   
                    <div className="qr-code-box">
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${booking._id}`}
                            alt="Ticket QR Code"
                        />
                        <span>Scan at Cinema</span>
                    </div>
                </div>

                <div className="ticket-footer">
                    <Link to="/" className="btn-home">Go To Home</Link>
                </div>
            </div>
        </div>
    );
};

export default TicketSummary;