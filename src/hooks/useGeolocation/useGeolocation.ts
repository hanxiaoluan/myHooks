import React, { useState, useEffect } from 'react'

// eslint-disable-next-line no-undef
interface GeolocationState extends Partial<Coordinates>{
    loading: boolean
    timestamp?: number
    // eslint-disable-next-line no-undef
    error?: Error | PositionError
}
const useGeolocation = () => {
	const [ state, setState ] = useState<GeolocationState>({ loading: true, timestamp: Date.now() })
	let isMounted = true
	let watchId: any
	// eslint-disable-next-line no-undef
	const onSuccess = (position: Position) => {
		isMounted && setState({ ...position.coords, loading: false, timestamp: position.timestamp })
	}
	// eslint-disable-next-line no-undef
	const onError = (error: PositionError) => {
		setState((oldState: GeolocationState) => ({ ...oldState, loading: true, error }))
	}
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess, onError)
		watchId = navigator.geolocation.watchPosition(onSuccess, onError)
		return () => {
			isMounted = false
			navigator.geolocation.clearWatch(watchId)
		}
	}, [])
	return state
}

export default useGeolocation