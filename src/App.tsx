import React from 'react'
import './App.css'
import Battery from './hooks/useBattery/Battery'
import useGeolocation from './hooks/useGeolocation/useGeolocation'
function App() {
	useGeolocation()
	return (
		<div className="App">
			<Battery />
		</div>
	)
}

export default App
