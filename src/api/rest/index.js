const express = require('express')
const app = express();
const cors = require('cors');
const config = require('../../config');
const router = require('./router/user')
const routes = require('./router/index')
const bodyParser = require('body-parser')

app.use(cors())

// app.use('/api',router)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
routes(app)

console.log(`Starting with port ${config.port}`)
app.listen(config.port,() => {`Server on port ${config.port}`})