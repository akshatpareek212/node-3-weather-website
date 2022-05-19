const request = require('request')

const forecast = (latitude,longitude,callback) => {

    url=`http://api.weatherstack.com/current?access_key=3d6e1fc6de6415f625fd55b96b3b43cb&query=${latitude},${longitude}`

    request({url,json:true},(error,{body}) => {
        console.log(body);
    if(error){
        callback("Can't connect to network");
    }
    else if(body.error){
        callback("Can't find location");
    }
    else {
    callback(undefined, 
        `${body.current.weather_descriptions}. It is ${body.current.temperature} degrees out, but feels like ${body.current.feelslike} degrees out.The humidity is ${body.current.humidity}`)
    }
})

}

module.exports = forecast