import React, { FC, FormEventHandler, memo, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { AppLink, SuperButton } from 'common'

type FormPropsType = {
    description?: string
    link?: {
        to: string
        text: string
    }
    title: string
    btnName: string
    onClick?: () => void
    onSubmit?: FormEventHandler
}

export const Form: FC<FormPropsType & PropsWithChildren> = memo(
    ({ children, btnName, description, link, title, onClick, onSubmit }) => {
        return (
            <Grid paddingTop={'70px'} container alignItems={'center'} justifyContent={'center'}>
                <Paper sx={{ padding: '40px 35px' }}>
                    <form onSubmit={onSubmit} style={{ maxWidth: '350px' }}>
                        <Typography
                            component={'h2'}
                            style={{ fontWeight: '600', fontSize: '26px', textAlign: 'center' }}
                        >
                            {title}
                        </Typography>
                        <FormControl>
                            <FormGroup sx={{ display: 'flex', gap: '25px', marginBottom: '20px' }}>
                                {children}
                            </FormGroup>
                            <SuperButton
                                name={btnName}
                                color={'primary'}
                                textColor={'white'}
                                width={'347'}
                                rounded={true}
                                margin={'30px 0 0 0'}
                                callback={onClick}
                            />
                            {description && (
                                <Typography
                                    sx={{
                                        m: '20px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        opacity: '0.6',
                                    }}
                                    alignSelf={'center'}
                                >
                                    {description}
                                </Typography>
                            )}
                            {link && (
                                <AppLink fontWeight={600}>
                                    <Link to={link.to}>{link.text}</Link>
                                </AppLink>
                            )}
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        )
    }
)
