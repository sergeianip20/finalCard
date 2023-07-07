import { isLoadingPacksSelector } from 'features/packs/packs.selectors'
import { isLoadingLearnSelector } from 'features/learn/learn.selector'
import { isCardsLoadingSelector } from 'features/cards/cards.selectors'
import { isInitializeSelector, isLoadingSelector, useAppSelector } from 'app'

export const useAppState = () => {
    const isAuthLoading = useAppSelector(isLoadingSelector)
    const isInitialize = useAppSelector(isInitializeSelector)
    const isPacksLoading = useAppSelector(isLoadingPacksSelector)
    const isLearnLoading = useAppSelector(isLoadingLearnSelector)
    const isCardsLoading = useAppSelector(isCardsLoadingSelector)

    const isLoadingApp = isAuthLoading || isPacksLoading || isCardsLoading
    const isLoadingLearn = isAuthLoading || isLearnLoading

    return {
        isInitialize,
        isLoadingApp,
        isCardsLoading,
        isLoadingLearn,
    }
}
