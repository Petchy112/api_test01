
const User = require('../models/userModel')

const Service = {
    async register(input) {
        console.log('register called',input)
        
        const user = new User
        user.userName = userName,
        user.email = email,
        user.password = password,
        user.firstName = firstName,
        user.lastName = lastName,
        user,phoneNumber = phoneNumber
        
        await user.save()
        
        var isExist = await User.findOne({email: email})
        if(isExist) {
            console.log('The email is already use')
        }

    }   
}

module.exports = Service