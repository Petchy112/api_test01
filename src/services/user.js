
const User = require('../models/userModel')

const thisService = {
    async register(input) {
        console.log('register called',input)
        
        const user = new User();
        user.userName = input.userName,
        user.password = input.password,
        user.confirmPassword = input.confirmPassword
        user.firstName = input.firstName,
        user.lastName = input.lastName,
        user.email = input.email,
        user.phoneNumber = input.phoneNumber
        
        var isExist = await User.findOne({email: input.email})
        if(isExist) {
            console.log('The email is already use')
        }
        await user.save()
    },
}

module.exports = thisService