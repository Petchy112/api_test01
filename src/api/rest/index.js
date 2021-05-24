const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const config = require('../../config');
const router = require('./router/user')


app.use(cors())

app.use('/',router)

console.log(`Starting with port ${config.port}`)
app.listen(config.port,() => {`Starting with port ${config.port}`})





