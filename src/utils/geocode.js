const request = require('request');

const geoCode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=cad11d2690c5b24ea04764d47096c56a&query=` + encodeURIComponent(address) + `&limit=1`;

    request({url, json: true}, (error, response, body) => {
        if(error){
            callback("Unable to connect to location services", undefined);
        } else if(body.error) {
            callback("Unable to find location. Try another search");
        } else {
            callback(undefined, {latitude: response.body.data[0].latitude,
            longitude: response.body.data[0].longitude,
            location: response.body.data[0].label})
        }
    })
}

module.exports = geoCode;