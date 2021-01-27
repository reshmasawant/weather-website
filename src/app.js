const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocoding')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express.config
const dirstatic = path.join(__dirname, '../public')
const partialspath = path.join(__dirname, '../partials')
//set handler engine,view location and partials loction
app.set('view engine', 'hbs')
hbs.registerPartials(partialspath)
//static directory to server
app.use(express.static(dirstatic))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Reshma Sawant'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        reason: 'This page is to help user',
        name: 'Reshma Sawant'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Page',
        reason: 'Picture of Baymax.',
        name: 'Reshma Sawant'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide search terms'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                Forecast: response,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        errorMessage: 'ARTICAL NOT FOUND!!',
        name: 'Reshma Sawant'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'Reshma Sawant'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running.')

})