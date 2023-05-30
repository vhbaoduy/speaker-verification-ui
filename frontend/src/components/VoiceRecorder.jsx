import { useState, useRef, useEffect, useCallback } from "react";
// import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
// import 'audio-react-recorder/dist/index.css'
import React from "react"
import "../styles/base.css"
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
// 
import { ReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/Button"

function VoiceRecorder({addFiles}){
	const recorderControls = useAudioRecorder()
	const [url, setUrl] = useState(null)
	const addAudioElement = (blob)=> {
	const blobData = new Blob([blob], {type: "audio/wav" })
	const dateString = new Date().toISOString();
	const file = new File([blobData],`${dateString}.wav`,{type: blobData.type})
	console.log(file)
	// const url = URL.createObjectURL(blobData);
	addFiles(file)
	};
	return (
	  <div>
		<AudioRecorder 
		  onRecordingComplete={(blob) => addAudioElement(blob)}
		  recorderControls={recorderControls}
		  audioTrackConstraints={{
			noiseSuppression: true,
			echoCancellation: true,
		}}
		// downloadOnSavePress={true}
		// downloadFileExtension="wav"
		/>
		<Button onClick={recorderControls.stopRecording}>Stop recording</Button>
	
		<div>
		{/* <audio
			id='audio'
			controls
			src={url}
		/> */}
		{/* <Button onClick={()=>{
			if(!url) { 
				alert('Url is null'); 
				return;
			}
			console.log(url);
			addUrls(url)
			setUrl(null)
		}}>Add</Button> */}
		</div>
	  </div>
	)
  }

export default VoiceRecorder;