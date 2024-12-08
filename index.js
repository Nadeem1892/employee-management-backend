const express = require("express")
const app = express()
const cors = require('cors')
const path = require('path');
require("./config/dataBase")
// const router = require("./api/V1/src/movies/route.movies")
const v1Routes = require("./api/v1/route")
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use("/v1", v1Routes)


module.exports = app