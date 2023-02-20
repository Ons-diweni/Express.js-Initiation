var mongoose = require('mongoose')

const UserShema = mongoose.Schema(
    cin = { type: Number, required: true },
    nom = { type: String },
    prenom = { type: String },
    email = { type: String })



//Le module.exports est une fonctionnalité de Node.js
// qui permet de rendre un objet, une fonction ou une variable disponible pour une autre partie de l'application.
//création d'un modèle de données User en utilisant le schéma "UserSchema"  , La méthode  model  transforme le shéma en un modèle utilisable.
module.exports = mongoose.model('User', UserShema)