const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,("../templates/views"))
const partialsPath = path.join(__dirname,"../templates/partials")
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

app.set('view engine', 'hbs')
app.set("views", viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akshat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help section',
        name:"Akshat",
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {Latitude, Longitude, Location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(Latitude,Longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                    forecast:forecastData,
                    Location,
                    address: req.query.address
            })
           
        })
        })
        
    })

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You need to enter a search term'
        })
    }


    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get("/help/*",(req,res) =>{
    res.render("404error",{
        title: "404",
        name:"Akshat",
        errorMessage:"Help article not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404error",{
        title: "404",
        name:"Akshat",
        errorMessage:"Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})