import React, { useState } from "react";
import VoiceRecorder from "../components/VoiceRecorder";
import "../styles/home.css";
import "../styles/form.css";
import axios from "axios";
import Configs from "../configs";
import { Form, Row, Col, Container, Button } from 'react-bootstrap';



function Authentication() {
    const [files, setFiles] = useState([]);

    const getFiles = (e) => {
        const array = [];
        Object.values(e.target.files).forEach(file => array.push(file));
        setFiles(array);
    }

    const addBlobFromRecorderToForm = (blob) => {
        setFiles([...files, blob])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(`Start submit ${JSON.stringify(formData)}`);

        // console.log(`Start submit ${JSON.stringify(formData)}`)
        // const audios = audioUrls;
        const data = new FormData();
        if (files.length == 0) {
            alert("Not found voice to verify!");
            return;
        }

        if (files.length > 0) {
            await files.forEach(async (file) => {
                data.append('data', file);
            })
        }

        await axios({
            url: Configs.API_URL + '/users/verify',
            method: "POST",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error.message) })
    };
    const handleDeleteItem = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={8}>
                    <h1>Authentication</h1>
                    <center><VoiceRecorder addFiles={addBlobFromRecorderToForm} /></center>
                    {files.length > 0 &&
                        <div>
                            <label>Recored Audio</label>
                            <div style={{ height: '100px', overflow: 'auto' }}>
                                {files.map((file, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                                        <audio src={URL.createObjectURL(file)} controls></audio>
                                        <Button variant="danger" onClick={() => { handleDeleteItem(index) }}>Delete</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <div>
                        <Button onClick={handleSubmit} variant="primary">Authenticate</Button>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>

    );

}
export default Authentication;