import React, { FC, memo } from 'react'
import Box from '@mui/material/Box'
import { UpdatePack } from 'features/packs/components/pack-actions/UpdatePack'
import { RemovePack } from 'features/packs/components/pack-actions/RemovePack'
import { LearnPack } from 'features/packs/components/pack-actions/LearnPack'

type TableActionsPropsType = {
    packName: string
    myCards: boolean
    packId: string
    packCover?: string
    isCards: boolean
}

export const PacksTableActions: FC<TableActionsPropsType> = memo(
    ({ packId, myCards, packName, isCards, packCover }) => {
        return (
            <Box display={'flex'}>
                <LearnPack packId={packId} isCards={isCards} />
                {myCards && (
                    <UpdatePack packName={packName} packId={packId} packCover={packCover} />
                )}
                {myCards && <RemovePack packName={packName} packId={packId} packCover={packCover} />}
            </Box>
        )
    }
)
