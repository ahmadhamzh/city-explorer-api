'use strict'
const axios = require('axios');
require('dotenv').config();
const Moveisdata = require('../models/moviesdata.model');
const MOVIES_API_KEY = process.env.MOVIE_API_KEY;


const movies = async (request, response) => {
    const searchQuery = request.query.query
    const moviesUrl = 'https://api.themoviedb.org/3/search/movie'   

    try {
        const moviesResponse = await axios.get(`${moviesUrl}?api_key=${MOVIES_API_KEY}&query=${searchQuery}`)
        let responseData = moviesResponse.data.results

        if (responseData) {
            let movieResultArr = [];
            responseData.map(element => {
                let newObject = new Moveisdata (element.title, element.overview, element.vote_average, element.vote_count, element.poster_path, element.popularity, element.release_date)
                movieResultArr.push(newObject)
            })            
            response.json(movieResultArr)
        } else {
            response.send('no data found')
        }

    } catch (error) {
        response.send(error.data)
    }

}

module.exports = movies;