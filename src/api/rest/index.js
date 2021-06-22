const express = require('express')
const app = express();
const cors = require('cors');
const config = require('../../config');
const routes = require('./router/index')
const bodyParser = require('body-parser');



app.use(cors())

// app.use('/api',router)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
routes(app)

app.use((error, req, res, next) => {
    if (error.message === 'nothing') {
        return
    }
    if (error.universal) {
        const status = error.status
        error.status = undefined
        error.amount = undefined
        error.universal = undefined
        res(status).json({ error: [{ message: error.message, ...error }] })
        return
    }
    throw error
})

console.log(`Starting with port ${config.port}`)
app.listen(config.port, () => { `Server on port ${config.port}` })