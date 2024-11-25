const express = require("express")
const app = express()
const cors = require('cors')

require("./config/dataBase")
// const router = require("./api/V1/src/movies/route.movies")
const v1Routes = require("./api/v1/route")
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use("/v1", v1Routes)


module.exports = app