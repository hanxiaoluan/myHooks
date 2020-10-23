import React, { useState, useEffect, useCallback, useMemo, useReducer } from 'react'

const CHECKED_CHANGE = 'CHECKED_CHANGE'
const CHECKED_ALL_CHANGE = 'CHECKED_ALL_CHANGE'
const SET_CHECKED_MAP = 'SET_CHECKED_MAP'
interface Option {
    key?: string
}
type CheckedMap = { [id: number]: boolean }
type FilterCheckedFunc<T> = (item: T) => boolean
type CheckedChange<T> = {
    type: typeof CHECKED_CHANGE
    payload: {
        cartItem: T
        checked: boolean
    }
}
type CheckedAllChange = {
    type: typeof CHECKED_ALL_CHANGE
    payload: boolean
}
type SetCheckedMap = {
    type: typeof SET_CHECKED_MAP
    payload: CheckedMap
}
type Action<T> = CheckedChange<T> | CheckedAllChange | SetCheckedMap

const useChecked = <T extends Record<string, any>>(dataSource: T[], { key = 'id' }: Option = {}) => {

    const [checkedMap, dispatch] = useReducer((checkedMapParam: CheckedMap, action: Action<T>) => {

        switch (action.type) {
            case CHECKED_CHANGE: {
                const { payload } = action
                const { cartItem, checked } = payload
                const { [key]: id } = cartItem
                return {
                    ...checkedMapParam,
                    [id]: checked
                }
            }
            case CHECKED_ALL_CHANGE: {
                const { payload: newCheckedAll } = action
                const newCheckedMap: CheckedMap = {}
                if (newCheckedMap) {
                    dataSource.map((cartItem) => {
                        newCheckedMap[cartItem.id] = newCheckedAll
                    })
                }
                return newCheckedMap
            }
            case SET_CHECKED_MAP: {
                return action.payload
            }
            default:
                return checkedMapParam
        }
    }, {})

    const onCheckAllChange = (newCheckedAll: boolean) => {
        dispatch({
            type: CHECKED_ALL_CHANGE,
            payload: newCheckedAll
        })
    }
    const onCheckedChange = (cartItem: T, checked: boolean) => {
        dispatch({ type: CHECKED_CHANGE, payload: { cartItem, checked } })
    }
    const filterChecked = useCallback((func: FilterCheckedFunc<T> = () => true) => {
        return Object.entries(checkedMap)
            .filter(entries => Boolean(entries[1]))
            .map(([checkedId]) =>
                dataSource.find(({ [key]: id }) => id === Number(checkedId)))
            .filter(Boolean)
            .filter(func as any) as T[]
    }, [checkedMap, dataSource])

    const checkedAll = useMemo(() => dataSource.length !== 0 && filterChecked().length === dataSource.length, [checkedMap])

    return { checkedMap, checkedAll, onCheckAllChange }
}

export default useChecked