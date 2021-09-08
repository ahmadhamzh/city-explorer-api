'use strict'
const express = require('express') 
const app = express() 
const cors = require('cors');
app.use(cors())
require('dotenv').config();
const weather = require('./controller/weather.controller');
const movies = require('./controller/moveis.controller');



app.get('/',
    function (req, res) { 
        res.send('hello world') 
    })

app.get('/weather', weather)

app.get('/moveis',movies)


app.listen(3001) 