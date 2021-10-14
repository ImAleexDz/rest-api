const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// trim elimina los espacios en blanco

const ClientesSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Clientes', ClientesSchema)