import validator from 'validator'

export default class Contato {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events()
    }

    events(){

        //verify if the form exists
        if(!this.form) return
        
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })

    }

    validate(e){
        const element = e.target

        const nameInput = element.querySelector('input[name="name"]')
        const lastNameInput = element.querySelector('input[name="lastname"]')
        const emailInput = element.querySelector('input[name="email"]')
        const phoneInput = element.querySelector('input[name="phone"]')

        let error = false;

        if(!nameInput.value.length > 0){
            alert('Type a name');
            error = true;
        }

        if(!lastNameInput.value.length > 0){
            alert('Type a lastname');
            error = true;
        }

        if(!validator.isEmail(emailInput.value)) {
            alert('Invalid email')
            error = true;
        }

        if(phoneInput.value.length <= 0 || phoneInput.value.length > 11){
            alert('Invalid phone')
            error = true
        }

        if(!error) e.submit()
    }

}