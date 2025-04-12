import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import UsuarioContolador from "./controller/UsuarioControlador.js";
import PublicacionControlador from "./controller/PublicacionControlador.js";

dotenv.config();
const app = express();


mongoose.connect(process.env.DB).then(() => console.log("Conexión exitosa"));


app.use(cors());
app.use(helmet());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});


app.post("/usuario/registro", UsuarioContolador.registro);
app.post("/usuario/login", UsuarioContolador.login);


app.post("/publicacion/crear", upload.single("imagen"), PublicacionControlador.crearPublicacion);
app.put("/publicacion/actualizar/:id", PublicacionControlador.actualizarPublicacion);
app.delete("/publicacion/eliminar/:id", PublicacionControlador.eliminarPublicacion);


app.get("/publicaciones/list", PublicacionControlador.listarPublicaciones);

app.listen(4000, () => {
    console.log("Servidor corriendo en el puerto 4000");
});
