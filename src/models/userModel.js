const mongoose = require('mongoose')

var schema = mongoose.Schema (
    {
        userName : String,
        password :String,
        firstName :String,
        lastName :String,
        email :String,
        phoneNumber :String,
    }
)
const {User} = mongoose.model('User',schema);
module.exports = User
