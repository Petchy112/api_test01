const express = require('express')
const router = express.Router()
const userService = require('../../../services/user')
const validate = require('validator')
const UniversalError = require('../../../error/UniversalError')
const withAuth = require('../middlewares/withAuth')



router.post('/register',async(req,res,next) => {
    try {
        var {body} = req
        //var errors = new UniversalError()
        if(!body.userName) {
            //errors.addError('empty/userName','Username was empty.');
            await res.json('Username was empty.');
            next(error)
        }
        else if(!body.password) {
            //errors.addError('empty/userName','Password was empty.');
            await res.json('Password was empty.');
            return
        }
        else if(!body.confirmPassword){
            //errors.addError('empty/userName','Confirm Password was empty');
            await res.json ('Confirm Password was empty')
            return
        }
        else if(body.confirmPassword !== body.password) {
            //errors.addError('match/password','Password is not match');
            await res.json('The password is not match.')
            return
        }
        if(!body.firstName){
            //errors.addError('empty/userName','Firstname was empty');
            await res.json('Firstname was empty.');
            return
        }
        if(!body.lastName){
            //errors.addError('empty/lastName','Lastname was empty');
            await res.json('Lastname was empty.');
            return
        }
        if(!body.email) {
            //errors.addError('empty/email','Email was empty');
            await res.json('Email was empty');
            return
        }
        else if(body.email && !validate.isEmail(body.email)) {
            //errors.addError('invalid/email','Email was invalid');
            await res.json('Email was invalid.')
            return
        }
        if(!body.phoneNumber) {
            //errors.addError('empty/phoneNumber','Phonenumber was empty');
            await res.json('Phonenumber was empty')
            return
        }
        // if(errors.amount > 0){
        //     throw errors
        // }
        
        const user = await userService.register(body)
        res.json({Message:'Done'}).status(201)
    }
    catch(error){
       next(error);
    }
})

router.post('/login',async (req,res,next) => {
    try{
        var {body} = req
        // var errors = new UniversalError()
        if(!body.userName) {
            console.log('Username was empty')
            // errors.addError('empty/userName','Username was empty');
        }
        if(!body.password) {
            console.log('Password was empty')
            // errors.addError('empty/password','Password was empty');
        }
        // if (errors.amount > 0) {
        //     throw error
        // }
        const user = await userService.login(body.userName,body.password)
        await res.json(user)
    }
    catch (error){
        next(error);
    }
})
router.post('/change/password',async (req,res,next) => {
    try {
        var {body} = req
        //var errors = new UniversalError()
        if(!body.oldPassword) {
            await res.json('Old password was empty')
            return
            //errors.addError('empty/oldPassword','old password was empty');
        }
        if(!body.newPassword) {
            await res.json('New password was empty');
            return
            //errors.addError('empty/newPassword','New password was empty');
        }
        if(!body.confirmPassword){
            await res.json('New Password was empty');
            return
            //errors.addError('empty/confirmPassword','Confirm password was empty');
        }
        if(body.confirmPassword !== body.newPassword){
            await res.json('Password is not match!')
            return
            //errors.addError('match/password','Password not match');
        }
        // if(errors.amount > 0){
        //     throw errors
        // }
        const user = await userService.changePassword(req.query.userName,body.oldPassword,body.newPassword)
        res.json({Message:'Password Changed'})
    }
    catch(error){
        next(error)
    }
})

router.post('/logout',async(req,res) => {
    const logout = await userService.revokeAccessToken(req.headers.authorization)
    console.log(req.headers.authorization)
    res.json(logout)
})

module.exports = router