import { usePacksParamsFilter } from 'features/packs/hooks/usePacksParamsFilter'
import { useAppDispatch } from 'app'
import React, { useEffect } from 'react'
import { packsAction, packsThunks } from 'features/packs/packs.slice'
import { PacksFilter } from 'features/packs/components/packs/PacksFilter'
import { PacksTable } from 'features/packs/components/packs/PacksTable'

export const PackMain = () => {
    const { searchParams } = usePacksParamsFilter()
    const dispatch = useAppDispatch()
    const paramsSearch = Object.fromEntries(searchParams)

    useEffect(() => {
        dispatch(packsAction.setQueryParams({ params: { ...paramsSearch } }))
        dispatch(packsThunks.getPacks())
    }, [dispatch])
    return (
        <>
            <PacksFilter>
                <PacksTable />
            </PacksFilter>
        </>
    )
}