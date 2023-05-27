import React, { useState } from "react";
import VoiceRecorder from "../components/VoiceRecorder";
import "../styles/home.css";
import "../styles/form.css";
import axios from "axios";
import Configs from "../configs";


function Enrollment() {
    const [user, setUser] = useState('')
    const [files, setFiles] = useState([]);

    const [audioUrls, setAudioUrls] = useState([])

    const addUrlToForm = (audioUrl) => {
        setAudioUrls([...audioUrls, audioUrl]);
    }

    const setUserName = (e) => {
        setUser(e.target.value)
    }
    const getFiles = (e) => {
        const array = [];
        Object.values(e.target.files).forEach(file => array.push(file));
        setFiles(array);
    }

    const readFile = (file)=>{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            // Register event listeners
            reader.addEventListener("loadend", e => resolve(e.target.result))
            reader.addEventListener("error", reject)

            // Read file
            reader.readAsArrayBuffer(file)
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(`Start submit ${JSON.stringify(formData)}`);

        // console.log(`Start submit ${JSON.stringify(formData)}`)
        // const audios = audioUrls;
        const data = new FormData();
        console.log(audioUrls);
        if (!audioUrls && !audioUrls.length) {
            alert('Audios not found');
        }
        // Check username
        if (user === '') {
            alert("Username is empty!");
            return;
        }
        if (files.length + audioUrls.length == 0) {
            alert("Not found voice to enroll!");
            return;
        }
        const audioData = [];
        // console.log(`Before loop: `, audioData)

        if (files.length > 0) {
            await files.forEach(async (file) => {
                // const arrayBuffer = await file.arrayBuffer();
                // console.log('buffer', buffer);
                // const array =   new Uint8Array(await file.arrayBuffer());
                // console.log('Array buffer', array);
                // const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

                data.append('data',file);
            })
        }

        if (audioUrls.length > 0) {
            const audios = await Promise.all(
                audioUrls.map(
                    async (aUrl, i) => {
                        const res = await axios({
                            url: aUrl,
                            method: "GET",
                            responseType: "blob"
                        }).then(res => res.data);

                        const audioFile = new File([res], `voice-${i}.wav`);
                        // .then(async (res) => {
                        //     // console.log(res.data);
                        //     const  audioFile =  new File([res.data], `voice-${i}.wav`)
                        //     // console.log(audioFile);
                        //     data.append('data', audioFile);
                        // })

                        return audioFile
                        //     // console.log(audioFile);
                        data.append('data', audioFile);
                    }
                )
            )

            console.log(audios);
            audios.forEach(audio =>
                data.append("data", audio)
            )


        }

        // console.log(`After loop: `, audioData);
        // audioData.forEach(audio =>
        //         data.append("data", audio)
        // )
        // console.log(`data: `, a.values());
        data.append("user", user);

        await axios({
            url: Configs.API_URL + '/users',
            method: "POST",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error.message) })
    };


    const clearAudioUrls = (e) => {
        e.preventDefault();
        setAudioUrls([]);
    }

    return (<div class="my-home">
        <h1>Enrollment</h1>
        <VoiceRecorder addUrls={addUrlToForm} />
        <h2>Form</h2>
        <form>
            <div>
                <label>User name</label>
                <input type="text" onChange={setUserName}></input>
            </div>
            <div>
                <input type="file" multiple onChange={getFiles}></input>
                {/* <ul>
                    {files.map((file, i) => (
                    <li key={i}>
                        {file.name} - {file.type}
                    </li>
                    ))}
                </ul> */}
            </div>
            <div id="added_audio">
                <div>
                    <button onClick={clearAudioUrls}>Clear Audio</button>
                </div>
            </div>
            <button onClick={handleSubmit}>Enroll</button>
        </form>
    </div>);

}
export default Enrollment;