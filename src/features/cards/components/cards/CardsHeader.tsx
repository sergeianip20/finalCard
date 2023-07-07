import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import PendingIcon from '@mui/icons-material/Pending'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import { PageTitle, usePopover, CustomPopover, PopoverCards, SuperButton } from 'common'
import { useCards } from 'features/cards/hooks/useCards'
import { useAuth } from 'features/auth/hooks/useAuth'
import { CreateCard } from 'features/cards/components/cards-actions/CreateCard'
import { useAppState } from 'app'
import { useLearn } from 'features/learn/hooks/useLearn'

export const CardsHeader = () => {
    const { packUserId, selectedPack, cards } = useCards()
    const { authorizedUserId } = useAuth()
    const { anchorEl, closePopover, handleClick } = usePopover()
    const { isCardsLoading } = useAppState()
    const { learnHandler } = useLearn(selectedPack._id)

    const isMyPack = packUserId === authorizedUserId

    return (
        <>
            <Grid item md={6}>
                {isCardsLoading ? (
                    <Skeleton width={'150px'} height={'32px'} />
                ) : isMyPack ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                            <PageTitle title={selectedPack.name} />
                            <IconButton onClick={handleClick} sx={{ height: '32px', p: '0' }}>
                                <PendingIcon color={'primary'} />
                            </IconButton>
                        </Box>
                    </Box>
                ) : (
                    <PageTitle title={selectedPack.name} />
                )}
                {selectedPack.deckCover && (
                    <div
                        style={{
                            marginTop: '20px',
                            width: '170px',
                            height: '110px',
                            background: `url(${selectedPack.deckCover}) no-repeat left/contain`,
                        }}
                    />
                )}
            </Grid>
            <Grid item md={6} display={'flex'} justifyContent={'flex-end'}>
                <Box>
                    {isMyPack ? (
                        <CreateCard />
                    ) : (
                        <SuperButton
                            name={'Learn Pack'}
                            rounded={true}
                            textColor={'white'}
                            callback={learnHandler}
                            disable={cards?.length === 0}
                        />
                    )}
                </Box>
            </Grid>
            <CustomPopover anchorEl={anchorEl} closePopover={closePopover}>
                <PopoverCards
                    cards={cards?.length}
                    packId={selectedPack._id}
                    packName={selectedPack.name}
                    packCover={selectedPack.deckCover}
                    handleClose={closePopover}
                />
            </CustomPopover>
        </>
    )
}
