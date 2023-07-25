
const express = require('express')
const bodyParser = require('body-parser')
const routers = require('./routes/routers')
const rateLimit = require("express-rate-limit");
require('dotenv').config()

const app = express()

const port = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }))
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes duration in milliseconds
        max: 10,
        message: "You exceeded 10 requests in  15 minutes limit!",
        headers: true,
    })
);
app.use('/api', routers)

app.get('/', (req, res) => {
    return res.status(200).json({ status: "ok" })
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})
