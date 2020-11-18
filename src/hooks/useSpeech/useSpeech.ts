import React, { useState, useRef, useEffect } from 'react'

interface SpeechState {
	isPlaying: boolean
	lang: string
	// eslint-disable-next-line no-undef
	voice: SpeechSynthesisVoice
	rate: number
	pitch: number
	volume: number
}

interface SpeechOptions {
	lang?: string
	// eslint-disable-next-line no-undef
	voice?: SpeechSynthesisVoice
	rate?: number
	pitch?: number
	volume?: number
}

const voices = typeof window === 'object' && typeof window.speechSynthesis === 'object' ?
	window.speechSynthesis.getVoices() : []
    
const useSpeech = (text: string, opts: SpeechOptions = {}): SpeechState => {
	const [ state, setState ] = useState({ 
		isPlaying: false,
		lang: opts.lang || 'default',
		voice: opts.voice || voices[0],
		rate: opts.rate || 1,
		pitch: opts.pitch || 1,
		volume: opts.volume || 1, 
	})

	const uterranceRef = useRef<SpeechSynthesisUtterance | null>(null)

	useEffect(() => {
		const utterance = new SpeechSynthesisUtterance(text)
		opts.lang && (utterance.lang = opts.lang)
		opts.voice && (utterance.voice = opts.voice)
		utterance.rate = opts.rate || 1
		utterance.pitch = opts.pitch || 1
		utterance.volume = opts.volume || 1
		utterance.onstart = () => setState({ ...state, isPlaying: true })
		utterance.onresume = () => setState({ ...state, isPlaying: true })
		utterance.onend = () => setState({ ...state, isPlaying: false })
		utterance.onpause = () => setState({ ...state, isPlaying: false })
		uterranceRef.current = utterance
		window.speechSynthesis.speak(uterranceRef.current)
	}, [])

	return state
}

export default useSpeech