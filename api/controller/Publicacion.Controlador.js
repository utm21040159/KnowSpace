import { PublicacionModelo } from "../model/PublicacionModelo.js"



export default {
    crearPublicacion: async (req, res) => {
        try {
            const {titulo,descripcion,imagen}= req.body

            if (!titulo || !descripcion || !imagen) {
                return res.status(400).json({ msg: "Todos los campos son obligatorios" });
            }
            const publicacion = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen
            }

            await PublicacionModelo.create(publicacion)
            res.status(200).json({ "status": "se creo la publicacion" })

        } catch (err) {

            res.status(500).json({ "status": "Error" })
            console.log(err)

        }
    },

    actualizarPublicacion: async(res, req)=>{
        try {
            const idpublicacion = req.params.id;
        const publi = await PublicacionModelo.findById(idpublicacion);
        if(!publi){
            return res.status(400).json({msg: "Elevento no existe"})
        }

        if (!titulo || !descripcion || !imagen) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }
           await PublicacionModelo.findByIdAndUpdate(idpublicacion,{
            $set:{
                titulo,
                descripcion,
                imagen
            }
           })
        } catch (error) {
            res.status(500).json({ "status": "Error" })
        }
    },

    eliminarPublicacion: async (req, res) => {
        try {
            const { id } = req.params;

            const publicacion = await PublicacionModelo.findById(id);
            if (!publicacion) {
                return res.status(404).json({ msg: "La publicación no existe" });
            }

            await PublicacionModelo.findByIdAndDelete(id);
            res.status(200).json({ status: "Publicación eliminada con éxito" });

        } catch (error) {
            res.status(500).json({ status: "Error al eliminar la publicación" });
            console.log(error);
        }
    },

    

   
}