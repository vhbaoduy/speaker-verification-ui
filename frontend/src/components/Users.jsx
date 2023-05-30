import React, { useEffect, useState } from "react"
import axios from "axios";
import Configs from "../configs";
// import ListGroup from "react-bootstrap/ListGroup"
import "../styles/base.css"
import { Button } from "react-bootstrap";

function Users(){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async() =>{
        await axios({
            url: Configs.API_URL + '/users',
            method: "GET"
        })
        .then((res) => {setUsers(res.data.data)})
        .catch((error)=>{
            console.log(error.message)
        })
    }
    
    const handleDelete = async (index) => {
        const userDelete = users[index];
        console.log(userDelete)

        await axios({
            url: Configs.API_URL + `/users/${userDelete}`,
            method: "DELETE"
        })
        .then((res) => {
            if (res.data.success){
                alert(`Delete ${userDelete} successfully!`)
            }else{
                alert(`Delete ${userDelete} Failed!`)
            }
            fetchData();
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    
    return (
        <div style={{ height: '400px', overflow: 'auto' }}>
        {users.map((user, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'space-between' }}>
                <span style={{ marginRight: '10px' }}>{user}</span>
                <Button variant="danger" onClick={() =>handleDelete(index)}>Delete</Button>
            </div>
        ))}
        </div>
       
    );
}



export default Users;