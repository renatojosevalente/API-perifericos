const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    nome: String,
    email:String,
    senha:String
});

userSchema.statics.getOne = function(email){
    return this.findOne({email});
}

const Usuario = mongoose.model("Usuario", userSchema);

module.exports = Usuario;