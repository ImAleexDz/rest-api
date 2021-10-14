const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
});

// Crear el servidor
const app = express();

// Habilitar body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Rutas de la app
app.use('/', routes());

//puerto
app.listen(5000)