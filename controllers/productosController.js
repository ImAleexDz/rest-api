const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

// Agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if (req.file) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({
            mensaje: 'Se agrego un nuevo producto'
        });
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const producto = await Productos.find({});
        res.json(producto)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar producto por id
exports.mostrarProducto = async (req, res, next) => {
    
    try {
        const producto = await Productos.findById(req.params.idProducto);
        if(!producto) {
            res.json({mensaje: 'Producto inexistente'});
            return next();
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.log(error);
        next();
    }
}

// Actualizar producto por id
exports.actualizarProducto = async (req, res, next) => {
    try {
        let productoAnterior = await Productos.findById(req.params.idProducto);

        // construir un nuevo producto
        let nuevoProducto = req.body;
        
        // Verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename
            // Se elimina la imagen anterior y se actualiza a la nueva imagen si llega a existir
            if (productoAnterior.imagen) {
                fs.unlink(__dirname + '../../uploads/' + productoAnterior.imagen, function (error) {
                    if (error) throw error;
                    console.log('File deleted')
                })
            }
        } else {
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({ _id: req.params.idProducto }, 
            nuevoProducto, {
                new: true
            });
        res.json(producto)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar producto por id
exports.eliminarProducto = async (req, res, next) => {
    try {
        // buscar la ruta de la imagen a eliminar
        const producto = await Productos.findById({ _id: req.params.idProducto});

        // Si existe la imagen la eliminamos
        if (producto.imagen) {
            fs.unlink(__dirname + '../../uploads/' + producto.imagen, function (error) {
                if (error) throw error;
                console.log('File deleted')
            })
        }

        await Productos.findOneAndDelete({ _id: req.params.idProducto });
        res.json({mensaje: 'Producto eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}