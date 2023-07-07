import React, { FC } from 'react'
import TextField from '@mui/material/TextField'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { FormInputValues } from 'common'

type TextFormatModalPropsType = {
    question?: string
    answer?: string
    register: UseFormRegister<FormInputValues>
}

export const TextFormatModal: FC<TextFormatModalPropsType> = ({ question, answer, register }) => {
    return (
        <>
            <TextField
                defaultValue={question}
                {...register('question')}
                variant='standard'
                label='Question'
                margin='normal'
            />
            <TextField
                defaultValue={answer}
                {...register('answer')}
                sx={{ m: '40px 0' }}
                variant='standard'
                label='Answer'
                margin='normal'
            />
        </>
    )
}
