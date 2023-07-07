import React from 'react'
import { useLearn } from 'features/learn/hooks/useLearn'
import IconButton from '@mui/material/IconButton'
import SchoolIcon from '@mui/icons-material/School'

type LearnPackPropsType = {
    packId: string
    isCards: boolean
}
export const LearnPack: React.FC<LearnPackPropsType> =({ packId, isCards }) => {
    const { learnHandler } = useLearn(packId)

    return (
        <IconButton size={'small'} onClick={learnHandler} disabled={isCards}>
            <SchoolIcon />
        </IconButton>
    )
}