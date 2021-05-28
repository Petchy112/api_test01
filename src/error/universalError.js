const oc = require('js-optchain')


var key,message,status
class UniversalError extends Error {
    state = Object
    amount = 0
    universal = true
    status = 400
    message = 'request/invalid'
    

    constructor(errors = {key,message}) {
        super(message)
        this.status = status
        this.message = message

        if(oc(errors),length > 0) {
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