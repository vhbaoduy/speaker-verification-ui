import React, { useEffect, useState } from "react";
import Configs from "../configs";
// import "../styles/form.css"
import "../styles/Setting.css"
import axios from "axios";
// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
// import Container from "react-bootstrap/Container"
import { Form, Row, Col, Container } from 'react-bootstrap';

// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";


function Setting() {
    // const [loadOptions, setLoadOptions] = useState([]);
    const [resources, setResources] = useState();
    const [configs, setConfigs] = useState();
    useEffect(() => {
        fetchResources()
    }, [])

    const fetchResources = async () => {
        await axios({
            url: Configs.API_URL + '/resources',
            method: "GET"
        })
            .then((res) => { return res.data })
            .then((res) => {
                console.log(res)
                if (res.success) {
                    setResources(res.data);
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const fetchConfigs = async () => {

    }
    const handleSubmit = () => {

    }

    return (
        <Container>
            <Row>
                <Col></Col>

                <Col xs={8}>
                    {/* <h1>Setting</h1> */}
                    <Form>
                        <h3>Resources</h3>
                        <Form.Group as={Row}>
                            <div className="label-container">
                                <Form.Label column sm="2">Device</Form.Label>
                                <small className="text-muted">Available devices from server</small>
                            </div>
                            <Col sm="10">
                                <Form.Control as="select">
                                    {resources && resources['devices'].map((list, _) => (<option value={list.id}>{list.name}</option>))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <div className="label-container">
                                <Form.Label column sm="2">Model</Form.Label>
                                <small className="text-muted">Available models from server</small>
                            </div>
                            <Col sm="10">
                                <Form.Control as="select">
                                    {resources && resources['models'].map((list, _) => (<option value={list.id}>{list.name}</option>))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <h3>Configuration</h3>
                        <Form.Group as={Row}>
                            <div className="label-container">
                                <Form.Label column sm="2">Threshold</Form.Label>
                                <small className="text-muted">Score threshold for matching in the system</small>
                            </div>
                            <Col sm="10">
                                <Form.Control type="text" />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Col sm="10">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>


        // <Container>
        //     <Row>
        //         <Col>
        //             <h1>Setting</h1>
        //             <div>
        //                 <form>
        //                     <div>
        //                         <label>Available Devices</label>
        //                         <select>
        //                             {resources && resources['devices'].map((list, _) => (<option value={list.id}>{list.name}</option>))}
        //                         </select>
        //                     </div>
        //                     <div>
        //                         <label>Model</label>
        //                         <select>
        //                             {resources && resources['models'].map((list,_) => (<option value={list.id}>{list.name}</option>))}
        //                         </select>
        //                     </div>
        //                     <div>
        //                         <label>Threshold</label>

        //                     </div>
        //                     <Button>Save</Button>
        //                 </form>
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>


    );
}

export default Setting;