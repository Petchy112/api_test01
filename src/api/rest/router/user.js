const express = require('express')
const router = express.Router()
const userService = require('../../../services/user')
const validate = require('validator')
const UniversalError = require('../../../error/universalError')


router.post('/register',async(req,res,next) => {
    try {
        var {body} = req
        //var errors = new UniversalError()
        if(!body.userName) {
            await res.json('Username was empty.');
            next(error)
        }
        else if(!body.password) {
            await res.json('Password was empty.');
            return
        }
        else if(!body.confirmPassword){
            await res.json ('Confirm Password was empty')
            return
        }
        else if(body.confirmPassword !== body.password) {
            await res.json('The password is not match.')
            return
        }
        if(!body.firstName){
            await res.json('Firstname was empty.');
            return
        }
        if(!body.lastName){
            await res.json('Lastname was empty.');
            return
        }
        if(!body.email) {
            await res.json('Email was empty');
            return
        }
        else if(body.email && !validate.isEmail(body.email)) {
            await res.json('Email is invalid.')
            return
        }
        if(!body.phoneNumber) {
            await res.json('Phonenumber was empty')
            return
        }
        
        const user = await userService.register(body)
        res.json({Message:'Done'})
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
        res.json({Message:'Login Successful'})
    }
    catch (error){
        next(error);
    }
})
router.post('/change/password',async (req,res,next) => {
    try {
        var {body} = req
        if(!body.oldPassword) {
            await res.json('Old password was empty')
        }
        if(!body.newPassword) {
            await res.json('New password was empty');
        }
        if(!body.confirmPassword){
            await res.json('New Password was empty');
        }
        if(body.confirmPassword !== body.newPassword){
            await res.json('Password is not match!')
        }
        const user = await userService.changePassword(req.query.userName,body.oldPassword,body.newPassword)
        res.json({Message:'Password Changed'})
    }
    catch(error){
        next(error)
    }
})

module.exports = router