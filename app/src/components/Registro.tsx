import React, { useState } from "react";
import { Card, CardBody, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { IUsuario } from "../Types";
import { useNavigate } from "react-router-dom";



export const Registro = () => {


  const navigate = useNavigate();
    const [data, setData] = useState<IUsuario>({

        nombre: "",
        correo: "",
        contraseña: "",
       

    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const tempoData: any = data;
        tempoData[e.target.name] = e.target.value;
        setData(tempoData)
    }

    const onSumbit = async () => {
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading();
            
            await axios.post("http://localhost:4000/usuario/registro", data)
            Swal.fire("Datos Guardados Correctamnete")
            navigate("/registro");
        } catch (error: any) {
            console.log(error)
            Swal.fire("Algo salio mal", error.response.data.msg);
        }
        
    }
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 w-100"
        style={{ backgroundColor: "#b0b0b0" }}
      >
        <Card style={{ width: "25rem" }} className="shadow-lg p-4 rounded">
          <Card.Body>
            <h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>
            <Form >
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="nombre"
                  value={data.nombre}
                  onChange={onChange}
                  required
                  style={{ color: "#000" }}
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  placeholder="correo@email.com"
                  value={data.correo}
                  onChange={onChange}
                  required
                  style={{ color: "#000" }}
                />
              </Form.Group>
  
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contraseña"
                  placeholder="********"
                  value={data.contraseña}
                  onChange={onChange}
                  required
                  style={{ color: "#000" }}
                />
              </Form.Group>
  
              <Button variant="primary" type="submit" className="w-100 fw-bold" onClick={() => onSumbit()}>
                Registrarse
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
}