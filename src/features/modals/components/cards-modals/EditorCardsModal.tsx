import React, { useState } from 'react'
import { Control, UseFormRegister } from 'react-hook-form/dist/types/form'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FormInputValues } from 'common'
import { TextFormatModal } from 'features/modals/components/cards-modals/TextFormatModal'
import { ImageFormatModal } from 'features/modals/components/cards-modals/ImageFormatModal'

type EditorCardsModalPropsType = {
    register: UseFormRegister<FormInputValues>
    question?: string
    answer?: string
    answerImg: string
    questionImg: string
    control: Control<FormInputValues>
}
export const EditorCardsModal: React.FC<EditorCardsModalPropsType> = ({
    register,
    question,
    answer,
    questionImg,
    answerImg,
    control,
}) => {
    const [variant, setVariant] = useState<'text' | 'image'>('text')

    const changeFormatHandler = () => {
        const formVariant = variant === 'text' ? 'image' : 'text'
        setVariant(formVariant)
    }

    return (
        <>
            <Typography component={'span'} sx={{ opacity: '0.5' }}>
                Chose a question format
            </Typography>
            <Select sx={{ height: '36px' }} defaultValue={'text'}>
                <MenuItem value={'text'} sx={{ width: '300px' }} onClick={changeFormatHandler}>
                    Text
                </MenuItem>
                <Divider />
                <MenuItem value={'image'} sx={{ width: '300px' }} onClick={changeFormatHandler}>
                    Image
                </MenuItem>
            </Select>
            {variant === 'text' ? (
                <TextFormatModal question={question} answer={answer} register={register} />
            ) : (
                <ImageFormatModal
                    register={register}
                    questionImg={questionImg}
                    answerImg={answerImg}
                    control={control}
                />
            )}
        </>
    )
}
