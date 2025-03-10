import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import React , {useState} from 'react';
import Swal from 'sweetalert2';
import { IPubli } from '../Types';


export const CrearPublicacion =() =>{

    const [publicacion, setPubli] = useState<IPubli>({
        _id:"",
        titulo: "",
        descripcion: "",
        imagen: ""
    })

    const cambiarInformacion = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const data:any = publicacion;
        data [e.target.name] = e.target.value;
        setPubli({...data})
    }

    const eliminarPublicacion = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/publicacion/eliminar/${id}`);
            Swal.fire("Publicación eliminada", "", "success");
        } catch (error) {
            Swal.fire("Error al eliminar", "", "error");
            console.error(error);
        }
    };
    


    const onSumbit = async () => {
        try {
           await axios.post("http://localhost:4000/publicacion/crear", publicacion)
           Swal.fire("publicacion creada con exito", "", "error")
           console.log(publicacion);
        } catch (error) {
            Swal.fire("Ocurrio un Error", "", "error")
            console.log(error);
        }
        
    }


    return (
        <Container>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title>Crear evento</Card.Title>
                    <Form>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Titulo del evento</Form.Label>
                                    <Form.Control 
                                    onChange={cambiarInformacion}
                                    name="titulo" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Numero de rondas</Form.Label>
                                    <Form.Control 
                                     onChange={cambiarInformacion}
                                    name="descripcion" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                                <Form.Group>
                                    <Form.Label>Numero de rondas</Form.Label>
                                    <Form.Control 
                                     onChange={cambiarInformacion}
                                    name="descripcion" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr></hr>
                        <div className='text-center'>
                            <Button onClick={()=>onSumbit()}>Guardar evento</Button>
                        </div>

                        <Card.Body>
                        <Card.Title>{publicacion.titulo}</Card.Title>
                        <Card.Text>{publicacion.descripcion}</Card.Text>
                        <Button variant="danger" onClick={() => eliminarPublicacion(publicacion._id!)}>
                            Eliminar
                        </Button>
                    </Card.Body>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )


}