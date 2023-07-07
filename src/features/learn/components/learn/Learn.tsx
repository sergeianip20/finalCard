import React from 'react'
import { BackTo, paths, SuperButton } from 'common'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import { LearnFormRadio } from 'features/learn/components/learn/LearnFormRadio'
import { LearnData } from 'features/learn/components/learn/LearnData'
import { useLearn } from 'features/learn/hooks/useLearn'
import { useAppState } from 'app'

export const Learn = () => {
    const { showAnswer, card, onShowAnswer, selectedPack, updateCardGrade } = useLearn()
    const { isLoadingLearn } = useAppState()

    return (
        <>
            <BackTo link={paths.PACKS} text={'Back to Packs List'} />
            <Grid
                container
                spacing={3}
                direction='column'
                alignItems='center'
                sx={{ marginTop: '20px' }}
            >
                <Grid item xs={12}>
                    <Typography variant='h5' component='h4' sx={{ fontWeight: 600 }}>
                        Learn: {selectedPack.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        variant='outlined'
                        sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: '35px' }}
                    >
                        <LearnData
                            title={'Question'}
                            data={card.question}
                            dataImg={card.questionImg}
                        />
                        <Typography
                            variant='subtitle2'
                            component='div'
                            sx={{ marginBottom: '20px', opacity: 0.5 }}
                        >
                            Количество попыток ответов на вопрос:{' '}
                            {isLoadingLearn ? <Skeleton variant='text' /> : <b>{card.shots}</b>}
                        </Typography>
                        {showAnswer ? (
                            <LearnFormRadio
                                answer={card.answer}
                                answerImg={card.answerImg}
                                updateCardGrade={updateCardGrade}
                            />
                        ) : (
                            <SuperButton
                                name={'Show answer'}
                                rounded={true}
                                textColor={'white'}
                                callback={onShowAnswer}
                                disable={isLoadingLearn}
                            />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
