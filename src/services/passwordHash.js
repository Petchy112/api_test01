const {argon2i} = require('argon2')
const upash = require('upash')
upash.install(argon2i,'argon2-ffi')

const passwordHashFunction = {
    async CreatePasswordHash(password) {
        await upash.hash(password)
    },
    async verifyPassword(passwordHash){
        await upash.verify(passwordHash,password)
    }
}

module.exports = passwordHashFunction
