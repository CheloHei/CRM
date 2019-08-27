const express = require('express');

const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');


module.exports = function(){
    /**
     * CLIENTES
     */
    //Agregar nuevos clientes por verbo POST
    router.post('/clientes',clienteController.nuevoCliente);
    //Listar todos los clientes
    router.get('/clientes',clienteController.listarClientes);
    //listar cliente por id
    router.get('/clientes/:idCliente',clienteController.listarCliente)
    //actualizar cliente
    router.put('/clientes/:idCliente',clienteController.actualizarCliente)
    //eliminar
    router.delete('/clientes/:idCliente',clienteController.eliminarCliente);

    /**
     * PRODUCTOS
     */
    router.post('/productos',
    productosController.subirArchivo,
    productosController.nuevoProducto);

    router.get('/productos',productosController.listarProductos);
    //listar un producto
    router.get('/productos/:idProducto',productosController.listarProducto);
    //actualizar productos
    router.put('/productos/:idProducto',productosController.subirArchivo,
    productosController.actualizarProducto);
    ///eliminar producto
    router.delete('/productos/:idProducto',productosController.eliminarProducto);


    return router;
};
