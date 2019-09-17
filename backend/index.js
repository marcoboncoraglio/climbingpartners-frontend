const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const port = process.env.PORT || 4000

// MIDDLEWARE
app.use(express.json())

// DATABASE
mongoose.connect(process.env.DB_CONNECTION_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// ROUTES
const userCardRouter = require('./routes/userCardRoutes')
app.use('/api/userCards', userCardRouter)

const userDetailsRouter = require('./routes/userDetailsRoutes')
app.use('/api/userDetails', userDetailsRouter)

const locationsRouter = require('./routes/locationRoutes')
app.use('/api/locations', locationsRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))