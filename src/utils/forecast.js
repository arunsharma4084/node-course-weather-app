const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e5b8b4ae31a95b10f876e23f2a2fc915&query=' + latitude + ',' + longitude + '&units=f';

    request({url, json: true}, (error, response, body) => {
        if(error){
            callback("Unable to connect to weather service", undefined);
        } else if(response.body.error) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees.`);
        } 
    })
}

module.exports = forecast;