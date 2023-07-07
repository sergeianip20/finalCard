import React, { FC, memo } from 'react'
import { SearchBar, CardsPagination } from 'common'
import Grid from '@mui/material/Grid'
import { useCards } from 'features/cards/hooks/useCards'
import { useAppState } from 'app/hooks/useAppState'

type CardsFilterPropsType = {
    children: React.ReactNode
}
export const CardsFilter: FC<CardsFilterPropsType> = memo(({ children }) => {
    const {
        cardsTotalCount,
        cardsPageCount,
        cardsPage,
        onChangePagination,
        debouncedSearch,
        searchValue,
    } = useCards()
    const { isCardsLoading } = useAppState()
    return (
        <>
            <Grid item md={12}>
                <SearchBar
                    onChange={debouncedSearch}
                    value={searchValue}
                    fullWidth={true}
                    disabled={isCardsLoading}
                />
            </Grid>
            <Grid item md={12}>
                {children}
            </Grid>
            <Grid item md={12}>
                <CardsPagination
                    disabled={isCardsLoading}
                    page={cardsPage}
                    pageCount={cardsPageCount}
                    totalCount={cardsTotalCount}
                    onChange={onChangePagination}
                />
            </Grid>
        </>
    )
})
