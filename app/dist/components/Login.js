var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
export const Login = () => {
    const [data, setData] = useState({});
    const onChange = (e) => {
        e.preventDefault();
        const tempoData = data;
        tempoData[e.target.name] = e.target.value;
        setData(tempoData);
    };
    const onSumbit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading();
            yield axios.post("http://localhost:4000/usuario/login", data);
            Swal.fire("Iniciando Sesion");
        }
        catch (error) {
            console.log(error);
            Swal.fire("Algo salio mal", error.response.data.msg);
        }
    });
    return (<Container>
            <Card style={{ width: "30rem", margin: "auto" }} className="mt-4">
                <Card.Body>
                    <Card.Title className="text-center "> Bienvenido inicia sesion </Card.Title>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Correo:</Form.Label>
                                <Form.Control className="mb-3" name="correo" onChange={onChange}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control type="password" className="mb-3" name="contraseña" onChange={onChange}></Form.Control>
                            </Form.Group>
                                
                            
                        </Col>
                    </Row>
                    <Row className="text-center ">
                        <Col>
                            <Button className="m-3" onClick={() => onSumbit()}> Ingresa </Button>
                        </Col>
                    </Row>
                        <Row>
                            <Col>
                            Olvidaste tu contrasena? Recuperala aqui <a> aqui </a>
                            </Col>
                            <Col>
                            Todavia no tienes cuenta? Registrate aqui <a> aqui </a>
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
        </Container>);
};
