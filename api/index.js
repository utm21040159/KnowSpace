import dotenv from 'dotenv';
import express from 'express';
import  mongoose  from 'mongoose';
import cors from 'cors'; 
import helmet from 'helmet';
import UsuarioController from './controller/UsuarioController.js';

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

app.post("/usuario/registro", UsuarioController.registro)
app.post("/usuario/login", UsuarioController.login)