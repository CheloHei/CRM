const Pedidos = require('../models/Pedidos');


exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({ mensaje: 'Se realizo el pedido correctamente' })
    } catch (error) {
        console.log(error);
        next();
    }


}
exports.listarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({})
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            })
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.listarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findById(req.params.idPedido)
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            })
        if (!pedido) {
            res.json({ mensaje: 'Ese pedido no existe' })
            return next();
        }
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.actualizarPedido = async (req, res, next) => {
    try {

        const pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido },
            req.body, { new: true })
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            });

        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}
//eliminar producto
exports.eliminarPedido = async (req, res, next) => {
    try {
        //construir un nuevo producto
        await Pedidos.findByIdAndDelete({ _id: req.params.idPedido });
        res.json({ mensaje: 'Se ha eliminado el pedido correctamente' });
    } catch (error) {
        console.log(error);
        next();
    }
}