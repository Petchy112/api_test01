const User = require('../models/userModel')
const UniversalError = require('../error/universalError')

const thisService = {
    async register(input) {
        console.log('register called',input)

        const user = new User();
        user.userName = input.userName,
        user.passwordHash = input.password,
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
    async login(userName,password) {
        console.log('login called', userName)
        
            var thisUser = await User.findOne({userName})
        
            if(thisUser) {
                if(thisUser.passwordHash !== password){
                    console.log('Password was invalid')
                    return
                }
                console.log('login successful')
            }
            else {
                console.log('Username was invalid')
                
            }
        },
    async changePassword(input){
        console.log(input.oldPassword)
        try {
            var newPassword = await User.findOne({$and: [{oldPassword},{password:input.password}]})
            var checkUser = await User.findOne({userName:thisUser})
            if (newPassword) {
                console.log('Password is the same , Please change to new password')
                // console.log(id)
            }
            if(!checkUser){
                console.log('Username invalid')
            }
            else {
                var setNewPassword = await User.findOneAndUpdate({password:input.password})
                if(setNewPassword){
                    console.log('Password is changed')
                }
            }
            
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = thisService