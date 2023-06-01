import React, { useEffect, useState } from "react";
import Configs from "../configs";
import "../styles/Setting.css"
import axios from "axios";
import { Form, Row, Col, Container, Modal, Spinner } from 'react-bootstrap';
import Notification from "../components/Notification";



function Setting() {
    // const [loadOptions, setLoadOptions] = useState([]);
    const [resources, setResources] = useState();
    const [configs, setConfigs] = useState();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const resetNotification = () => {
        setNotification(null);
    }
    useEffect(() => {
        fetchData();
        // fetchConfigs();
        // console.log(resources);
        // console.log(configs)
    }, [])


    const fetchData = async () => {
        await axios({
            url: Configs.API_URL + '/configs',
            method: "GET"
        })
            .then((res) => { return res.data })
            .then((res) => {
                console.log(res)
                if (res.success) {
                    setResources(res.data.resources);
                    setConfigs(res.data.config)
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    const handleConfigChange = (fieldName, value) => {
        setConfigs({
            ...configs,
            [fieldName]: value
        });
        // console.log(configs)
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        const threshold = parseFloat(configs.threshold);
        if (0 < threshold && threshold < 1) {
            console.log(configs)
            await axios({
                url: Configs.API_URL + '/configs',
                method: "POST",
                data: { ...configs, threshold: threshold }
            })
                .then((res) => { return res.data })
                .then((res) => {
                    console.log(res)
                    if (res.success) {
                        setNotification({
                            "type": "success",
                            "message": "Save configuration successfully !"
                        })
                    } else {
                        setNotification({
                            "type": "success",
                            "message": "Save configuration failed ! Error from server"
                        })
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                    setNotification({
                        "type": "success",
                        "message": "Save configuration failed ! Error from server"
                    })
                })
        } else {
            setNotification({
                "type": "danger",
                "message": "Threshold must be in range [0,1]!"
            })
        }
        setLoading(false)
    }

    return (
        <Container>
            <Row>
                <Col></Col>

                <Col xs={10}>
                    {/* <h1>Setting</h1> */}
                    <Form>
                        <h3>Resources</h3>
                        <Form.Group as={Row}>
                            <div className="label-container">
                                <Form.Label column sm="2">Device</Form.Label>
                                <small className="text-muted">Available devices from server</small>
                            </div>
                            <Col sm="10">
                                <Form.Control as="select" value={configs && configs["device"]} onChange={(event) => { handleConfigChange("device", event.target.value) }}>
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
                                <Form.Control as="select" value={configs && configs["model"]} onChange={(event) => { handleConfigChange("model", parseInt(event.target.value)) }}>
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
                                <Form.Control type="text" value={configs && configs["threshold"]} onChange={(event) => { handleConfigChange("threshold", event.target.value) }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <div className="label-container">
                                <Form.Label column sm="1"><strong>Note:</strong></Form.Label>
                                <small className="text-muted">If you change the model configuration, all enrolled users will be deteted to ensure consistency between the features of each user.</small>

                            </div>
                            <Col sm="11">
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Col sm="10">
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            {notification && (
                <Notification message={notification.message} type={notification.type} note={notification.note} onClose={resetNotification} />
            )}
            {loading && (
                <Modal
                    show={loading}
                    centered
                    backdrop="static"
                    keyboard={false}
                    contentClassName="loading-modal"
                >
                    <Modal.Body>
                        <div className="text-center">
                            <Spinner animation="border" role="status" variant="primary">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p className="mt-2">Please wait while the data is being processed</p>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </Container>


    );
}

export default Setting;