const express = require("express")

const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 5000


//Static File
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))

//Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

//Body Parsing
app.use(bodyParser.urlencoded({extended: true}))

//Routes

const newsRouter =  require('./src/routes/news')
app.use('/',newsRouter)


//Listening to port
app.listen(port, () => console.log(`Listening on port...${port}`) )
