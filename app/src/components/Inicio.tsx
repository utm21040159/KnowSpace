import axios from "axios";
import React,{ useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, Container, Row, Col } from "react-bootstrap";
import { IPubli } from "../Types";

export const Inicio = () => {
    const [publicaciones, setPublicaciones] = useState<IPubli[]>([]);

    

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/publicaciones/list");
            setPublicaciones(data);
        } catch (error) {
            Swal.fire("¡Oops! Ocurrió un error", "No se obtuvieron las publicaciones.", "error");
        }
    };

    return (
        <Container>
            <h2 className="my-4 text-center"> Últimas Publicaciones</h2>
            <Row className="justify-content-center">
                {publicaciones.length > 0 ? (
                    publicaciones.map((post) => (
                        <Col md={6} lg={4} key={post._id} className="mb-4">
                            <Card className="shadow-lg">
                                <Card.Img variant="top" src={post.imagen} alt={post.titulo} />
                                <Card.Body>
                                    <Card.Title>{post.titulo}</Card.Title>
                                    <Card.Text>{post.descripcion}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No hay publicaciones disponibles.</p>
                )}
            </Row>
        </Container>
    );
};
