const mongoose = require('mongoose')

var schema = mongoose.Schema (
    {
        userName :{
            type:String,
            require:true
        },
        accessToken :{
            type:String,
            require:false
        },
        accessTokenExpiresAt:{
            type:Date,
            require:false
        },

    },
    {
        timestamp : true,
    },
)
var UserAuth = mongoose.model('UsersAuth',schema);
module.exports = UserAuth
