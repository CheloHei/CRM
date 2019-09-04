const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
//Opciones de Multer
const configuracionMulter = {
    limits: { fileSize: 100000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];

            cb(null, `${shortid.generate()}.${extension}`);

        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //callback es true  o false
            cb(null, true);

        } else {
            cb(new Error('Formato No Válido'), false);
        }
    }

}
const upload = multer(configuracionMulter).single('imagen');


//subir archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {

            res.json({ mensaje: error })
        }
        return next();
    })
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({ mensaje: 'Se agrego el producto correctamente' })
    } catch (error) {
        console.log(error);
        next();
    }


}
exports.listarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.listarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto);
        if (!producto) {
            res.json({ mensaje: 'Ese producto no existe' })
            return next();
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.actualizarProducto = async (req, res, next) => {
    try {
        //construir un nuevo producto
        let nuevoProducto = req.body;
        //verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        }else{
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        const producto = await Productos.findOneAndUpdate({ _id: req.params.idProducto },
            nuevoProducto, { new: true });

        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}
//eliminar producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        //construir un nuevo producto
        await Productos.findByIdAndDelete({_id:req.params.idProducto});
        res.json({mensaje:'Se ha eliminado el producto correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
}
    //eliminar producto
exports.buscarProducto = async (req, res, next) => {
    try {
        //construir un nuevo producto
        const {query} = req.params;
        const producto = await Productos.find({descripcion: new RegExp(query,'i')});
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}