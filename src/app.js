const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Arun Sharma',
//         age: 27
//     },
//     {
//         name: 'Monika Sharma',
//         age: 30
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>About</h1>")
// })

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Arun Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Arun Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "You are not connected to internet",
        title: "Help Text Page",
        name: "Arun Sharma"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            })
        })
})
    
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term!"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help 404 Page',
        name: 'Arun Sharma',
        error: "Help Article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Help 404 Page',
        name: 'Arun Sharma',
        error: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})