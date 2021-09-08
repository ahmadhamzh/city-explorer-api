'use strict'
const axios = require('axios');
require('dotenv').config();
const Forecast = require('../models/forcast.model');
const WEATHER_API_KEY = process.env.WEATHER_BIT_API_KEY;

const weather =async (request, response) => {

    const lat = request.query.lat;
    const lon = request.query.lon;

    const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    try {

        const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
        if (lat && lon) {
            let cityNameFilteredData = weatherBitResponse.data.data
            let dataArr = []            
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
}
module.exports = weather;