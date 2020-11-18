import React from 'react'
import useSpeech from './useSpeech'
const voices = window.speechSynthesis.getVoices()

const Demo: React.FC = () => {
	const state = useSpeech('Hello world!', { rate: 0.8, pitch: 0.5, voice: voices[0] })
	console.log('-------')
	return (
		<pre>
			{JSON.stringify(state, null, 2)}
		</pre>  
	)
}

export default Demo