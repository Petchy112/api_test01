const express = require('express')
const router = express.Router()
const userService = require('../../../services/user')
const validate = require('validator')
const UniversalError = require('../../../error/universalError')


router.post('/register',async(req,res,next) => {
    try {
        var {body} = req
        var errors = new UniversalError()
        if(!body.userName) {
            await res.json('Username was empty.');
            next(error)
        }
        else if(!body.password) {
            await res.json('Password was empty.');
            return
        }
        else if(!body.confirmPassword){
            console.log('Confirm Password was empty')
            errors.addError('empty/confirm','it was empty')
        }
        else if(body.confirmPassword !== body.password) {
            console.log('The password is not match.')
        }
        if(!body.firstName){
            console.log('Firstname was empty.');
        }
        if(!body.lastName){
            console.log('Lastname was empty.');
        }
        if(!body.email) {
            console.log('Email was empty');
        }
        else if(body.email && !validate.isEmail(body.email)) {
            console.log('Email is invalid.')
        }
        if(!body.phoneNumber) {
            console.log('Phonenumber was empty')
        }
        
        const user = await userService.register(body)
        res.json(user)
    }
    catch(error){
       next(error);
    }
})

router.post('/login',async (req,res,next) => {
    try{
        var {body} = req
        //var errors = new UniversalError()
        if(!body.userName) {
            console.log('Username was empty')
            //errors.addError('empty/userName','Username was empty');
        }
        if(!body.password) {
            console.log('Password was empty')
            //errors.addError('empty/password','Password was empty');
        }
        // if (errors.amount > 0) {
        //     throw error
        // }
        const user = await userService.login(body.userName,body.password)
        res.json(user)
    }
    catch (error){
        next(error);
    }
})
router.post('/change/password',async (req,res,next) => {
    try {
        var {body} = req
        if(!body.oldPassword) {
            console.log('Old password was empty')
        }
        if(!body.newPassword) {
            console.log('New password was empty');
        }
        if(!body.confirmPassword){
            console.log('New Password was empty');
        }
        if(body.confirmPassword !== body.newPassword){
            console.log('Password is not match!')
        }
        const user = await userService.changePassword(req.query.userName,body.oldPassword,body.newPassword)
        res.json(user)
    }
    catch(error){
        next(error)
    }
})

module.exports = router