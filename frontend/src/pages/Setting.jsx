import React, {useEffect, useState} from "react";
import Configs from "../configs";
import Form from 'react-bootstrap/Form';
import Select from "react-select";
import "../styles/form.css"
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";


const Setting = () => {
    const [loadOptions, setLoadOptions] = useState([]);
    useEffect(()=>{    
        fetch(Configs.API_URL + '/resources')
        .then((res) => res.json())
        .then(data => setLoadOptions(data))
        .catch((error)=>{
            console.log(error.message)
        })
        },[])

    const [loadConfigs, setLoadConfigs] = useState({});
    useEffect(()=>{    
        fetch(Configs.API_URL + '/configs')
        .then((res) => res.json())
        .then(data => {
            setLoadConfigs(data);
            console.log(data);
        })
        .catch((error)=>{
            console.log(error.message)
        })
        },[])

    return (
        <div>
            <form method="post">
            <div>
            <label>Device</label>
            <select>
                {loadOptions.map((list, _) => (<option value={list.id}>{list.name}</option>))}
            </select>
            </div>
            <div>
                <label>Threshold</label>
                <input type="text" value={loadConfigs.threshold}></input>
            </div>
            {/* <div>
            <label>Threshold
                {<input type="text">{loadConfigs.threshold}</input>}
            </label>
            </div> */}
            <button>Save</button>
            </form>
        </div>
    );
}

export default Setting;