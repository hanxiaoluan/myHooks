import { useState, useEffect } from 'react'
import { off, on, isDeepEqual } from '../../utils/utils'


interface BatteryState {
    charging: boolean
    chargingTime: number
    dischargingTime: number
    level: number
}
interface BatteryManager extends Readonly<BatteryState>, EventTarget {
	onchargingchange: ()=> void
	onchargingtimechange: ()=> void
	ondischargingtimechange: ()=> void
	onlevelchange: ()=> void
}
interface NavigatorWarp extends Navigator {
    getBattery?: ()=> Promise<BatteryManager>
} 
type UseBatteryState = 
| {isSupported: false}
| {isSupported: true, fetched: false}
| BatteryState & { isSupported: true, fetched: true }

// 定义nav并判断是否支持nav的api
const nav: NavigatorWarp|undefined = typeof navigator === 'object' ? navigator : undefined
const isBatteryApiSupported = nav && typeof nav.getBattery === 'function'

const useBatteryMock: ()=> UseBatteryState = () => {
	return { isSupported: false }
}
const useBattery: ()=> UseBatteryState = () => {
	const [ state, setState ] = useState<UseBatteryState>({ isSupported: true, fetched: false }) 
	useEffect(() => {
		let isMounted = true
		let battery: BatteryManager | null = null
		const handleChange = () => {
			if(!isMounted || !battery){
				return 
			}
			const newState: UseBatteryState = {
				isSupported: true,
				fetched: true,
				level: battery.level,
				charging: battery.charging,
				chargingTime: battery.chargingTime,
				dischargingTime: battery.dischargingTime
			}
			!isDeepEqual(state, newState) && setState(newState)
		}
		nav!.getBattery!()
			.then((bat: BatteryManager) => {
      
				if (!isMounted) {
					return
				}
				battery = bat
				on(battery, 'chargingchange', handleChange)
				on(battery, 'chargingtimechange', handleChange)
				on(battery, 'dischargingtimechange', handleChange)
				on(battery, 'levelchange', handleChange)
				handleChange()
			})
		return () => {
			isMounted = false
			if (battery) {
				off(battery, 'chargingchange', handleChange)
				off(battery, 'chargingtimechange', handleChange)
				off(battery, 'dischargingtimechange', handleChange)
				off(battery, 'levelchange', handleChange)
			}
		}
	}, [])
	
	return state
}

export default isBatteryApiSupported ? useBattery : useBatteryMock

