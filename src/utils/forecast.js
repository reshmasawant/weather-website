const request = require('request')
const forecast = (longitude, lattitude, callback) => {
    const url = `http://api.weatherstack.com./current?access_key=d66c7944e477513d7f1ded7cb810bb66&query=${longitude},${lattitude}&units=m`
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to conncet to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find Location', undefined)
        }
        else {
            callback(undefined, `${body.current.weather_descriptions[0]} The current temperature is ${body.current.temperature} but it feels like ${body.current.feelslike}. humidity is ${body.current.humidity}% at ${body.current.observation_time}  
            `)

        }
    })
}
module.exports = forecast