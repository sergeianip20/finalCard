import { isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit'
import { authThunks } from 'features/auth/auth.slice'
import { learnThunks } from 'features/learn/learn.slice'
import { cardsThunks } from 'features'

export const rejected = isRejectedWithValue(
    authThunks.login,
    authThunks.forgotPassword,
    authThunks.logout,
    authThunks.updateProfile,
    authThunks.register,
    authThunks.setNewPassword,
    cardsThunks.getCards,
    cardsThunks.updateCard,
    cardsThunks.createCard,
    cardsThunks.removeCard
)
export const fulfilledWithInfo = isFulfilled(
    authThunks.logout,
    authThunks.forgotPassword,
    authThunks.setNewPassword
)
export const loginFulfilled = isFulfilled(authThunks.login)
export const fulfilled = isFulfilled(
    authThunks.login,
    authThunks.forgotPassword,
    authThunks.logout,
    authThunks.updateProfile,
    authThunks.register,
    authThunks.setNewPassword,
    learnThunks.getSortCard
)
export const pending = isPending(
    authThunks.login,
    authThunks.forgotPassword,
    authThunks.logout,
    authThunks.updateProfile,
    authThunks.register,
    authThunks.setNewPassword,
    learnThunks.getSortCard
)
export const initializePending = isPending(authThunks.authMe)
