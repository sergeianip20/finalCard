import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './app.slice'
import { authReducer } from 'features/auth/auth.slice'
import { packsReducer } from 'features/packs/packs.slice'
import { cardsReducer } from 'features'
import { modalsReducer } from 'features/modals/modals.slice'
import { learnReducer } from 'features/learn/learn.slice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        packs: packsReducer,
        cards: cardsReducer,
        modals: modalsReducer,
        learn: learnReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
