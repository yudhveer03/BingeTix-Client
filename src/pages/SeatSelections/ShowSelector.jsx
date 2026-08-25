import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SeatSelection.css';
import ShowSelector from './ShowSelector';
import SeatMatrix from './SeatMatrix';
import BookingSummary from './BookingSummary';

const SeatSelection = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // --- STATE MANAGEMENT ---
    const [movie, setMovie] = useState(null);
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    // --- DERIVED DATA & CALCULATIONS ---
    const bookedSeats = selectedShow ? (selectedShow.bookedSeats || []) : [];
    const ticketPrice = selectedShow ? selectedShow.price : 0;
    const subTotal = selectedSeats.length * ticketPrice;
    const convenienceFee = selectedSeats.length > 0 ? 50 : 0;
    const totalAmount = subTotal + convenienceFee;

    // --- DATA FETCHING ---
    useEffect(() => {
        if (!id || id === 'undefined') return;

        const fetchSeatData = async () => {
            try {
                const movieResponse = await axios.get(`https://bingetix-server.onrender.com/api/movie/${id}`);
                setMovie(movieResponse.data);

                const showsResponse = await axios.get(`https://bingetix-server.onrender.com/api/movie/${id}/shows`);
                const data = showsResponse.data;
                setShows(Array.isArray(data.show) ? data.show : (Array.isArray(data) ? data : []));
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchSeatData();
    }, [id]);

    // --- ACTION HANDLERS ---
    const handleSeatClick = (seatId) => {
        if (bookedSeats.includes(seatId)) return;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handleProceedToPayment = async () => {
        if (selectedSeats.length === 0 || !selectedShow) return;

        try {
            const orderResponse = await axios.post("https://bingetix-server.onrender.com/api/booking/create-order", {
                totalAmount: totalAmount
            });

            const { order, key_id } = orderResponse.data;

            const options = {
                key: key_id,
                amount: order.amount,
                currency: order.currency,
                name: "BingeTix Tickets",
                description: `Booking for ${movie.title}`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            movieId: movie._id,
                            showId: selectedShow._id,
                            seats: selectedSeats,
                            totalAmount: totalAmount
                        };

                        const verifyResponse = await axios.post("https://bingetix-server.onrender.com/api/booking/verify-payment", verifyData);
                        navigate(`/booking-success/${verifyResponse.data.booking._id}`);
                    } catch (error) {
                        console.error("Payment Verification Failed:", error);
                        alert("Payment Verification Failed! Security check failed.");
                    }
                },
                prefill: {
                    name: "Movie Fan",
                    email: "user@BingeTix.com",
                    contact: "9999999999"
                },
                theme: { color: "#ef4444" }
            };

            const razorpayWindow = new window.Razorpay(options);
            razorpayWindow.open();

        } catch (err) {
            console.error("Error creating payment order:", err);
            alert("Could not initiate payment. Server error.");
        }
    };

    // 
    if (movie === null) return <h2 className="loading-text">Loading...</h2>;

    return (
        <div className="seat-selection-container">
            {/* Shared Header */}
            <div className="seat-header">
                <h2>{movie.title}</h2>
                {selectedShow && (
                    <p className="show-info-text">
                        {selectedShow.theatre} | {selectedShow.date} | {selectedShow.time}
                    </p>
                )}
            </div>

            {/* Conditional UI Routing */}
            {!selectedShow ? (
                // 2. ShowSelector
                <ShowSelector
                    shows={shows}
                    onSelectShow={(show) => setSelectedShow(show)}
                />
            ) : (
                <div>
                    <button
                        className="btn-change-show"
                        onClick={() => { setSelectedShow(null); setSelectedSeats([]); }}
                    >
                        ← Change Show
                    </button>

                    <div className="seat-booking-wrapper">
                        {/* Render the Seat Matrix */}
                        <SeatMatrix
                            bookedSeats={bookedSeats}
                            selectedSeats={selectedSeats}
                            onSeatClick={handleSeatClick}
                        />

                        {/* Render the Booking Summary */}
                        <BookingSummary
                            movieTitle={movie.title}
                            theatre={selectedShow.theatre}
                            date={selectedShow.date}
                            time={selectedShow.time}
                            selectedSeats={selectedSeats}
                            ticketPrice={ticketPrice}
                            subTotal={subTotal}
                            convenienceFee={convenienceFee}
                            totalAmount={totalAmount}
                            onProceedToPayment={handleProceedToPayment}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatSelection;