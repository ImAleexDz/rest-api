const Pedidos = require('../models/Pedidos');

// Nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({mensaje: 'Se agregó pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({})
        .populate('cliente')
        .populate({
            // Busca la referencia conforme al nivel en el que se encuetra
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra pedido por id
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido)
    .populate('cliente')
    .populate({
        // Busca la referencia conforme al nivel en el que se encuetra
        path: 'pedido.producto',
        model: 'Productos'
    });

    try {
        if (!pedido) {
            res.json({mensaje: 'No existe pedido'});
            next();
        } else {
            res.json(pedido)
        }

    } catch (error) {
        console.log(error);
        next();
    }
}

// Actualizar pedido por id
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido }, 
            req.body, {
                new: true
            })
            .populate('cliente')
            .populate({
                // Busca la referencia conforme al nivel en el que se encuetra
                path: 'pedido.producto',
                model: 'Productos'
            });
        
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar pedido por id
exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
        res.json({mensaje: 'Pedido eliminado'});
    } catch (error) {
        console.log(error);
        res.json({mensaje: error});
        next();
    }
}