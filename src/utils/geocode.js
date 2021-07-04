const request = require('request')
const { url } = require('inspector')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoiaW50aXNhcmFjY2VudHVyZSIsImEiOiJja3FrdzFlOHQwZDhwMnZuNHNsODZ5djJ5In0.AGzsoIOrF-Rq9AnrvdKPRg&limit=1"
    request({url, json: true},(error, {body}) => {
        if (error){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location, try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[0],
                longitude:  body.features[0].geometry.coordinates[1], 
                location: body.features[0].place_name,
            })
        }
    })

}

module.exports = geocode