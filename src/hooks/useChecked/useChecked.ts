import React, { useState, useEffect, useCallback, useMemo } from 'react'

interface Option {
    key?: string
}
type CheckedMap = { [id: number]: boolean }
type FilterCheckedFunc<T> = (item: T) => boolean
const useChecked = <T extends Record<string, any>>(dataSource: T[], { key = 'id' }: Option = {}) => {
    const [checkedMap, setCheckedMap] = useState<CheckedMap>({})
    const onCheckAllChange = (newCheckedAll: boolean) => {
        const newCheckedMap: CheckedMap = {}
        dataSource.map(dataItem => { newCheckedMap[dataItem.id] = newCheckedAll })
        setCheckedMap(newCheckedMap)
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