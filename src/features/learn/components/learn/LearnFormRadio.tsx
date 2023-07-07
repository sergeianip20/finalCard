import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { SuperButton, FormInputValues, useAppForm } from 'common'
import { LearnData } from 'features/learn/components/learn/LearnData'
import { GradeType } from 'features/learn/hooks/useLearn'
import { useAppState } from 'app'

type LearnFormRadioPropsType = {
    answer: string
    answerImg?: string
    updateCardGrade: (grade: GradeType) => void
}
export const LearnFormRadio: React.FC<LearnFormRadioPropsType> = ({
    answer,
    answerImg,
    updateCardGrade,
}) => {
    const { handleSubmit, register } = useAppForm([])
    const { isLoadingLearn } = useAppState()

    const onSubmit = (data: FormInputValues) => updateCardGrade(data.radio)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ width: '100%' }}>
                <LearnData title={'Answer'} data={answer} dataImg={answerImg} />
                <FormLabel>Rate yourself:</FormLabel>
                <RadioGroup
                    defaultValue='1'
                    name='radio-buttons-group'
                    sx={{ marginBottom: '20px' }}
                >
                    <FormControlLabel
                        value='1'
                        control={<Radio {...register('radio')} />}
                        label='Did not know'
                    />
                    <FormControlLabel
                        value='2'
                        control={<Radio {...register('radio')} />}
                        label='Forgot'
                    />
                    <FormControlLabel
                        value='3'
                        control={<Radio {...register('radio')} />}
                        label='A lot of thought'
                    />
                    <FormControlLabel
                        value='4'
                        control={<Radio {...register('radio')} />}
                        label='Сonfused'
                    />
                    <FormControlLabel
                        value='5'
                        control={<Radio {...register('radio')} />}
                        label='Knew the answer'
                    />
                </RadioGroup>
                <SuperButton
                    name={'Next'}
                    rounded={true}
                    textColor={'white'}
                    disable={isLoadingLearn}
                />
            </FormControl>
        </form>
    )
}
