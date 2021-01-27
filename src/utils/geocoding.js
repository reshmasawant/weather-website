const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmVzaG1hc2F3YW50IiwiYSI6ImNrazEyN2JlYTBuNmIycXQ3cjBmOGJkMWwifQ.McnmUxijiv6moqc_AHxgDA&limit=1`
    request({ url, json: true }, (error, { body } = response) => {

        if (error) {
            callback('Unable to connect weather services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}
module.exports = geocode
