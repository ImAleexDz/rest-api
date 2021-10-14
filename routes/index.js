// Definimos las rutas de nuestro proyecto
const express = require('express');
const router = express.Router();

// importar cliente
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController')

module.exports = function() {
    // Agrega nuevos clientes vía post
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    // Muestra cliente por Id
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    // Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar un registro
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    // ***** PRODUCTOS
    // Agregar nuevos productos
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);

    // Mostrar productos
    router.get('/productos', productosController.mostrarProductos);

    // Mostrar producto por id
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    // Actualizar producto
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);

    // Eliminar producto por id
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    return router;
}