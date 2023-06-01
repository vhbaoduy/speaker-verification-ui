import React, { useState } from "react";
import VoiceRecorder from "../components/VoiceRecorder";
import Notification from "../components/Notification";
import axios from "axios";
import Configs from "../configs";
import { Form, Row, Col, Container, Button, Modal, Spinner } from 'react-bootstrap';



function Authentication() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const getFile = (e) => {
        // const array = [];
        // Object.values(e.target.files).forEach(file => array.push(file));
        setFile(e.target.files[0]);
    }

    const resetNotification = () => {
        setNotification(null);
    }

    const addBlobFromRecorderToForm = (blob) => {
        setFile(blob)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(`Start submit ${JSON.stringify(formData)}`);

        // console.log(`Start submit ${JSON.stringify(formData)}`)
        // const audios = audioUrls;
        
        const data = new FormData();
        if (file === null) {
            setNotification({
                message: "Voice not found!",
                type: "danger"
            });
            return;
        }
        data.append('data', file);
        setLoading(true);
        await axios({
            url: Configs.API_URL + '/users/verify',
            method: "POST",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => { return res.data})
            .then((data)=>{
                if (data.success){

                }else{
                    if (data.code[0] === Configs.ERROR_CODE.USER_NOT_FOUND){
                        setNotification({
                            message: "Not found enrolled users, please enroll user to system!",
                            type: "danger"
                        })
                    }
                }
            })
            .catch((error) => { console.log(error.message) })
        
        setLoading(false);
    };
    const handleDeleteItem = () => {
        setFile(null);
    };

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <h1>Authentication</h1>
                    <center><VoiceRecorder addFiles={addBlobFromRecorderToForm} /></center>
                    <Form.Group as={Row} >
                        <Col sm="8">
                            <Form.Control type="file" onChange={getFile} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">Recorded/Selected Files</Form.Label>
                        <Col sm="8">
                            {file &&
                                <div>
                                    <div style={{ height: '100px', overflow: 'auto' }}>
                                        {file && (
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                                                <audio src={URL.createObjectURL(file)} controls></audio>
                                                <Button variant="danger" onClick={() => { handleDeleteItem() }}>Delete</Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Button onClick={handleSubmit} variant="primary">Authenticate</Button>
                    </Form.Group>

                </Col>
                <Col></Col>
            </Row>
            {notification && (
                <Notification message={notification.message} type={notification.type} onClose={resetNotification} />
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
export default Authentication;