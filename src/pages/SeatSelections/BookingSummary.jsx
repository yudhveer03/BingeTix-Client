import React from 'react';

const BookingSummary = ({
    movieTitle,
    theatre,
    date,
    time,
    selectedSeats,
    ticketPrice,
    subTotal,
    convenienceFee,
    totalAmount,
    onProceedToPayment
}) => {
    return (
        <div className="summary-card">
            <h3>Booking Summary</h3>
            <div className="summary-details">
                <p><strong>Movie:</strong> {movieTitle}</p>
                <p><strong>Theatre:</strong> {theatre}</p>
                <p><strong>Showtime:</strong> {date} | {time}</p>
                <p><strong>Selected Seats ({selectedSeats.length}):</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
            </div>
            <hr className="summary-divider" />
            <div className="price-row">
                <span>Ticket Price ({selectedSeats.length} x ₹{ticketPrice})</span>
                <span>₹{subTotal}</span>
            </div>
            <div className="price-row">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
            </div>
            <hr className="summary-divider" />
            <div className="total-row">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
            </div>
            <button
                disabled={selectedSeats.length === 0}
                onClick={onProceedToPayment}
                className="btn-payment"
            >
                PROCEED TO PAYMENT
            </button>
        </div>
    );
};

export default BookingSummary;