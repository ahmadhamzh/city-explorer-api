'use strict'
const axios = require('axios');
const Cash = require('../helper/cash.helper');
require('dotenv').config();
const Moveisdata = require('../models/moviesdata.model');
const MOVIES_API_KEY = process.env.MOVIE_API_KEY;
let cashObject = new Cash();

const movies = async (request, response) => {

    const dayInMilSec = 50000;
    const oneDayPassed = (Date.now() - cashObject.timestamp) > dayInMilSec;
    if (oneDayPassed) {
      
      cashObject = new Cash();
    }

    const query = request.query.query
    
    const foundData = cashObject.moviesList.find(movie => {
        return movie.query == query ;
    });
    if (foundData) {
        response.json(foundData.data)
        console.log('data from cash movies ')
        
    } else {
        
        const moviesUrl = 'https://api.themoviedb.org/3/search/movie'   
        
        try {
            const moviesResponse = await axios.get(`${moviesUrl}?api_key=${MOVIES_API_KEY}&query=${query}`)
            let responseData = moviesResponse.data.results
            
            if (responseData) {
                let data = [];
                responseData.map(element => {
                    let newObject = new Moveisdata (element.title, element.overview, element.vote_average, element.vote_count, element.poster_path, element.popularity, element.release_date)
                    data.push(newObject)
                })            
                cashObject.moviesList.push({
                    'query' : query,
                    'data' : data
                })
                response.json(data)
                console.log(foundData)
            } else {
                response.send('no data found')
            }
            
        } catch (error) {
           
            response.send(error)
        }
    }
        
}

module.exports = movies;