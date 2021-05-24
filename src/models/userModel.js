const mongoose = require('mongoose')

var schema = mongoose.Schema (
    {
        userName = {type:String,require:true},
        password = {type:String,require:true},
        firstName = {type:String,require:true},
        lastName = {type:String,require:true},
        email = {type:String,require:true},
        phoneNumber = {type:String,require:tru}
    }
)
const {User} = mongoose.Model('User',schema);
module.exports = User
