import path from 'path'
import express from 'express'
import hbs from 'hbs'
import { weather } from './utils/forecast.js'

// console.log(process.cwd())
// console.log(path.join(process.cwd(),'/public'))

const app = express()  //Creates an express server

//Define path for engine
const publicDirectoryPath = path.join(process.cwd(),'/public')
const viewsPath = path.join(process.cwd(),'/templates/views')
const partialsPath = path.join(process.cwd(),'/templates/partials')

//Setup handlebar engine
app.set('view engine','hbs')  // To render dynamic web pages instead of static rendered by express.static function.
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'Ansh Bhardwaj'
    })
})

app.get('/about',(req,res) => {
    res.render('about' , {
        title: 'About',
        name: 'Ansh Bhardwaj'
    })
})

app.get('/help',(req,res) => {
    res.render('help' , {
        title: 'Help',
        name: 'Ansh Bhardwaj'
    })
})


app.get('/weather',(req,res) => { 
    if(!req.query.address){
        return res.send({
            error: 'Please Provide a valid Address.'
        })
    }
    weather(req.query.address,(error,data) => {
        if(error){
            res.send({error})
        }else{
            res.send({forcast: data.data,location: data.location ,address: req.query.address})
        }               
    })
})

app.get('/help/*' , (req,res) => {
    res.render('error',{
        title: '404',
        error1:'Help Artical not found!!!',
        name:'Ansh Bhardwaj'
    })
})

//For all other urls that are not defined.
//Always create this at the bottom.
app.get('*' , (req,res) => {
    res.render('error',{
        title: '404',
        error1: 'Requested Page not found.',
        name: "Ansh Bhardwaj"
    })
})

app.listen(3000,() => {
    console.log('Server is up and running at port 3000.')
})