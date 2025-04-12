import { PublicacionModelo } from "../model/PublicacionModelo.js";
import cloudinary from "../config/cloudinary.js";

export default {
    crearPublicacion: async (req, res) => {
        try {
            const { titulo, descripcion } = req.body;
            const file = req.file; // Archivo de imagen

            if (!titulo || !descripcion) {
                return res.status(400).json({ msg: "Título y descripción son obligatorios" });
            }

            if (!file) {
                return res.status(400).json({ msg: "Imagen requerida" });
            }

            // Subir imagen a Cloudinary
            const resultado = await cloudinary.uploader.upload(file.path, {
                folder: "publicaciones"
            });

            const publicacion = {
                titulo,
                descripcion,
                imagen: resultado.secure_url // URL de Cloudinary
            };

            await PublicacionModelo.create(publicacion);
            res.status(201).json({ status: "Publicación creada con éxito", publicacion });

        } catch (err) {
            res.status(500).json({ status: "Error al crear la publicación" });
            console.log(err);
        }
    },

    actualizarPublicacion: async (req, res) => {
        try {
            const { id } = req.params;
            const { titulo, descripcion } = req.body;
            const file = req.file; // Nueva imagen

            const publicacion = await PublicacionModelo.findById(id);
            if (!publicacion) {
                return res.status(404).json({ msg: "La publicación no existe" });
            }

            let nuevaImagen = publicacion.imagen; // Mantener la imagen anterior

            if (file) {
                // Subir nueva imagen a Cloudinary
                const resultado = await cloudinary.uploader.upload(file.path, {
                    folder: "publicaciones"
                });
                nuevaImagen = resultado.secure_url;
            }

            // Actualizar publicación
            await PublicacionModelo.findByIdAndUpdate(id, {
                titulo,
                descripcion,
                imagen: nuevaImagen
            });

            res.status(200).json({ status: "Publicación actualizada con éxito" });

        } catch (error) {
            res.status(500).json({ status: "Error al actualizar la publicación" });
            console.log(error);
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


    listarPublicaciones: async (req, res) => {
        try {
            const publicaciones = await PublicacionModelo.find(); // o como se llame tu modelo
            res.json(publicaciones);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener publicaciones" });
        }
    }
};
