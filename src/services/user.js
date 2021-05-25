
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
        
        var isExistEmail = await User.findOne({email: input.email})
        if(isExistEmail) {
            console.log('The email is already use!')
        }
        var isExistUsername = await User.findOne({userName: input.userName})
        if(isExistUsername) {
            console.log('Username is already use!')
        }
        await user.save()
    },
    async login(input) {
        console.log('login called',input.userName)
        try{
            var loginUser = await User.findOne({userName:input.userName})
            var loginPassword = await User.findOne({password:input.password})
            if(loginUser && loginPassword) {
                console.log('logged in')
            }
            else if(!loginUser) {
                console.log('Username is invalid')
            }
            else if(!loginPassword) {
                console.log('password is invalid')
            }
        }
        catch (error) {
            throw error;
        }
        
        
    }
}

module.exports = thisService