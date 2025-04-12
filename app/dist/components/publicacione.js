var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
export const CrearPublicacion = () => {
    const [publicacion, setPubli] = useState({
        _id: "",
        titulo: "",
        descripcion: "",
        imagen: ""
    });
    const cambiarInformacion = (e) => {
        e.preventDefault();
        const data = publicacion;
        data[e.target.name] = e.target.value;
        setPubli(Object.assign({}, data));
    };
    const eliminarPublicacion = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.delete(`http://localhost:4000/publicacion/eliminar/${id}`);
            Swal.fire("Publicación eliminada", "", "success");
        }
        catch (error) {
            Swal.fire("Error al eliminar", "", "error");
            console.error(error);
        }
    });
    const onSumbit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.post("http://localhost:4000/publicacion/crear", publicacion);
            Swal.fire("publicacion creada con exito", "", "error");
            console.log(publicacion);
        }
        catch (error) {
            Swal.fire("Ocurrio un Error", "", "error");
            console.log(error);
        }
    });
    return (<Container>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title>Crear evento</Card.Title>
                    <Form>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Titulo del evento</Form.Label>
                                    <Form.Control onChange={cambiarInformacion} name="titulo"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Numero de rondas</Form.Label>
                                    <Form.Control onChange={cambiarInformacion} name="descripcion"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                                <Form.Group>
                                    <Form.Label>Numero de rondas</Form.Label>
                                    <Form.Control onChange={cambiarInformacion} name="descripcion"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr></hr>
                        <div className='text-center'>
                            <Button onClick={() => onSumbit()}>Guardar evento</Button>
                        </div>

                        <Card.Body>
                        <Card.Title>{publicacion.titulo}</Card.Title>
                        <Card.Text>{publicacion.descripcion}</Card.Text>
                        <Button variant="danger" onClick={() => eliminarPublicacion(publicacion._id)}>
                            Eliminar
                        </Button>
                    </Card.Body>
                    </Form>
                </Card.Body>
            </Card>
        </Container>);
};
