import React, { useCallback } from 'react'
import notFound from 'assets/img/400.svg'
import { SuperButton } from 'common'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { paths } from 'common'

export const PageNotFound = () => {
    const navigate = useNavigate()
    const toPacks = useCallback(() => navigate(paths.PACKS), [])
    return (
        <Grid
            container
            height={'100vh'}
            spacing={5}
            margin={'0 auto'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Grid item sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid item>
                    <Box component={'span'} sx={{ fontSize: '50px', fontWeight: '600' }}>
                        Oops!
                    </Box>
                </Grid>
                <Grid item>
                    <Typography>Sorry! Page not Found!</Typography>
                </Grid>
                <Grid item>
                    <SuperButton
                        callback={toPacks}
                        name={'Back to home page!'}
                        textColor={'white'}
                        color={'primary'}
                        rounded={true}
                    />
                </Grid>
            </Grid>
            <Grid item>
                <img src={notFound} alt='Page not found' />
            </Grid>
        </Grid>
    )
}
