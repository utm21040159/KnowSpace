var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
export const registro = () => {
    const [data, setData] = useState({
        nombre: "",
        correo: "",
        contraseña: ""
    });
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
            yield axios.post("http://localhost:4000/usuario/registro", data);
            Swal.fire("Datos Guardados Correctamnete");
        }
        catch (error) {
            console.log(error);
            Swal.fire("Algo salio mal", error.response.data.msg);
        }
    });
    return (<Container>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control name="nombre" onChange={onChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control name="correo" onChange={onChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control type="password" name="contraseña" onChange={onChange}/>
                        </Form.Group>

                        <Button onClick={() => onSumbit()}>ENVIAR</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>);
};
