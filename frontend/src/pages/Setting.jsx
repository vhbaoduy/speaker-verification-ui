import React, { useEffect, useState } from "react";
import Configs from "../configs";
import "../styles/form.css"
import axios from "axios";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import { Button } from "react-bootstrap";
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";


function Setting() {
    // const [loadOptions, setLoadOptions] = useState([]);
    const [devices, setDevices] = useState([]);
    useEffect(() => {
        fetchDeviceResources()
    }, [])

    const fetchDeviceResources = async () => {
        await axios({
            url: Configs.API_URL + '/resources',
            method: "GET"
        })
            .then((res) => {
                setDevices(res.data.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    const handleSubmit = () => {

    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Setting</h1>
                    <div>
                        <form>
                            <div>
                                <label>Available Devices</label>
                                <select id="device-seletion">
                                    {devices.map((list, _) => (<option value={list.id}>{list.name}</option>))}
                                </select>
                            </div>
                            <Button>Save</Button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>


    );
}

export default Setting;