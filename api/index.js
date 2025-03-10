import dotenv from 'dotenv';
import express from 'express';
import  mongoose  from 'mongoose';
import cors from 'cors'; 
import helmet from 'helmet';
import UsuarioContolador from './controller/UsuarioControlador.js';
import PublicacionControlador from './controller/Publicacion.Controlador.js';

dotenv.config();


const app = express();

mongoose.connect(process.env.DB).then(()=>console.log("coneccion exitosa"))



app.use(cors());
app.use(helmet());
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("SIIII")
})



app.listen(4000,()=>{
    console.log("Servidor corriendo")
})

app.post("/usuario/registro", UsuarioContolador.registro)
app.post("/usuario/login", UsuarioContolador.login)

app.post("/publicacion/crear", PublicacionControlador.crearPublicacion)
app.put("/publicacion/actualizar/:id", PublicacionControlador.actualizarPublicacion)
app.delete("/eliminar/:id", PublicacionControlador.eliminarPublicacion);