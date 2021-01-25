const mongoose = require('mongoose');
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createdDate: {type: Date, default: Date.now}
  
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body){
  this.body = body;
  this.errors = []
  this.contact = null
}



Contact.prototype.register = async function(){
  this.valida()

  if(this.errors.length > 0) return;
  this.contact = await ContactModel.create(this.body);
}

Contact.prototype.valida = function(){
  this.cleanUp()

  
  //the email needs to be valid
  if(this.body.email && !validator.isEmail(this.body.email)){
    this.errors.push('Invalid Email')
  }

  if(!this.body.name) this.errors.push('Name need to be filled')

  if(!this.body.email && !this.body.phone){
    this.errors.push('At least, one contact need to be send: e-mail or phone');
  }

  return;



}

//clean the object
Contact.prototype.cleanUp = function(){
  for(const key in this.body){
    if( typeof this.body[key] != 'string' ){
      this.body[key] = '';
    }
  }

  this.body = {
    name: this.body.name,
    lastname: this.body.lastname,
    email: this.body.email,
    phone: this.body.phone
  }
}

Contact.prototype.edit = async function(id){
  if(typeof id !== 'string') return;

  this.valida()
  if(this.errors.length > 0) return
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new: true})

}


//statics methods
Contact.findId = async function(id){
  if(typeof id !== 'string') return
  const user = await ContactModel.findById(id);
  return user;
}

Contact.findContacts = async function(){
  const contacts = await ContactModel.find().sort({createdDate: -1});
  return contacts;
}

Contact.delete = async function(id){
  if(typeof id !== 'string') return
  const contact = await ContactModel.findOneAndDelete({_id: id});
  return contact;
}


module.exports = Contact;
