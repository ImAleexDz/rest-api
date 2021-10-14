const Clientes = require('../models/Clientes.js');

// agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        // Almacenar registro
        await cliente.save();
        res.json({ mensaje: 'Se agrego un nuevo cliente' })
    } catch (error) {
        // si hay error, console.log y next
        console.log(error);
        next();
    }
}

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un cliente por id
exports.mostrarCliente = async (req, res, next) => {

    try {
        // Mostrar cliente
        const cliente = await Clientes.findById(req.params.idCliente);

        res.json(cliente);
    } catch (error) {
        // Si cliente no existe
        console.log(error)
        res.json({ mensaje: 'Cliente no existente' });
        next();
    }
}

// Actualizar cliente por id
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente },
            req.body, {
            // Almacena el valor nuevo
            new: true
        })
        res.json(cliente)
    } catch (error) {
        console.log(error)
        next();
    }
}

// Eliminar cliente por id
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({ _id: req.params.idCliente });
        res.json({ mensaje: 'Cliente eliminado' })
    } catch (error) {
        console.log(error)
        next();
    }
}