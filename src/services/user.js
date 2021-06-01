const User = require('../models/userModel')
const UniversalError = require('../error/UniversalError');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userAuthToken = require('../models/userAuthModel')



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
                //console.log('login successful')
                const expiresIn = 1
                const accessTokenExpiresAt = new Date.now();
                // accessTokenExpiresAt.setSeconds(accessTokenExpiresAt.getSeconds() + expiresIn)
                console.log(accessTokenExpiresAt);

                const accessToken = jwt.sign({
                    email: thisUser.email,
                    phoneNumber: thisUser.phoneNumber,
                    userName: userName
                },'secret',
                {
                    expiresIn : '1h'
                }
            );

            const UserAuth = new userAuthToken()
            UserAuth.userName = userName
            UserAuth.accessToken = accessToken
            UserAuth.accessTokenExpire = accessTokenExpiresAt
            await UserAuth.save()
            
            console.log({Message: 'Auth Successful',token : accessToken})
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
    async revokeAccessToken(accessToken,userName,pushToken){
        console.log('revoke called' ,accessToken);
    }
}


module.exports = thisService