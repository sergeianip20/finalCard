import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useAppState } from 'app'

type LearnDataPropsType = {
    title: string
    data: string
    dataImg?: string
}

export const LearnData: React.FC<LearnDataPropsType> = ({ title, data, dataImg }) => {
    const { isLoadingLearn } = useAppState()

    return (
        <Typography variant='subtitle1' component='div' sx={{ marginBottom: '20px' }}>
            <b>{title}: </b>
            {isLoadingLearn ? (
                <Skeleton variant='text' />
            ) : data && data !== ' ' ? (
                <div style={{ wordBreak: 'break-all'}}>{data}</div>
            ) : (
                <div
                    style={{
                        width: '375px',
                        height: '120px',
                        background: `url(${dataImg}) no-repeat center/contain`,
                    }}
                />
            )}
        </Typography>
    )
}
