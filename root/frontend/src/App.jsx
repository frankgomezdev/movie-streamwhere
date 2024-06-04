import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"

import Footer from "./components/Footer"
import MovieList from "./components/MovieList"
import Navbar from "./components/Navbar"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/movie/:id" element={<MovieDetailsPage />} />
            </Routes>
        </Router>
    )
}

export default App