const upash = require('upash')
upash.install('bcrypt', require('@phc/bcrypt'));

const passwordHashFunction = {
    async CreatePasswordHash(password) {
        await upash.hash(password)
    },
    async verifyPassword(passwordHash){
        await upash.verify(passwordHash,password)
    }
}








module.exports = passwordHashFunction
