import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { IPubli } from "../Types";

export const Inicio = () => {
    const [publicaciones, setPublicaciones] = useState<IPubli[]>([]);
    const [search, setSearch] = useState("");

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredPublicaciones = publicaciones.filter(post =>
        post.titulo.toLowerCase().includes(search.toLowerCase()) ||
        post.descripcion.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", paddingTop: "2rem" }}>
            <Container>
                <h2 className="mb-4 text-center text-primary fw-bold">Últimas Publicaciones</h2>

                {/* Barra de búsqueda */}
                <Form className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Buscar publicaciones..."
                        value={search}
                        onChange={handleSearch}
                        className="shadow-sm"
                    />
                </Form>

                <Row className="justify-content-center">
                    {filteredPublicaciones.length > 0 ? (
                        filteredPublicaciones.map((post) => (
                            <Col key={post._id} xs={12} md={6} lg={4} className="mb-4">
                                <Card className="h-100 shadow rounded-4">
                                    {post.imagen && (
                                        <Card.Img
                                            variant="top"
                                            src={post.imagen}
                                            alt={post.titulo}
                                            style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                                        />
                                    )}
                                    <Card.Body>
                                        <Card.Title className="fw-bold">{post.titulo}</Card.Title>
                                        <Card.Text style={{ color: "#333" }}>{post.descripcion}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">No hay publicaciones disponibles.</p>
                    )}
                </Row>
            </Container>
        </div>
    );
};