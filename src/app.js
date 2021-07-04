const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const app = express()


//define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(partialsPath)

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Intisar Haque'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About page',
        name: 'Intisar Haque'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        text: 'This is the help page. How may I assist you?',
        name: 'Intisar Haque'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    //default object to the destructure object
    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if (error){
            res.send('error', error)
        }
    
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error){
                res.send('error', error)
            }
            res.send({
                forecast: forecastdata,
                location: req.query.address
            })
        })
    })



})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }else{
        console.log(req.query)
        res.send({
            products:[]
        })
    }
    
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help 404',
        name: "Intisar Haque",
        errorMessage: 'Help Article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: "Intisar Haque",
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})