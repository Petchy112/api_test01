const userAuth = require('../../../models/userAuthModel')
const User = require('../../../models/userModel')

// class checkAuth extends myAuth {
//     accessToken = String
//     accessTokenExpires = Date
//     userName = String
// }

// class checkAuth {   
//     constructor(){
//         accessToken = String,
//         accessTokenExpires = Date,
//         userId = String
//     }
// }

module.exports = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace('Bearer ', '')
            const tokenData = userAuth.findOne({ accessToken: token })
            if (tokenData) {
                const userData = User.findOne({ _id: tokenData.userId })
                if (userData && tokenData.accessTokenExpiresAt && tokenData.accessTokenExpiresAt > new Date()) {
                    accessToken = tokenData.accessToken
                    accessTokenExpires = tokenData.accessTokenExpires
                    userId = tokenData.userId
                    next()
                }
                else {
                    userId = null
                    next()
                }
            }
            else {
                userId = null
                next()
            }
        }
        else {
            userId = null
            next()
        }
    }
    catch (error) {
        userId = null
        next(error)
    }
}