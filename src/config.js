module.exports = config = {
    port: 99,
    database: {
        username: 'admin',
        password: '15918Petch',
        host: 'testmongodb.fs0qx.mongodb.net',
        database: 'test'
    },
    auth: {
        expires: {
            accessToken: 60 * 60,
        }
    },
    session: {
        JWT: {
            issuer: 'JWT',
            algorithm: 'HS256'
        },
        key: 'secret'
    },

}