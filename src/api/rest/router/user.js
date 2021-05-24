const express = require('express')
const router = express.Router()
const validate = require('validator')
const userService = require('../../../services/user')

router.post('/register',async(req,res,next) => {
    try {
        var {body} = req
        if(!body.userName) {
            console.log('Username was empty.');
        }
        if(!body.password) {
            console.log('Password was empty.');
        }
        else if(!body.confirmPassword){
            console.log('Confirm Password was empty')
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

        const user = userService.register(body)
        res.json(user)
    }
    catch(error){
        next(error);
    }
})

router.post('/login',async (req,res,next) => {
    try{
        var {body} = req
        if(!userName){
            console.log('Username was empty');
        }
        if(!password){
            console.log('Password was empty');
        }
        const user = await userService.login(body.email,body.password)
        res.json(user)
    }
    catch (error){
        next(error);
    }
})

module.exports = router