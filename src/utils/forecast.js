const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    coords = longitude+ "," +latitude
    const url = "http://api.weatherstack.com/current?access_key=113db93cc1730c6994089c3df15372a8&query=" + coords     
    request({url, json:true},(error, { body })=>{
        if (error){
            callback("Unable to connect to weather service", undefined)
        }else if(body.error){
            callback('unable to find location', undefined)}
        else{
            callback(undefined,{
                // temp: body.current.temperature,
                // feelslike: body.current.feelslike,
                total: body.current
            })
        }

    })
}

module.exports = forecast