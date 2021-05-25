const database = require('./database')
const restAPI = require('./api/rest/index')

const start = async() => {
    await database()
    restAPI()
}
start()