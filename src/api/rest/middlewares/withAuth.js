const { ExpressRequest } = require('express')
const userAuth = require('../../../models/userAuthModel')
const User = require('../../../models/userModel')

// class checkAuth extends myAuth {
//     accessToken = String
//     accessTokenExpires = Date
//     userName = String
// }
class checkAuth {
    constructor(){
        accessToken = String,
        accessTokenExpires = Date,
        userName =String
    }
}

module.exports = async(req=checkAuth,res,next) => {
    try {
        if(req.headers.Authorization){
            console.log(req.headers)
            const token = req.headers.Authorization.replace('Bearer','')
            const tokenData = userAuth.findOne({accessToken:token})
            if(tokenData) {
                const userData = User.findOne({_id:tokenData.userName})
                if(userData && tokenData.accessTokenExpires && tokenData.accessTokenExpires > new Date()) {
                    req.accessToken = userTokenData.accessToken
                    req.accessTokenExpires = userTokenData.accessTokenExpires
                    req.userName = userToken.userName
                    next()
                }
                else{
                    req.userName = null
                    next()
                }
            }
            else {
                req.userName = null
                next()
            }   
        }
        else{
            req.userName = null
            next()
        }
    }
    catch(error){
        req.userName = null
        next(error)
    }
}