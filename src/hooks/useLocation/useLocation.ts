import { useState, useEffect } from 'react'
import { on, off } from '../../utils/utils'

type MethodType = 'pushState'| 'replaceState'

// 判断js的运行环境是否在浏览器中
const isClient = typeof window === 'object'

const patchHistoryMethod = ( method: MethodType) => {
	const history = window.history
	const original = history[method]
    
	history[method] = function (state: any){
		const result = original.apply(this, arguments as any)
		const event = new (Event as any)(method.toLowerCase()) as Event
        
		(event as any).state = state
        
		window.dispatchEvent(event)
		return result
	}
}

if(isClient){
	patchHistoryMethod('pushState')
	patchHistoryMethod('replaceState')
}


export interface LocationSensorState {
    trigger: string;
    state?: any;
    length?: number;
    hash?: string;
    host?: string;
    hostname?: string;
    href?: string;
    origin?: string;
    pathname?: string;
    port?: string;
    protocol?: string;
    search?: string;
}

const useLocationServer = (): LocationSensorState => ({
	trigger: 'load',
	length: 1
})

// html5引入了history.pushState和history.replaceState方法，他们常与winddow.onpopstate配合使用
const buildState = (trigger: string) => {
	const { state, length } = window.history
    
	const { hash, host, hostname, href, origin, pathname, port, protocol, search } = window.location
    
	return {
		trigger,
		state,
		length,
		hash,
		host,
		hostname,
		href,
		origin,
		pathname,
		port,
		protocol,
		search,
	}
}

const useLocationBrowser = (): LocationSensorState => {
	const [ state, setState ] = useState(buildState('load'))
    
	useEffect(() => {
		const onPopstate = () => setState(buildState('popstate'))
		const onPushstate = () => setState(buildState('pushstate'))
		const onReplacestate = () => setState(buildState('replacestate'))
        
		on(window, 'popstate', onPopstate)
		on(window, 'pushstate', onPushstate)
		on(window, 'replacestate', onReplacestate)
        
		return () => {
			off(window, 'popstate', onPopstate)
			off(window, 'pushstate', onPushstate)
			off(window, 'replacestate', onReplacestate)
		}
	}, [])
    
	return state
}

// ie没有event
const hasEventConstructor = typeof Event === 'function'

export  default isClient && hasEventConstructor ? useLocationServer : useLocationBrowser

