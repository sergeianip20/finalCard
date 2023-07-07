import React, { memo } from 'react'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import { CustomTable, CardsRating, TableData, TableSkeleton } from 'common'
import { useCards } from 'features/cards/hooks/useCards'
import { CardsTableActions } from 'features/cards/components/cards-actions/CardsTableActions'
import { useAuth } from 'features/auth/hooks/useAuth'
import { useAppState } from 'app'

export const CardsTable = memo(() => {
    const { cards, packUserId, cardsPageCountParams, setSort, onChangeSort, sort } = useCards()
    const { authorizedUserId } = useAuth()
    const { isCardsLoading } = useAppState()
    const isMyPack = packUserId === authorizedUserId
    const tableBodySX = {
        wordWrap: 'break-word',
        minWidth: '150px',
        maxWidth: '200px',
    }
    return (
        <div>
            <CustomTable
                tableCellForHeader={['Question', 'Answer', 'Last Updated', 'Grade']}
                sortHandler={onChangeSort}
                setSort={setSort}
                sort={sort}
            >
                {isCardsLoading ? (
                    <TableSkeleton defaultCell={4} defaultRow={cardsPageCountParams ?? '4'} />
                ) : (
                    cards?.map(card => (
                        <TableRow key={card._id}>
                            <TableCell sx={{ ...tableBodySX, paddingLeft: '40px' }}>
                                <TableData image={card.questionImg} text={card.question} />
                            </TableCell>
                            <TableCell sx={tableBodySX}>
                                <TableData image={card.answerImg} text={card.answer} />
                            </TableCell>
                            <TableCell sx={tableBodySX}>{card.updated.slice(0, 10)}</TableCell>
                            <TableCell sx={tableBodySX}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CardsRating defaultValue={card.grade} />
                                    {isMyPack && (
                                        <CardsTableActions
                                            cardId={card._id}
                                            question={card.question}
                                            answer={card.answer}
                                            questionImg={card.questionImg}
                                            answerImg={card.answerImg}
                                        />
                                    )}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </CustomTable>
        </div>
    )
})
