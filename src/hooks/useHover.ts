import React, { ReactElement, useState } from 'react'
const noop = () => {}
// eslint-disable-next-line no-unused-vars
type Element = React.ReactElement<any> | ((state: boolean)=> ReactElement<any>)
const useHover = (element: Element) => {
	const [ state, setState ] = useState(false)
	const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
		(originalOnMouseEnter || noop)(event)
		setState(true)
	}
	const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
		(originalOnMouseLeave || noop)(event)
		setState(false)
	}
	if(typeof element === 'function'){
		element = element(state)
	}
	const el = React.cloneElement(element, {
		onMouseEnter: onMouseEnter(element.props.onMouseEnter),
		onMouseLeave: onMouseLeave(element.props.onMouseLeave)
	})
	return [ el, state ]
}
export default useHover