import request from "postman-request"

const weather = (address,callback) => {
    setTimeout(()=>{

        const url = 'http://api.weatherstack.com/current?access_key=f85f5a698efcd2bb3e4299bd043400d8&query='+address+'&units=s'

        request({url: url,json:true}, (error, response)=>{
            if(error){
                callback('Unable to connect to Weather Service.',undefined)
            }else if(response.body.error){
                callback('Unable to find location. Try another Search',undefined)
            }else{
                callback(undefined,{data: response.body.current.weather_descriptions[0]+': It is currently '+response.body.current.temperature+' Kelvin out. It feels like '+response.body.current.feelslike+' Kelvin out.', location: response.body.location.name+','+response.body.location.country+','+response.body.location.localtime})
            }
        }) 

    },2000)
}

export{weather}