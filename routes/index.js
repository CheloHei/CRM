const express = require('express');

const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//middle apra proteger rutas
const auth = require('../middleware/auth');


module.exports = function(){
    /**
     * CLIENTES
     */
    //Agregar nuevos clientes por verbo POST
    router.post('/clientes',
auth,
        clienteController.nuevoCliente);
    //Listar todos los clientes
    router.get('/clientes',
        auth,
        clienteController.listarClientes);
    //listar cliente por id
    router.get('/clientes/:idCliente',
auth,
        clienteController.listarCliente)
    //actualizar cliente
    router.put('/clientes/:idCliente',
auth,
        clienteController.actualizarCliente)
    //eliminar
    router.delete('/clientes/:idCliente',
auth,
        clienteController.eliminarCliente);

    /**
     * PRODUCTOS
     */
    router.post('/productos',
    

    productosController.subirArchivo,
    productosController.nuevoProducto);

    router.get('/productos',

        productosController.listarProductos);
    //listar un producto
    router.get('/productos/:idProducto',

        productosController.listarProducto);
    //actualizar productos
    router.put('/productos/:idProducto',

        productosController.subirArchivo,
    productosController.actualizarProducto);
    ///eliminar producto
    router.delete('/productos/:idProducto',

        productosController.eliminarProducto);
    //buscar producto
    router.post('/productos/busqueda/:query',

        productosController.buscarProducto);
    /**
     * PEDIDOS
     */
    router.post('/pedidos/nuevo/:idUsuario',
    

    pedidosController.nuevoPedido);

    router.get('/pedidos',

        pedidosController.listarPedidos);
    //listar un Pedido
    router.get('/pedidos/:idPedido',

        pedidosController.listarPedido);
    //actualizar Pedidos
    router.put('/pedidos/:idPedido',
    

    pedidosController.actualizarPedido);
    ///eliminar Pedido
    router.delete('/pedidos/:idPedido',

        pedidosController.eliminarPedido); 
    /**
     * USUARIOS
     */
     router.post('/crear-cuenta',
       
auth,
        usuariosController.registrarUsuario
        );
     router.post('/iniciar-sesion',
        

        usuariosController.autenticarUsuario
        );

    return router;
};
