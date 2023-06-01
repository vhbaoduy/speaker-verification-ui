import React from "react"
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button"

function VoiceRecorder({ addFiles }) {
	const recorderControls = useAudioRecorder()
	const addAudioElement = (blob) => {
		const blobData = new Blob([blob], { type: "audio/wav" })
		const dateString = new Date().toISOString();
		const file = new File([blobData], `${dateString}.wav`, { type: blobData.type })
		// console.log(file)
		// const url = URL.createObjectURL(blobData);
		addFiles(file)
	};
	return (
		<Container>
			<Row>
				<Col>
					<center className="p-2"><AudioRecorder
						onRecordingComplete={(blob) => addAudioElement(blob)}
						recorderControls={recorderControls}
						audioTrackConstraints={{
							noiseSuppression: true,
							echoCancellation: true,
						}} />
					</center>
					<Button onClick={recorderControls.stopRecording}>Stop recording</Button>
				</Col>
			</Row>
		</Container>

	)
}

export default VoiceRecorder;