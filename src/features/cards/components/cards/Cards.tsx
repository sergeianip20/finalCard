import React from 'react'
import { BackTo, paths } from 'common'
import Grid from '@mui/material/Grid'
import { CardsHeader } from 'features/cards/components/cards/CardsHeader'
import { CardsFilter } from 'features/cards/components/cards/CardsFilter'
import { CardsTable } from 'features/cards/components/cards/CardsTable'

export const Cards = () => {
    return (
        <>
            <BackTo link={paths.PACKS} text={'Back to Packs List'} />
            <Grid container spacing={2} sx={{ mt: '1px' }} rowSpacing={5}>
                <CardsHeader />
                <CardsFilter>
                    <CardsTable />
                </CardsFilter>
            </Grid>
        </>
    )
}
