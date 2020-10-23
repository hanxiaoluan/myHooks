import React, { useState, useEffect } from 'react'


// const Counter = () => {
// 	const [ count, setCount ] = useState(() => {
// 		let value
// 		try {
// 			value = JSON.parse(
// 				window.localStorage.getItem('my-app-count') || '0'
// 			)
// 		} catch (error) {
// 			value = '0'
// 		}
// 		return value
// 	})
    
// 	useEffect(() => {
// 		window.localStorage.setItem('my-app-count', count)
// 	}, [ count ])

// 	return (
// 		<div>
// 			<button onClick={() => setCount(count + 1)}>increment</button>
// 		</div>
// 	)
// }

const useLocalStorageUpdate = (key: string, defaultValue: any) => {
	const [ state, setState ] = useState(() => {
		let value
		try {
			value = JSON.parse(window.localStorage.getItem(key) || defaultValue)
		} catch (error) {
			value = defaultValue
		}
		return value
	})
	useEffect(() => {
		window.localStorage.setItem(key, state)
	}, [ state ])
    
	return { state, setState }
}
const Counter = () => {
	const { state, setState } = useLocalStorageUpdate('my-app-count', 0)

	return (
		<div>
			<button onClick={() => setState( state + 1)}>increment</button>
		</div>
	)
}


export default Counter