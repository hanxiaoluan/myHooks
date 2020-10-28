import React from 'react'
import useBattery from './useBattery'
const Battery = () => {
	const batteryState = useBattery()
	console.log(batteryState)
	return <div></div>
}
export default Battery