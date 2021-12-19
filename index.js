/* PROXY SERVER to hide API Keys from requests to third party APIs 
    made by client. Stores API keys on proxy server. Proxy server handles request to 
    third party API. 
*/

const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

//Rate Limiting
const limiter = rateLimit({
    windowMS: 10 * 60 * 1000,   //10min
    max: 5 
})

app.use(limiter)
app.set('trust proxy', 1)

//Set static folder
app.use(express.static('public'))

//Routes
app.use('/api', require('./routes/index'))

/*app.get('/api', (req, res) => {
    res.json({success: true})
})*/

//Enable cors
app.use(cors())

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))