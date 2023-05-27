import { useState, useRef, useEffect } from "react";
// import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
// import 'audio-react-recorder/dist/index.css'
import React from "react"
import "../styles/base.css"
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
// 
// import { ReactMediaRecorder } from "react-media-recorder";



// function AudioRecorder({ array, setArray, addArray, addUrls }) {
// 	const [urls, setUrls] = useState([]);
// 	const [url, setUrl] = useState();
// 	const [state, setState] = useState({
// 		isFocused: false,
// 		recordState: null,
// 		audioDataURL: '',
// 		reset: false
// 	});
// 	const { recordState } = state;
// 	const counter = 0;

// 	function onClick_start() {
// 		setState({
// 			reset: false,
// 			audioDataURL: '',
// 			recordState: RecordState.START
// 		});
// 	}
// 	function onClick_stop() {
// 		setState({
// 			reset: false,
// 			recordState: RecordState.STOP
// 		});

// 	}
// 	function onClick_reset() {
// 		setState({
// 			reset: true,
// 			audioDataURL: '',
// 			recordState: RecordState.STOP
// 		});

// 	}

// 	function onClick_continue() {
// 		if (state.audioDataURL !== '') {
// 			// get datetime string for filename
// 			let datetime = new Date().toLocaleString();
// 			datetime = datetime.replace(' ', '');
// 			datetime = datetime.replace(/_/g, '');
// 			datetime = datetime.replace(',', '');
// 			var filename = 'streamlit_audio_' + datetime + '.wav';

// 			// auromatically trigger download
// 			const a = document.createElement('a');
// 			a.style.display = 'none';
// 			a.href = state.audioDataURL;
// 			a.download = filename;
// 			document.body.appendChild(a);
// 			a.click();
// 		}
// 	}

// 	function onStop_audio(data) {
// 		if (state.reset === true) {
// 			setState({
// 				audioDataURL: ''
// 			})
// 			// setUrl(null);
// 		} else {
// 			setState({
// 				audioDataURL: data.url
// 			});
// 			// console.log(data.url);
// 			// const audio = await fetch(data.url).then(function (ctx) {
// 			// 	return ctx.blob()
// 			// }).then(function (blob) {
// 			// 	return (new Response(blob)).arrayBuffer()
// 			// }).then(function (buffer) {
// 			// 	const wav_bytes = new Uint8Array(buffer);
// 			// 	return wav_bytes;
// 			// })

// 			setUrl(data.url);
// 		}
// 	}

// 	return (
// 		<div>
// 			<div>
// 				<button id='record' onClick={onClick_start}>
// 					Start Recording
// 				</button>
// 				<button id='stop' onClick={onClick_stop}>
// 					Stop
// 				</button>
// 				<button id='reset' onClick={onClick_reset}>
// 					Reset
// 				</button>
// 			</div>
// 			<div>
// 				{/* <input type="file" accept=".wav"></input> */}

// 				{/* <button id='continue' onClick={onClick_continue}>
//             Download
//           </button> */}

// 				<AudioReactRecorder
// 					state={recordState}
// 					onStop={onStop_audio}
// 					type='audio/wav'
// 					backgroundColor='rgb(127,127,127)'
// 					foregroundColor='rgb(255,76,75)'
// 					canvasWidth={450}
// 					canvasHeight={100}
// 				/>
// 				<div>
// 					<audio
// 						id='audio'
// 						controls
// 						src={state.audioDataURL}
// 					/>
// 					<button id="add" onClick={e => {
// 						// console.log(ur)
// 						if(!url) { 
// 							alert('Url is null'); 
// 							return;
// 						}
// 						addUrls(url)
// 						// setUrls([...urls, url])
// 						// setAudios(urls)
// 						setUrl(null)
// 					}}>Add</button>
// 				</div>
// 			</div>
// 			{/* <div id="collected_enrollment">
// 		  	<h2>Collected files</h2>
// 			<form>
// 				<label>User name</label>
// 				<input type="text"></input>
// 				<input type="file" accept=".wav" multiple></input>
// 			</form>
// 			</div> */}
// 		</div>
// 	);
// }

function VoiceRecorder({addUrls}){
	const recorderControls = useAudioRecorder()
	const [url, setUrl] = useState(null)
	const addAudioElement = (blob) => {
	//   console.log(blob);
	  const url = URL.createObjectURL(blob);
	  setUrl(url)
	//   console.log(url)
	//   addUrls(url)
	  
	//   const audio = document.getElementById("audio");
	//   audio.src = url;
	//   audio.controls = true;
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
		/>
		<button onClick={recorderControls.stopRecording}>Stop recording</button>
	
		<div>
		<audio
			id='audio'
			controls
			src={url}
		/>
		<button onClick={()=>{
			if(!url) { 
				alert('Url is null'); 
				return;
			}
			console.log(url);
			addUrls(url)
			setUrl(null)
		}}>Add</button>
		</div>
	  </div>
	)
  }

export default VoiceRecorder;