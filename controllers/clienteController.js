const Clientes = require('../models/Clientes');

//agrega un nuevo cliente
exports.nuevoCliente = async(req,res,next)=>{
    const cliente = new Clientes(req.body);

    try {
        //almacenar registro
        await cliente.save();
        res.json({mensaje:'Se agrego un nuevo cliente'})
    } catch (error) {
        res.send(error);
        next();
    }

}
//Listar clientes
exports.listarClientes = async(req,res,next)=>{
    
    try {
        //almacenar registro
        const clientes = await Clientes.find({});

        res.json(clientes)
    } catch (error) {
        console.log(error);
        next();
    }

}

//Listar clientes
exports.listarCliente = async(req,res,next)=>{
    
    try {
        //almacenar registro
        const cliente = await Clientes.findById(req.params.idCliente);
        if (!cliente) {
            res.json({mensaje:'No existe el Cliente'})
            next();
        }
        res.json(cliente)
    } catch (error) {
        console.log(error);
        next();
    }

}
//actualizar cliente por id
exports.actualizarCliente = async(req,res,next)=>{
    try {
        const cliente = await Clientes.findOneAndUpdate({_id:req.params.idCliente},req.body,{
            new:true
        });
        if (!cliente) {
            res.json({mensaje:'No existe el Cliente'})
            next();
        }
        res.json(cliente)

    } catch (error) {
        console.log(error);
        next();
    }
}
//eliminar cliente por id
exports.eliminarCliente = async(req,res,next)=>{
    try {
        await Clientes.findOneAndDelete({_id:req.params.idCliente})
        
        res.json({mensaje:'El cliente se ha eliminado correctamente'})
        

    } catch (error) {
        console.log(error); 
        next();
    }
}