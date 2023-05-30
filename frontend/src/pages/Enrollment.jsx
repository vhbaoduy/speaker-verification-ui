import React, { useState } from "react";
import VoiceRecorder from "../components/VoiceRecorder";
import "../styles/Enrollment.css";
import axios from "axios";
import Configs from "../configs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from "../components/Users";
import Notification from "../components/Notification";
import { Button, Spinner, Row, Container, Col, Form } from "react-bootstrap";
// import AudioRecorder from "../components/AudioRecorder";



function Enrollment() {
    const [notification, setNotification] = useState(null);
    const [user, setUser] = useState('')
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [audioUrls, setAudioUrls] = useState([])

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
        // console.log(`Start submit ${JSON.stringify(formData)}`);

        // console.log(`Start submit ${JSON.stringify(formData)}`)
        // const audios = audioUrls;
        const data = new FormData();
        // console.log(audioUrls);
        // if (!audioUrls && !audioUrls.length) {
        //     alert('Audios not found');
        // }
        // Check username
        if (user === '') {
            alert("Username is empty!");
            return;
        }
        if (files.length == 0) {
            setNotification({
                message: "Voice not found!",
                type: "danger"
            })
            // alert("Not found voice to enroll!");
            return;
        }
        // const audioData = [];
        // console.log(`Before loop: `, audioData)

        if (files.length > 0) {
            await files.forEach(async (file) => {
                data.append('data', file);
            })
        }

        // if (audioUrls.length > 0) {
        //     const audios = await Promise.all(
        //         audioUrls.map(
        // async (aUrl, i) => {
        //     const res = await axios({
        //         url: aUrl,
        //         method: "GET",
        //         responseType: "blob"
        //     })
        //     console.log(res.data)

        //     const audioFile = new File([res.data], `voice-${i}.wav`, {
        //         type: 'audio/wav',
        //     });


        //     return audioFile
        //     //     // console.log(audioFile);
        //     // data.append('data', audioFile);
        // }
        //         )
        //     )

        //     console.log(audios);
        //     audios.forEach(audio =>
        //         data.append("data", audio)
        //     )


        // }
        // console.log('files', files)
        data.append("user", user);

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
                console.log(response)
            })
            .catch((error) => { console.log(error.message) })

        resetForm()
    };

    const resetForm = () => {
        // const userElement = document.getElementById("username");
        // userElement.target.value = "";
        // const fileElement = document.getElementById("seletectedFiles");
        // fileElement.target.files = [];
        const fileE = document.getElementById("selected-files")
        fileE.files = {};
        setFiles([])
        setUser('')
    }

    const handleDeleteItem = (index) => {
        const updatedFiles = [...files];
        // console.log(files
        const fileName = files[index].name;
        const list = new DataTransfer();
        const fileElement = document.getElementById("selected-files");
        console.log(Array.from(fileElement.files))
        Array.from(fileElement.files).forEach((file)=>{
            if (!(file.name === fileName)){
                list.items.add(file);
            }
        })
        // document.getElementById("selected-files") = fileElement
        fileElement.files = list.files;
        // console.log(fileElement)
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };



    return (
        <Container>
            {/* <Notification message={"Clear audio successfuly"} type={"success"}></Notification> */}
            <Row>
                <Col xs={12} md={8}>
                    <h1>Enrollment</h1>
                    <p>Record or Upload 3 files to enroll the system</p>
                    <small className="text-muted">Each file more than 3 seconds</small>
                    <center><VoiceRecorder addFiles={addBlobFromRecorderToForm} /></center>
                    {/* <AudioRecorder/> */}
                    <Form>
                        <h2>Submission</h2>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">Username</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" onChange={setUserName} value={user} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            {/* <Form.Label column sm="5"></Form.Label> */}
                            <Form.Control type="file" id="selected-files" onChange={getFiles} multiple/>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">Recored/Selected Files</Form.Label>
                            <Col sm="8">
                                {files.length > 0 &&
                                    <div>
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
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">Totals</Form.Label>
                            <Col sm="8">
                                <Form.Label column sm="4"> <b>{files.length}</b></Form.Label>
                                {/* <Form.Control type="file" onChange={getFiles} multiple/> */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="12">
                                <Button onClick={handleSubmit} variant="primary">Enroll</Button>
                            </Col>
                        </Form.Group>
                    </Form>

                    {/* <form>
                        <div>
                            <label>User name</label>
                            <input id="username" type="text" onChange={setUserName} value={user}></input>
                        </div>
                        <div>
                            <input id="seletectedFiles" type="file" multiple onChange={getFiles}></input>
                        </div>

                        {files.length > 0 &&
                            <div>
                                <label>Recored Audio</label>
                                <div style={{ height: '200px', overflow: 'auto' }}>
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
                            <Button onClick={handleSubmit} variant="primary">Enroll</Button>
                        </div>

                    </form> */}
                </Col>

                <Col xs={6} md={4}>
                    <h1>Enrolled users</h1>
                    <Users />
                </Col>
            </Row>
            {notification && (
                <Notification message={notification.message} type={notification.type} />
            )}
            {/* {loading ? (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            ):console.log("Hello")} */}
        </Container>



    );

}
export default Enrollment;