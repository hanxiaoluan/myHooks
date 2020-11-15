import React from 'react'
import './App.css'
import Demo from './hooks/useHash/index'

// const Demo = () => {
// 	const element = (hovered: any) =>
// 		<div>
// 			Hover me! {hovered && 'Thanks!'}
// 		</div>
// 	const [ hoverable, hovered ] = useHover(element)
// 	console.log(hoverable)
// 	return (
// 		<div>
// 			{hoverable}
// 			<div>{hovered ? 'HOVERED' : ''}</div>
// 		</div>
// 	)
// }
function App() {
	return (
		<div className="App">
			<Demo />
		</div>
	)
}

export default App
