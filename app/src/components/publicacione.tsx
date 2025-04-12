import axios from 'axios';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { IPubli } from '../Types';

interface Props {
    setPublicaciones: React.Dispatch<React.SetStateAction<IPubli[]>>;
}

const GaleriaPublicaciones = ({ publicaciones }: { publicaciones: IPubli[] }) => {
    return (
        <Row className="justify-content-center">
            {publicaciones.map((publi) => (
                <Col key={publi._id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
                    <Card
                        className="shadow-sm w-100"
                        style={{
                            borderRadius: '12px',
                            transition: 'transform 0.2s ease-in-out',
                            backgroundColor: '#f5f5f5', // Gris claro suave, no blanco puro
                            border: 'none',
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = 'scale(1.02)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = 'scale(1)')
                        }
                    >
                        {publi.imagen && (
                            <Card.Img
                                variant="top"
                                src={publi.imagen}
                                style={{
                                    objectFit: 'cover',
                                    height: '180px',
                                    borderTopLeftRadius: '12px',
                                    borderTopRightRadius: '12px',
                                }}
                            />
                        )}
                        <Card.Body>
                            <Card.Title className="fw-semibold text-primary">
                                {publi.titulo}
                            </Card.Title>
                            <Card.Text style={{ fontSize: '0.95rem', color: '#444' }}>
                                {publi.descripcion}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export const CrearPublicacion = ({ setPublicaciones }: Props) => {
    const [publicacion, setPubli] = useState<IPubli>({
        _id: "",
        titulo: "",
        descripcion: "",
        imagen: "",
    });

    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [publicaciones, setLocalPublicaciones] = useState<IPubli[]>([]);

    useEffect(() => {
        const obtenerPublicaciones = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/publicacion/listar");
                setLocalPublicaciones(data);
                setPublicaciones(data);
            } catch (error) {
                console.error("Error al obtener publicaciones:", error);
            }
        };

        obtenerPublicaciones();
    }, [setPublicaciones]);

    const cambiarInformacion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPubli({ ...publicacion, [e.target.name]: e.target.value });
    };

    const manejarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagenFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const validarCampos = () => {
        if (!publicacion.titulo.trim() || !publicacion.descripcion.trim()) {
            Swal.fire("Campos incompletos", "Por favor llena todos los campos", "warning");
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        if (!validarCampos()) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("titulo", publicacion.titulo);
            formData.append("descripcion", publicacion.descripcion);
            if (imagenFile) formData.append("imagen", imagenFile);

            const { data } = await axios.post("http://localhost:4000/publicacion/crear", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire("¡Publicación creada con éxito!", "", "success");

            const nuevaPubli = { ...publicacion, _id: data.id, imagen: data.imagen };
            setPublicaciones(prev => [...prev, nuevaPubli]);
            setLocalPublicaciones(prev => [...prev, nuevaPubli]);

            setPubli({ _id: "", titulo: "", descripcion: "", imagen: "" });
            setImagenFile(null);
            setPreview(null);
        } catch (error) {
            Swal.fire("Ocurrió un error al crear la publicación", "", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
          <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh', backgroundColor: '#c3c3c3' }}
          >
            <Card
              style={{
                width: '100%',
                maxWidth: '600px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                border: 'none',
              }}
            >
              <Card.Body className="p-4">
                <h3 className="text-center fw-bold text-primary mb-4">Crear Publicación</h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Título</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa el título..."
                      name="titulo"
                      value={publicacion.titulo}
                      onChange={cambiarInformacion}
                    />
                  </Form.Group>
      
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Escribe una breve descripción..."
                      name="descripcion"
                      value={publicacion.descripcion}
                      onChange={cambiarInformacion}
                    />
                  </Form.Group>
      
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Imagen</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={manejarImagen}
                    />
                  </Form.Group>
      
                  {preview && (
                    <div className="text-center mb-3">
                      <img
                        src={preview}
                        alt="Vista previa"
                        className="rounded shadow-sm"
                        style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
      
                  <div className="d-grid gap-2">
                    <Button
                      onClick={onSubmit}
                      disabled={loading}
                      style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" /> Guardando...
                        </>
                      ) : (
                        'Guardar Publicación'
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Container>
      
          <Container
    fluid
    style={{ backgroundColor: '#c3c3c3', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}
>
    <GaleriaPublicaciones publicaciones={publicaciones} />
</Container>

        </>
      );
      
};
