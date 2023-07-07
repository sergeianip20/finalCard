import React from 'react'
import Grid from '@mui/material/Grid'
import { PacksHeader } from 'features/packs/components/packs/PacksHeader'
import { PackMain } from 'features/packs/components/packs/PackMain'

export const Packs = () => {
    return (
        <>
            <Grid container spacing={2} sx={{ mt: '1px' }} rowSpacing={5} alignItems={'flex-end'}>
                <PacksHeader />
                <PackMain />
            </Grid>
        </>
    )
}
