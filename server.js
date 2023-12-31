require('dotenv').config();

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(cors());
app.use(express.json());

const movieRoutes = require('./routes/movies')

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the movies app' })
})

app.use('/movies', movieRoutes)


//connect to db
mongoose.connect(process.env.DB_URL)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


