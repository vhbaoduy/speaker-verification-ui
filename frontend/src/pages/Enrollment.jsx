import React, { useEffect, useState } from "react";
import VoiceRecorder from "../components/VoiceRecorder";
import "../styles/Enrollment.css";
import axios from "axios";
import Configs from "../configs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Notification from "../components/Notification";
import { Button, Spinner, Row, Container, Col, Form, Modal } from "react-bootstrap";



function Enrollment() {
    // Enrollments
    const [notification, setNotification] = useState(null);
    const [user, setUser] = useState('')
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch users from database
    const [usersDB, setUsersDB] = useState([]);
    useEffect(() => {
        fetchUserData();
    }, [])

    const resetNotification = () => {
        setNotification(null);
    }

    const addBlobFromRecorderToForm = (blob) => {
        setFiles([...files, blob])
    }

    // const addUrlToForm = (audioUrl) => {
    //     setAudioUrls([...audioUrls, audioUrl]);
    // }

    const setUserName = (e) => {
        setUser(e.target.value)
    }
    const getFiles = (e) => {
        const array = [];
        Object.values(e.target.files).forEach(file => array.push(file));
        setFiles(array);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Check username
        if (user === '') {
            setNotification({
                message: "Username is empty!",
                type: "danger"
            })
            return;
        }
        if (files.length === 0) {
            setNotification({
                message: "Voice not found!",
                type: "danger"
            })
            // alert("Not found voice to enroll!");
            return;
        }
        if (files.length > 0) {
            await files.forEach(async (file) => {
                data.append('data', file);
            })
        }
        data.append("user", user);
        setLoading(true);
        await axios({
            url: Configs.API_URL + '/users',
            method: "POST",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => { return res.data })
            .then((response) => {
                // console.log(response)
                if (response.success) {
                    setNotification({
                        message: `Enroll user ${user} successfully !`,
                        type: "sucess"
                    })
                    resetForm()
                    fetchUserData()
                } else {
                    if (response.code[0] === Configs.ERROR_CODE.EXISTED_USER) {
                        setNotification({
                            message: `Enroll user ${user} failed, the user is existed in system`,
                            type: "danger"
                        })
                    } else if (response.code[0] === Configs.ERROR_CODE.ERROR_INTERNAL) {
                        setNotification({
                            message: `Error from internal server !`,
                            type: "danger"
                        })
                    } else {
                        setNotification({
                            message: `Enroll user ${user} failed ! Assure your data as requested`,
                            type: "sucess"
                        })
                        resetForm()
                        fetchUserData()
                    }
                }
            })
            .catch((error) => { setNotification({
                message: `Error from internal server !`,
                type: "danger"
            }) })
        setLoading(false);
    };

    const resetForm = () => {
        const fileE = document.getElementById("selected-files")
        fileE.files = new DataTransfer().files
        setFiles([])
        setUser('')
    }

    const handleDeleteAudioFile = (index) => {
        const updatedFiles = [...files];
        // console.log(files
        const fileName = files[index].name;
        const list = new DataTransfer();
        const fileElement = document.getElementById("selected-files");
        // console.log(Array.from(fileElement.files))
        Array.from(fileElement.files).forEach((file) => {
            if (!(file.name === fileName)) {
                list.items.add(file);
            }
        })
        // document.getElementById("selected-files") = fileElement
        fileElement.files = list.files;
        // console.log(fileElement)
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const fetchUserData = async () => {
        await axios({
            url: Configs.API_URL + '/users',
            method: "GET"
        })
            .then((res) => { return res.data; })
            .then((data) => {
                setUsersDB(data.data);
            })
            .catch((error) => {
                console.log(error.message)
            })

    }
    const handleDeleteUser = async (index) => {
        const userDelete = usersDB[index];
        await axios({
            url: Configs.API_URL + `/users/${userDelete}`,
            method: "DELETE"
        })
            .then((res) => {
                if (res.data.success) {
                    // alert(`Delete ${userDelete} successfully!`)
                    setNotification({
                        message: `Delete ${userDelete} successfully!`,
                        type: "success"
                    })
                } else {
                    // alert(`Delete ${userDelete} Failed!`)
                    setNotification({
                        message: `Delete ${userDelete} Failed!`,
                        type: "danger"
                    })
                }
            })
            .catch((error) => {
                setNotification({
                    message: `Error from internal server !`,
                    type: "danger"
                })
            })
        fetchUserData();
    }


    return (
        <Container>
            {/* <Notification message={"Clear audio successfuly"} type={"success"}></Notification> */}
            <Row>
                <Col md={8}>
                    <h1>Enrollment</h1>
                    <p>Record or Upload 3 files to enroll the system</p>
                    <small className="text-muted">Each file more than 3 seconds</small>
                    <VoiceRecorder addFiles={addBlobFromRecorderToForm} />

                    <Form>
                        <h2>Submission</h2>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">Username</Form.Label>
                            <Col sm="6">
                                <Form.Control type="text" onChange={setUserName} value={user} />
                            </Col>
                            <Col sm="2"></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="p-1">
                            <Col sm="4">
                                <Form.Control type="file" id="selected-files" onChange={getFiles} multiple />
                            </Col>

                            {/* 
                            <Col sm="4">
                            </Col> */}
                            {/* <Form.Label column sm="5"></Form.Label> */}
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column sm="4">Recorded/Selected Files</Form.Label>
                            <Col sm="8">
                                {files.length > 0 &&
                                    <div>
                                        <div style={{ height: '100px', overflow: 'auto' }}>
                                            {files.map((file, index) => (
                                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                                                    <audio src={URL.createObjectURL(file)} controls></audio>
                                                    <Button variant="danger" onClick={() => { handleDeleteAudioFile(index) }}>Delete</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">Totals</Form.Label>
                            <Col sm="8">
                                <Form.Label column sm="4"> <b>{files.length}</b></Form.Label>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="12">
                                <Button onClick={handleSubmit} variant="primary">Enroll</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>

                <Col md={4}>
                    <h1>Enrolled users</h1>
                    <div style={{ height: '400px', overflow: 'auto' }}>
                        {usersDB.map((user, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                                <span style={{ marginRight: '10px' }}>{user}</span>
                                <Button variant="danger" onClick={() => handleDeleteUser(index)}>Delete</Button>
                            </div>
                        ))}
                    </div>
                </Col>
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
export default Enrollment;