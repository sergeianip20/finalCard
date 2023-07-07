import React from 'react'
import Grid from '@mui/material/Grid'
import { CreatePack } from 'features/packs/components/pack-actions/CreatePack'
import { PageTitle } from 'common'

export const PacksHeader = () => {
    return (
        <>
            <Grid item md={8}>
                <PageTitle title={'Packs list'} />
            </Grid>
            <Grid item md={4} display={'flex'} justifyContent={'flex-end'}>
                <CreatePack />
            </Grid>
        </>
    )
}
