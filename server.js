'use strict'
const axios = require('axios');
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors())
// const weather = require('./data/weather.json');
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_BIT_API_KEY;
const MOVIES_API_KEY = process.env.MOVIE_API_KEY;





app.get('/',
    function (req, res) { // callback function of what we should do with our request
        res.send(weather) // our endpoint function response
    })

app.get('/weather',
    async (request, response) => {

        const lat = request.query.lat;
        const lon = request.query.lon;

        const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
        try {

            const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
            if (lat && lon) {
                let cityNameFilteredData = weatherBitResponse.data.data
                let dataArr = []
                class Forecast {
                    constructor(date, description) {
                        this.date = date;
                        this.description = description;
                    }
                }
                cityNameFilteredData.map(element => {
                    let newOpject = new Forecast(element.datetime, element.weather.description)
                    dataArr.push(newOpject)
                })
                response.json(dataArr);

            } else {
                response.send('no data found')
            }
        } catch (error) {
            response.json(error.data);
        }
    })
// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
app.get('/moveis',
    async (request, response) => {
        const searchQuery = request.query.query
        const moviesUrl = 'https://api.themoviedb.org/3/search/movie'

        class Moveisdata {
            constructor(title, overview, voteAvarege, totalVotes, imgUrl, popularity, releaseDate ) {
                this.title = title;
                this.overview = overview;
                this.voteAvarege = voteAvarege;
                this.totalVotes = totalVotes;
                this.imgUrl = imgUrl;
                this.popularity = popularity;
                this.releaseDate = releaseDate;
            };
        }

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

)


app.listen(3001) // kick start the express server to work