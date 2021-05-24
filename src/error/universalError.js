import {oc} from ('js-optchain')

class UniversalError extends Error {
    state = {}
    amount = 0
    universal = true
    status = 400
    message = 'request/invalid'
    
    constructor(error ={key,message}){
        super(message)
        this.status = status
        this.message = message

        if(oc(error),length > 0){
            error.forEach(error => {
                this.addError(error.key,error.message)
            });
        }
    }
    addError(key,message){
        this.state[key] = message
        this.amount++
    }
}