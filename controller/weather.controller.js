'use strict'
const axios = require('axios');
require('dotenv').config();
const Forecast = require('../models/forcast.model');
const WEATHER_API_KEY = process.env.WEATHER_BIT_API_KEY;
const Cash = require('../helper/cash.helper');
let cashObject = new Cash();
const weather =async (request, response) => {

    const dayInMilSec = 50000;
  const oneDayPassed = (Date.now() - cashObject.timestamp) > dayInMilSec;
  if (oneDayPassed) {
    
    cashObject = new Cash();
  }

    const lat = request.query.lat;
    const lon = request.query.lon;
    const foundData = cashObject.weatherForcast.find(location => {
       return location.lat === lat && location.lon === lon
    })
    if (foundData) {
        response.send(foundData.data)
        console.log('data from cash weather');
        
    } else {
        
        const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
        try {
            
            const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
            if (lat && lon) {
                let cityNameFilteredData = weatherBitResponse.data.data
                let data = []            
                cityNameFilteredData.map(element => {
                    let newOpject = new Forecast(element.datetime, element.weather.description)
                    data.push(newOpject)
                })
                cashObject.weatherForcast.push({
                    'lat' : lat,
                    'lon' : lon,
                    'data' : data
                })
                response.json(data);
                // console.log(cashObject.weatherForcast)
                console.log('data from api weather');
                console.log(foundData);
                
            } else {
                response.send('no data found')
            }
        } catch (error) {
            response.json(error.data);
        }
    }
}
module.exports = weather;