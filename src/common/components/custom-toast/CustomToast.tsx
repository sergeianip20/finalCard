import React, { FC } from 'react'
import Box from '@mui/material/Box'

type CustomToastPropsType = {
    question: string
    questionImg: string
    infoMessage: string
}

export const CustomToast: FC<CustomToastPropsType> = ({ question, questionImg, infoMessage }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {questionImg !== ' ' && (
                <>
                    <img style={{ width: '40px' }} src={questionImg} alt='notify_img' />
                    <span>{infoMessage}</span>
                </>
            )}
            {question !== ' ' && question !== 'no question' && (
                <span>
                    {question} {infoMessage}
                </span>
            )}
            {(question === ' ' || question === 'no question') && questionImg === ' ' && (
                <span>
                    Card is empty! <br /> Please add some info!
                </span>
            )}
        </Box>
    )
}
