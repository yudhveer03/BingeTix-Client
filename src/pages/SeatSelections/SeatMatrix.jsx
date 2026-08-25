import React from 'react';

const SeatMatrix = ({ bookedSeats, selectedSeats, onSeatClick }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <div className="seat-matrix-card">
            {/* Screen Area */}
            <div className="screen-container">
                <div className="screen-line"></div>
                <span className="screen-text">FRONT OF AUDITORIUM / SCREEN THIS WAY</span>
            </div>

            {/* Legend */}
            <div className="seat-legend">
                <div className="legend-item"><span className="legend-box available"></span> Available</div>
                <div className="legend-item"><span className="legend-box sold"></span> Sold</div>
                <div className="legend-item"><span className="legend-box selected"></span> Selected</div>
            </div>

            {/* Seat Grid */}
            <div className="seats-grid">
                {rows.map((row) => (
                    <div key={row} className="seat-row">
                        <span className="row-label">{row}</span>
                        {cols.map((col) => {
                            const seatId = `${row}${col}`;
                            const isBooked = bookedSeats.includes(seatId);
                            const isSelected = selectedSeats.includes(seatId);

                            let seatStatusClass = 'available';
                            if (isBooked) seatStatusClass = 'sold';
                            if (isSelected) seatStatusClass = 'selected';

                            return (
                                <button
                                    key={seatId}
                                    onClick={() => onSeatClick(seatId)}
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
    );
};

export default SeatMatrix;