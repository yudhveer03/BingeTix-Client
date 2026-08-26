import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home/Home.jsx"
import NavBar from "./components/NavBar/NavBar.jsx"
import Movies from "./pages/AllMovies/Movies.jsx"
import MovieDetails from "./pages/MovieDetails/MovieDetails.jsx"
import SeatLayout from "./pages/SeatSelections/SeatSelections.jsx"
import Footer from "./components/footer/Footer.jsx"
import SeatSelection from './pages/SeatSelections/SeatSelections.jsx'
import Ticket from './pages/TicketSummary/Ticket.jsx';
import Releases from "./pages/Releases/Releases.jsx";
import AuthModal from './components/Auth/AuthModal.jsx'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      <AuthModal/>
      <div>
        {/* Navigation bar hidden on admin routes */}
        {!isAdminRoute && <NavBar />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route path='/movies/:id/:date' element={<SeatLayout />} />
          <Route path='/seatSelection/:id' element={<SeatSelection />} />
          <Route path='/booking-success/:bookingId' element={<Ticket />} />
          <Route path='/releases' element={<Releases />} />
        </Routes>

        {/* Footer hidden on admin routes */}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  )
}

export default App