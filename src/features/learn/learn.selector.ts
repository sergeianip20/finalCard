import { RootState } from 'app'

const learnSelector = (state: RootState) => state.learn.cards
const counterLearnSelector = (state: RootState) => state.learn.answersCount
const selectedPackIdSelector = (state: RootState) => state.learn.selectedPackId
const errorLearnSelector = (state: RootState) => state.learn.error
const isLoadingLearnSelector = (state: RootState) => state.learn.isLoading

export {
    learnSelector,
    counterLearnSelector,
    selectedPackIdSelector,
    errorLearnSelector,
    isLoadingLearnSelector,
}
