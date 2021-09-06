'use strict'

const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors())
const weather = require('./data/weather.json')
 
// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
    res.send(weather) // our endpoint function response
})

app.get('/weather', // our endpoint name
 function (req, res) { // callback function of what we should do with our request

    const cityName = req.query.city_name
    // const lonValue = re
    if (cityName){
        const cityNameFiltered = weather.find(element => {
            return element.city_name === cityName
        })
        if (cityNameFiltered){
            // let dataArr = [cityNameFiltered[0].data[0].datetime,cityNameFiltered[0].data[0].weather.description]
            let cityNameFilteredData = cityNameFiltered.data
            let dataArr = []
            class Forecast {
                constructor(date, description) {
                  this.date = date;
                  this.description = description;
                }
              }
              cityNameFilteredData.map(element => {
                 let newOpject =  new Forecast (element.datetime, element.weather.description)
                 dataArr.push(newOpject)
              })

            res.json(dataArr) 
        } else {
            res.json('no data found') 
        }
    }    

})

 
app.listen(3001) // kick start the express server to work