import React, { useState, useEffect } from 'react'


const useDocumentTitle = (initalState: number) => {
	const [ count, setCount ] = useState(initalState)
	const increment = () => setCount(count + 1)
	useEffect(() => {
		document.title = `you clicked ${count} times.`
	}, [ count ])
	return { count, increment }
}
const Counter = () => {
	const { count, increment } = useDocumentTitle(0)
	return (
		<div>
			<h3> {count}</h3>
			<button onClick={increment}>increment</button>
		</div>
	)    
}

export default Counter