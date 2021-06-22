const User = require('../models/userModel')
const UniversalError = require('../error/UniversalError');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userAuth = require('../models/userAuthModel')
const sha1 = require('js-sha1');
const generatePasswordHash = require('../services/PasswordHash')

const thisService = {
    async register(input) {
        console.log('register called', input)

        const user = new User();
        user.userName = input.userName,
            user.passwordHash = generatePasswordHash(input.password),
            user.firstName = input.firstName,
            user.lastName = input.lastName,
            user.email = input.email,
            user.phoneNumber = input.phoneNumber

        var isExistEmail = await User.findOne({ email: input.email })
        if (isExistEmail) {
            var message = ('The email is already use!')
            return message
        }
        var isExistUsername = await User.findOne({ userName: input.userName })
        if (isExistUsername) {
            var message = ('Username is already use!')
            return message
        }
        await user.save()

    },
    async login(userName, password) {
        console.log('login called', userName)
        var thisUser = await User.findOne({ userName })
        if (thisUser) {
            if (thisUser.passwordHash !== sha1(password)) {
                res = { Message: 'Password was invalid' }
                return res
            }
            const accessTokenExpiresAt = new Date()
            const signOptionsAccessToken = {
                ...config.session.JWT,
                expiresIn: config.auth.expires.accessToken
            }
            const payloadAccessToken = {
                userId: thisUser._id,
                email: thisUser.email,
                phoneNumber: thisUser.phoneNumber
            }


            const expiresIn = config.auth.expires.accessToken;
            accessTokenExpiresAt.setSeconds(accessTokenExpiresAt.getSeconds() + expiresIn)


            const accessToken = jwt.sign(payloadAccessToken, 'secret', signOptionsAccessToken)

            const UserAuth = new userAuth()
            UserAuth.userId = thisUser._id
            UserAuth.accessToken = accessToken
            UserAuth.accessTokenExpiresAt = accessTokenExpiresAt
            await UserAuth.save()

            resData = {
                Message: 'Auth Successful', token: accessToken
            }
            return resData
        } else {
            res = { Message: 'Username was invalid' }
            return res
        }
    },
    async changePassword(userName, oldPassword, newPassword) {
        var thisUser = await User.findOne({ userName })

        if (thisUser) {
            console.log(thisUser.passwordHash)
            if (thisUser.passwordHash !== sha1(oldPassword)) {
                console.log('Old password was invalid')
            }
            else {
                thisUser.passwordHash = sha1(newPassword)
                thisUser.save()
            }
        }
    },
    async revokeAccessToken(accessToken) {
        console.log('revoke called', accessToken);
        await userAuth.findOneAndDelete({ accessToken })
        const res = {
            message: 'logged out!',
        }
        return res
    },
    async getUser(accessToken) {
        console.log('get data', accessToken)
        const userTokenData = await userAuth.findOne({ accessToken })
        const userInfo = await User.findOne({ _id: userTokenData.userId })
        const result = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            phoneNumber: userInfo.phoneNumber
        }
        return result
    },
    async fbLogin(accessToken, refreshToken, profile, done) {
        const { email, first_name, last_name } = profile._json;
        const userData = {
            email,
            firstName: first_name,
            lastName: last_name
        };
        new userAuth(userData).save();
        done(null, profile);
    }
}

module.exports = thisService