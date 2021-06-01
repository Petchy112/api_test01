module.exports = config = {
    port : 99,
    database : {
        username : 'admin',
        password : '15918Petch',
        host : 'testmongodb.fs0qx.mongodb.net',
        database : 'test'
    },
    auth : {
        expires : {
            accessToken : 60 * 60,
            refreshToken : 7 * 24 * 60 * 60
        }
    }

}