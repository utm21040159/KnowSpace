import React , {useState} from 'react';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
                                              
export const Login = () => {
    const [data, setData ] = useState({})

    const navigate = useNavigate();
    
    const onChange = (e:any)=>{
        e.preventDefault()
        const tempoData:any = data;
        tempoData[e.target.name]= e.target.value;
        setData(tempoData)
    }

    const onSumbit = async () =>{
        try {
            Swal.fire("Guardando datos");
        Swal.showLoading();
        await axios.post("http://localhost:4000/usuario/login", data)
        Swal.fire("Iniciando Sesion")
        navigate("/inicio");
        } catch (error: any) {
            console.log(error)
            Swal.fire("Algo salio mal", error.response.data.msg)
        }

    }
    return (
        
            <div style={{
                backgroundColor: "#bfbfbf",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Card style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "2rem",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                }}>
                    <h3 className="text-center" style={{ color: "#007bff", fontWeight: "bold" }}>
                        Iniciar Sesión
                    </h3>
    
                    <Form className="mt-4">
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Correo</strong></Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                placeholder="correo@email.com"
                                onChange={onChange}
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-4">
                            <Form.Label><strong>Contraseña</strong></Form.Label>
                            <Form.Control
                                type="password"
                                name="contraseña"
                                placeholder="********"
                                onChange={onChange}
                            />
                        </Form.Group>
    
                        <Button
                            style={{ backgroundColor: "#007bff", border: "none" }}
                            className="w-100"
                            onClick={onSumbit}
                        >
                            Ingresar
                        </Button>
    
                        <div className="text-center mt-3">
                            <br />
                            <small>
                                ¿No tienes cuenta?{" "}
                                <a href="/registro">Regístrate aquí</a>
                            </small>
                        </div>
                    </Form>
                </Card>
            </div>
        );
}