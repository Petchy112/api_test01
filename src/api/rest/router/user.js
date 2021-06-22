const express = require('express')
const router = express.Router()
const userService = require('../../../services/user')
const validate = require('validator')
const UniversalError = require('../../../error/UniversalError')
const withAuth = require('../middlewares/withAuth')
const { getUser } = require('../../../services/user')
const passport = require("passport")
const strategy = require("passport-facebook")
const config = require('../../../config')



router.post('/register', async (req, res, next) => {
    try {
        var { body } = req
        //var errors = new UniversalError()
        if (!body.userName) {
            //errors.addError('empty/userName','Username was empty.');
            await res.json('Username was empty.');
            next(error)
        }
        else if (!body.password) {
            //errors.addError('empty/userName','Password was empty.');
            await res.json('Password was empty.');
            return
        }
        else if (!body.confirmPassword) {
            //errors.addError('empty/userName','Confirm Password was empty');
            await res.json('Confirm Password was empty')
            return
        }
        else if (body.confirmPassword !== body.password) {
            //errors.addError('match/password','Password is not match');
            await res.json('The password is not match.')
            return
        }
        if (!body.firstName) {
            //errors.addError('empty/userName','Firstname was empty');
            await res.json('Firstname was empty.');
            return
        }
        if (!body.lastName) {
            //errors.addError('empty/lastName','Lastname was empty');
            await res.json('Lastname was empty.');
            return
        }
        if (!body.email) {
            //errors.addError('empty/email','Email was empty');
            await res.json('Email was empty');
            return
        }
        else if (body.email && !validate.isEmail(body.email)) {
            //errors.addError('invalid/email','Email was invalid');
            await res.json('Email was invalid.')
            return
        }
        if (!body.phoneNumber) {
            //errors.addError('empty/phoneNumber','Phonenumber was empty');
            await res.json('Phonenumber was empty')
            return
        }
        // if(errors.amount > 0){
        //     throw errors
        // }

        const user = await userService.register(body)
        res.json(user).status(200)
    }
    catch (error) {
        next(error);
    }
})
router.post('/login', async (req, res, next) => {
    try {
        var { body } = req
        // var errors = new UniversalError()
        if (!body.userName) {
            console.log('Username was empty')
            // errors.addError('empty/userName','Username was empty');
        }
        if (!body.password) {
            console.log('Password was empty')
            // errors.addError('empty/password','Password was empty');
        }
        // if (errors.amount > 0) {
        //     throw error
        // }
        const user = await userService.login(body.userName, body.password)
        await res.json(user)
    }
    catch (error) {
        next(error);
    }
})
router.post('/changePassword', async (req, res, next) => {
    try {
        var { oldPassword, newPassword, confirmPassword } = req.body
        //var errors = new UniversalError()
        if (!oldPassword) {
            await res.json('Old password was empty')
            return
            //errors.addError('empty/oldPassword','old password was empty');
        }
        if (!newPassword) {
            await res.json('New password was empty');
            return
            //errors.addError('empty/newPassword','New password was empty');
        }
        if (!confirmPassword) {
            await res.json('New Password was empty');
            return
            //errors.addError('empty/confirmPassword','Confirm password was empty');
        }
        if (confirmPassword !== newPassword) {
            await res.json('Password is not match!')
            return
            //errors.addError('match/password','Password not match');
        }
        // if(errors.amount > 0){
        //     throw errors
        // }
        const user = await userService.changePassword(userName, oldPassword, newPassword)
        res.json({ Message: 'Password Changed' })
    }
    catch (error) {
        next(error)
    }
})
router.post('/logout', withAuth, async (req, res) => {
    const logout = await userService.revokeAccessToken(req.headers.authorization.replace('Bearer ', ''))
    res.json(logout)
})
router.get('/data', async (req, res) => {
    try {
        const result = await userService.getUser(req.headers.authorization.replace('Bearer ', ''))
        res.json(result)
    }
    catch (error) {
        error
    }
})


router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
})
);

router.get("/fail", (req, res) => {
    res.send("Failed attempt");
});

router.get("/", (req, res) => {
    res.send("Success");
});


const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new FacebookStrategy(
        {
            clientID: config.facebookAuth.facebook_api_key,
            clientSecret: config.facebookAuth.facebook_api_secret,
            callbackURL: config.facebookAuth.callbackURL,
            profileFields: ["email", "name"]
        },
    )
);
module.exports = router