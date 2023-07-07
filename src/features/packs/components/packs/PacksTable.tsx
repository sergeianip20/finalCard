import React from 'react'
import Grid from '@mui/material/Grid'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import { usePacksParamsFilter } from 'features/packs/hooks/usePacksParamsFilter'
import { PacksTableActions } from 'features/packs/components/pack-actions/PacksTableActions'
import { cardsActions, cardsThunks } from 'features/cards/cards.slice'
import { packsAction } from 'features/packs/packs.slice'
import { useNavigate } from 'react-router-dom'
import { CustomTable, TableSkeleton, paths } from 'common'
import { useAppDispatch, useAppState } from 'app'

export const PacksTable = () => {
    const { packs, params, userId, sort, setSort, sortHandler } = usePacksParamsFilter()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isLoadingApp } = useAppState()

    const tableBodySX = {
        wordWrap: 'break-word',
        minWidth: '150px',
        maxWidth: '200px',
        wordBreak: 'break-all',
    }

    const toCards = (id: string) => {
        dispatch(cardsActions.setSelectedCardsPackId(id))
        dispatch(packsAction.setSelectedPack({ id }))
        navigate(paths.CARDS, { state: id })
        dispatch(cardsThunks.getCards())
    }

    return (
        <Grid item md={12}>
            <CustomTable
                disabled={isLoadingApp}
                setSort={setSort}
                sort={sort}
                sortHandler={sortHandler}
                tableCellForHeader={['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']}
            >
                {isLoadingApp ? (
                    <TableSkeleton defaultCell={5} defaultRow={params.pageCount || '4'} />
                ) : (
                    packs.cardPacks?.map(pack => {
                        return (
                            <TableRow
                                key={pack._id}
                                sx={{ ':hover': { backgroundColor: 'rgb(245, 245, 245)' } }}
                            >
                                <TableCell
                                    onClick={() => toCards(pack._id)}
                                    sx={{
                                        ...tableBodySX,
                                        paddingLeft: '40px',
                                        cursor: 'pointer',
                                        verticalAlign: 'center',
                                        ':hover': { textDecoration: 'underline' },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {pack.deckCover && (
                                            <div
                                                style={{
                                                    marginLeft: '-12px',
                                                    width: '60px',
                                                    height: '60px',
                                                    background: `url(${pack.deckCover}) no-repeat center/contain`,
                                                }}
                                            />
                                        )}
                                        <div style={{ wordBreak: 'break-all', width: '160px' }}>
                                            {pack.name}
                                        </div>
                                    </Box>
                                </TableCell>
                                <TableCell sx={tableBodySX}>{pack.cardsCount}</TableCell>
                                <TableCell sx={tableBodySX}>{pack.updated.slice(0, 10)}</TableCell>
                                <TableCell sx={tableBodySX}>{pack.user_name}</TableCell>
                                <TableCell>
                                    <PacksTableActions
                                        packName={pack.name}
                                        myCards={userId === pack.user_id}
                                        packId={pack._id}
                                        packCover={pack.deckCover}
                                        isCards={pack.cardsCount === 0}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })
                )}
            </CustomTable>
        </Grid>
    )
}
