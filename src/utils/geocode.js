const request = require('request')

const geocodeURL = (address,callback) => {      

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWtzaGF0cGFyZWVrMjEyIiwiYSI6ImNsMmsxdXcyNTBsMWcza3MzZWozc2RreGwifQ.ZJRvtsUpk58MlPn5ab6EfQ`

    request({url, json:true}, (error,{body}) =>{
            if(error){
                    callback("Unable to connect to network")
            }
            else if(body.features.length===0){
                    callback("Cannot find location,Try another search");
                    }  
            else{
                    callback(undefined, 
                    {
                    Longitude: body.features[0].center[0],
                    Latitude: body.features[0].center[1],
                    Location: body.features[0].place_name
                    });
            }

    }
    )
}

module.exports = geocodeURL