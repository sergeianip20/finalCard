import { useAppSelector, useAppDispatch } from 'app'
import { useSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { userIdSelector } from 'features/auth/auth.selectors'
import { packsAction, packsThunks } from 'features/packs/packs.slice'
import { packsSelector, paramsSelector } from 'features/packs/packs.selectors'
import { GetPacksParamsType } from 'features/packs/packs.api'

export const usePacksParamsFilter = () => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(true)
    const [onMy, setOnMy] = useState(true)
    const [valueSlider, setValueSlider] = useState<number[]>([0, 100])
    const [timoutId, setTimeoutId] = useState<number | undefined>(undefined)
    const packs = useAppSelector(packsSelector)
    const params = useAppSelector(paramsSelector)
    const userId = useAppSelector(userIdSelector)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const lastParams: GetPacksParamsType = {}
        if (params.user_id?.length) lastParams.user_id = params.user_id
        if (params.page) +params.page > 1 && (lastParams.page = params.page)
        if (params.pageCount) +params.pageCount > 4 && (lastParams.pageCount = params.pageCount)
        if (params.min) +params.min > 0 && (lastParams.min = params.min)
        if (params.max) +params.max !== 100 && (lastParams.max = params.max)
        if (params.sortPacks)
            params.sortPacks === '1updated' && (lastParams.sortPacks = params.sortPacks)
        if (params.packName?.length) lastParams.packName = params.packName
        setSearchParams({ ...lastParams })
    }, [setSearchParams, params])

    const onDispatchParams = useCallback((paramsArg: GetPacksParamsType) => {
        dispatch(packsAction.setQueryParams({ params: { ...paramsArg } }))
        dispatch(packsThunks.getPacks())
    }, [])

    const onChangePagination = useCallback(
        (page: string, pageCount: string) => {
            onDispatchParams({ page, pageCount })
        },
        [onDispatchParams]
    )

    const onChangeSlider = useCallback(
        (min: string, max: string) => {
            onDispatchParams({ min, max, page: '1' })
        },
        [onDispatchParams]
    )

    const onClickShowPacksCards = useCallback(() => {
        if (onMy) {
            onDispatchParams({ user_id: userId, page: '1' })
        } else {
            onDispatchParams({ user_id: '', page: '1' })
        }
    }, [onDispatchParams, onMy, userId])

    const searchHandler = useCallback(
        (value: string) => {
            clearTimeout(timoutId)
            const newTimeoutId = setTimeout(
                () => onDispatchParams({ packName: value, page: '1' }),
                700
            )
            setTimeoutId(+newTimeoutId)
        },
        [onDispatchParams, timoutId]
    )

    const onChangeText = useCallback(
        (value: string) => {
            setSearch(value)
            searchHandler(value)
        },
        [searchHandler]
    )

    const clearFiltersHandler = useCallback(() => {
        onDispatchParams({
            page: '1',
            pageCount: '4',
            min: '0',
            max: '100',
            user_id: '',
            packName: '',
        })
        setSearch('')
        setValueSlider([0, 100])
        setOnMy(true)
    }, [onDispatchParams])

    const sortHandler = useCallback(() => {
        onDispatchParams({
            sortPacks: sort ? '1updated' : '0updated',
            page: '1',
        })
    }, [onDispatchParams, sort])

    return {
        packs,
        params,
        userId,
        search,
        sort,
        valueSlider,
        setValueSlider,
        setSort,
        searchParams,
        onMy,
        setOnMy,
        sortHandler,
        onChangePagination,
        onChangeSlider,
        onClickShowPacksCards,
        onChangeText,
        clearFiltersHandler,
    }
}
