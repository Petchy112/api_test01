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
                }else {
                    console.log('login successful')
                }
            }
            else {
                console.log('Username was invalid')
                
            }
        },
    async changePassword(userName,oldPassword,newPassword){
        var thisUser = await User.findOne({userName})
        
        if(thisUser) {
            console.log(thisUser.passwordHash)
            if(thisUser.passwordHash !== oldPassword){
                console.log('Old password was invalid')
            }else{
                thisUser.passwordHash = newPassword
                thisUser.save()
            }
           
            
        }    
    }
}


module.exports = thisService