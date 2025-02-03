import {Schema, model } from "mongoose"


const UsuarioSchema = new Schema([
    {
        nombre:{
            type:String,
            required: true
        }
    },

    {
        contraseña:{
            type:String,
            required:true
        }
    },

    {
        correo:{
            type:String,
            required: true
        }
    }
   
])

export const UsuarioModel = model('Usuarios', UsuarioSchema)
