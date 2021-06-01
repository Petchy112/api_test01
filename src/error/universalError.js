const oc = require('js-optchain')

var key,
message
class UniversalError extends Error {
    state = {}
    amount = 0
    universal = true
    status = 400
    message = 'request/invalid'
     

    constructor(errors= { key, message, }, message = 'request/invalid', status = 400) {
        super(message)
        this.status = status
        this.message = message

        if(oc(errors).length > 0) {
            errors.forEach(error => {
                this.addError(error.key,error.message)
            });
        }
    }
    addError(key,message){
        this.state[key] = message
        this.amount++
    }
}
module.exports = UniversalError