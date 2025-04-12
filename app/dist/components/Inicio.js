var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, Container, Row, Col } from "react-bootstrap";
export const Inicio = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios.get("http://localhost:4000/publicaciones/list");
            setPublicaciones(data);
        }
        catch (error) {
            Swal.fire("¡Oops! Ocurrió un error", "No se obtuvieron las publicaciones.", "error");
        }
    });
    return (<Container>
            <h2 className="my-4 text-center"> Últimas Publicaciones</h2>
            <Row className="justify-content-center">
                {publicaciones.length > 0 ? (publicaciones.map((post) => (<Col md={6} lg={4} key={post._id} className="mb-4">
                            <Card className="shadow-lg">
                                <Card.Img variant="top" src={post.imagen} alt={post.titulo}/>
                                <Card.Body>
                                    <Card.Title>{post.titulo}</Card.Title>
                                    <Card.Text>{post.descripcion}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>))) : (<p className="text-center">No hay publicaciones disponibles.</p>)}
            </Row>
        </Container>);
};
