const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to the database')
})

const routes = require('./route/route')

app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use(express.json())

app.use('/api', routes)

app.listen(3000)