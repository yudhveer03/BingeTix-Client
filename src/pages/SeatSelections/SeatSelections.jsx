import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SeatSelection.css';

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const bookedSeats = selectedShow ? (selectedShow.bookedSeats || []) : [];

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
      // Frontend backend ki API call kar raha hai
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

  if (movie === null) return <h2 className="loading-text">Loading...</h2>;

  const ticketPrice = selectedShow ? selectedShow.price : 0;
  const subTotal = selectedSeats.length * ticketPrice;
  const convenienceFee = selectedSeats.length > 0 ? 50 : 0;
  const totalAmount = subTotal + convenienceFee;

  return (
    <div className="seat-selection-container">
      <div className="seat-header">
        <h2>{movie.title}</h2>
        {selectedShow && (
          <p className="show-info-text">
            {selectedShow.theatre} | {selectedShow.date} | {selectedShow.time}
          </p>
        )}
      </div>

      {!selectedShow ? (
        <div className="shows-grid-container">
          <h3>Select a Show & Theatre:</h3>
          {shows.length === 0 ? (
            <p>No Shows Available</p>
          ) : (
            <div className="shows-grid">
              {shows.map((showItem, index) => (
                <div key={showItem._id || index} className="show-select-card">
                  <h4>{showItem.theatre}</h4>
                  <p>Date: {showItem.date}</p>
                  <p>Time: {showItem.time}</p>
                  <p className="show-price">Price: ₹{showItem.price}</p>
                  <button className="btn-select-seats" onClick={() => setSelectedShow(showItem)}>
                    Select Seats
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <button className="btn-change-show" onClick={() => { setSelectedShow(null); setSelectedSeats([]); }}>
            ← Change Show
          </button>

          <div className="seat-booking-wrapper">
            <div className="seat-matrix-card">
              <div className="screen-container">
                <div className="screen-line"></div>
                <span className="screen-text">FRONT OF AUDITORIUM / SCREEN THIS WAY</span>
              </div>
              <div className="seat-legend">
                <div className="legend-item"><span className="legend-box available"></span> Available</div>
                <div className="legend-item"><span className="legend-box sold"></span> Sold</div>
                <div className="legend-item"><span className="legend-box selected"></span> Selected</div>
              </div>
              <div className="seats-grid">
                {rows.map(row => (
                  <div key={row} className="seat-row">
                    <span className="row-label">{row}</span>
                    {cols.map(col => {
                      const seatId = `${row}${col}`;
                      const isBooked = bookedSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      let seatStatusClass = 'available';
                      if (isBooked) seatStatusClass = 'sold';
                      if (isSelected) seatStatusClass = 'selected';

                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={isBooked}
                          className={`seat-btn ${seatStatusClass}`}
                        >
                          {col}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="summary-card">
              <h3>Booking Summary</h3>
              <div className="summary-details">
                <p><strong>Movie:</strong> {movie.title}</p>
                <p><strong>Theatre:</strong> {selectedShow.theatre}</p>
                <p><strong>Showtime:</strong> {selectedShow.date} | {selectedShow.time}</p>
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
              <button disabled={selectedSeats.length === 0} onClick={handleProceedToPayment} className="btn-payment">
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;