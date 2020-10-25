import React, { useState, useCallback } from 'react'

//@ts-ignore
const useArray = initial => {
	const [ value, setValue ] = useState(initial)
    
	return {
		value,
		setValue,

		//@ts-ignore
		add: useCallback(item => setValue(v => [ ...v, item ])),

		//@ts-ignore
		removeById: useCallback(id => setValue(arr => arr.filter(v => v && v.id !== id))),

		//@ts-ignore
		removeIndex: useCallback(index => setValue(v => { v.splice(index, 1); return v }))
	}
}

export default useArray

