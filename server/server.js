require('dotenv').config()
const express = require('express')

const ridesRoutes = require('./routes/ridesRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const passengerRoutes = require('./routes/passengerRoutes')
const driverRoutes = require('./routes/driverRoutes')
const addressRoutes = require('./routes/addressRoutes');

const mongoose =require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/rides', ridesRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/passengers', passengerRoutes)
app.use('/api/drivers', driverRoutes)
app.use('/api/addresses', addressRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
