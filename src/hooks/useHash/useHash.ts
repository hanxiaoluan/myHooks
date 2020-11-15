import { useState, useEffect, useCallback } from 'react'

export const useHash = () => {
	const [ hash, setHash ] = useState(() => window.location.hash)
	let isMounted = true
	const onHashChange = useCallback(
		() => {
			setHash(window.location.hash)
		},
		[],
	)
	useEffect(() => {
		if(isMounted){
			window.addEventListener('hashchange', onHashChange)
		}
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			isMounted = false
			window.removeEventListener('hashchange', onHashChange)
		}
	}, [])
    
	const _setHash = useCallback(
		(newHash: string) => {
			if(newHash !== hash){
				window.location.hash = newHash
			}
		},
		[ hash ],
	)
	return [ hash, _setHash ] as const
}
