const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TMDB_API_KEY = process.env.TMDB_API_KEY

app.get('/', (req, res) => {
    res.send("Welcome to Streamwhere's API Server")
});

//route for popular movies
app.get('/movie/popular', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key:TMDB_API_KEY,
                language: 'en-US',
                page: 1
            }
        });
        res.json(response.data)
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        res.status(500).send('Internal Server Error');
    }
});

//route for movies by title
app.get('/movies/search', async (req, res) => {
    const query = req.query.q;
    if(!query){
        return res.status(400).send('Query parameter "q" is required');
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en_US',
                query: query,
                page: 1,
                include_adult: false
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error searching for movies', error);
        res.status(500).send('Internal server error');
    }
});

//route for watch providers
app.get('/movie/:movieId/watch/providers', async (req, res) => {
    const { movieId } = req.params;
    
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, {
            params: {
                api_key: TMDB_API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching watch providers:', error);
        res.status(500).send('Internal Server Error');
    }
});

//route for movie details
app.get('/movie/:movieId', async (req, res) => {
    const { movieId } = req.params;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})