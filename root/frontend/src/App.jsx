import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieContext from "./context/MovieContext";
import { API_URL } from "./config";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/movie/popular`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  }, []);

  return (
    <MovieContext.Provider value={movies}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Router>
    </MovieContext.Provider>
  );
};

export default App;
