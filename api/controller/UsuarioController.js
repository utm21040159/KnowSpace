import {UsuariosModelo} from "../model/UsuariosModelo.js"

export default {
    registro: async(req, res)=>{
        try{

            
            const usuario = {
                nombre:req.body.nombre,
                contraseña:hash,
                correo: req.body.correo,
                
            };
            await UsuariosModelo.create(usuario);
            res.status(200).json({msg:"Usuario Registrado"})
        }catch (error){
            res.status(500).json({msg:"Ocurrio un error al registrar"});
            console.log(error)
        }
        
    },

    login: async (req,res)=>{

        try {
            const correo = req.body.correo;
        const contraseña = req.body.contraseña

        if(!correo || !contraseña){
            return res.status(400).json({msg: "Parametros invalidos"})
        }

        const usuario = await UsuariosModelo.findOne({correo});
        if (!usuario){
            return res.status(400).json({msg: "Usuario no encontrado"})
        }
        if(!bcrypt.compare(contraseña, usuario.contraseña)){
            return res.status(400).json({msg: "Usuario no encontrado"})
        }

        const load = {id: usuario.id, correo: usuario.correo}
        const token = await jwt.sign(JSON.stringify(usuario),process.env.PRIVATE_KEY);

        return res.status(200).json({token})

        } catch (error) {
            return res.status(500).json({"Status":"Nooo"})
            console.log(err)
        }

        
    }

    
}