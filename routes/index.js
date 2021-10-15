// Definimos las rutas de nuestro proyecto
const express = require('express');
const router = express.Router();

// importar cliente
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

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

    // ***** PRODUCTOS
    // Nuevo pedido
    router.post('/pedidos', pedidosController.nuevoPedido);

    // Mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    // Mostrar producto por Id
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    // Actualizar un pedido por id
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    // Eliminar un pedido por id
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    return router;
}