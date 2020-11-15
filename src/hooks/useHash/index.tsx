import React from 'react'
import { useHash } from './useHash'
const Demo: React.FC = () => {
	const [ hash, setHash ] = useHash()
	console.log(hash)  
	setHash('xxxx') 
	return <div>{hash}</div>
}
export default Demo