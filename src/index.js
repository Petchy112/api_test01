const database = require('./database')
const REST = require('./api/rest')

const start = async () => {
    await database()
    REST()

}
start()