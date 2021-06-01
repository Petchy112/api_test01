const User = require('../models/userModel')
const UniversalError = require('../error/UniversalError');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userAuthToken = require('../models/userAuthModel')
const sha1 = require('js-sha1')



const thisService = {
    async register(input) {
        console.log('register called',input)

        const user = new User();
        user.userName = input.userName,
        user.passwordHash = sha1(input.password),
        user.firstName = input.firstName,
        user.lastName = input.lastName,
        user.email = input.email,
        user.phoneNumber = input.phoneNumber

        
        var isExistEmail = await User.findOne({email: input.email})
        if(isExistEmail) {
            console.log('The email is already use!')
            return
        }
        var isExistUsername = await User.findOne({userName: input.userName})
        if(isExistUsername) {
            console.log('Username is already use!')
            return
        }
        await user.save()

    },
    async login(userName,password) {
        console.log('login called', userName)
        
            var thisUser = await User.findOne({userName})
        
            if(thisUser) {
                if(thisUser.passwordHash !== password){
                    console.log('Password was invalid')
                    
                }
                const accessTokenExpiresAt = new Date()
                console.log(accessTokenExpiresAt)
                const signOptionsAccessToken = {
                    ...config.session.JWT,
                    expiresIn : config.auth.expires.accessToken
                }
                const payloadAccessToken = {
                    userName : thisUser.userName,
                    email : thisUser.email,
                    phoneNumber : thisUser.phoneNumber
                }


                const expiresIn = config.auth.expires.accessToken;
                accessTokenExpiresAt.setSeconds(accessTokenExpiresAt.getSeconds() + expiresIn)
                

                const accessToken = jwt.sign(payloadAccessToken,'secret',signOptionsAccessToken)

                const UserAuth = new userAuthToken()
                UserAuth.userName = userName
                UserAuth.accessToken = accessToken
                UserAuth.accessTokenExpiresAt = accessTokenExpiresAt
                await UserAuth.save()
                
                resData = {
                    Message: 'Auth Successful',token : accessToken
                }
                return resData
            }
            else {
                console.log({Message:'Username was invalid'})
                return
            }
        },
    async changePassword(userName,oldPassword,newPassword){
        var thisUser = await User.findOne({userName})
        
        if(thisUser) {
            console.log(thisUser.passwordHash)
            if(thisUser.passwordHash !== oldPassword){
                console.log('Old password was invalid')
            }
            else{
                thisUser.passwordHash = newPassword
                thisUser.save()
            }
        }    
    },
    async revokeAccessToken(accessToken){
        console.log('revoke called',accessToken);
        await userAuthToken.findOneAndDelete({accessToken})
        const res = {
            message: 'logged out!',
        }
        return res
    },
    
}


module.exports = thisService