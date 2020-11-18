import { useState } from 'react'

const useSetState = (initialState: any = {} ) => {
	const [ state, setState ] = useState(initialState)
    
	const _setState = (patch: any) => {
		setState((preState: any) => Object.assign({}, preState, patch instanceof Function ? patch(preState) : patch))
	}
	return [ state, _setState ] as const
}

export default useSetState