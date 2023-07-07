import { RootState } from 'app'

const cardsSelector = (state: RootState) => state.cards.cards.cards
const cardsPageCountSelector = (state: RootState) => state.cards.cards.pageCount
const cardsPageSelector = (state: RootState) => state.cards.cards.page
const selectedCardsPackIdSelector = (state: RootState) => state.cards.selectedCardsPackId
const cardsTotalCountSelector = (state: RootState) => state.cards.cards.cardsTotalCount
const packUserIdSelector = (state: RootState) => state.cards.cards.packUserId
const isCardsLoadingSelector = (state: RootState) => state.cards.isLoading
const cardsPageCountParamsSelector = (state: RootState) => state.cards.params.pageCount
const cardQuestionsSelector = (state: RootState) => state.cards.updateCardQuestions
const cardsInfoMessageSelector = (state: RootState) => state.cards.infoMessage

export {
    cardsSelector,
    cardsPageCountSelector,
    cardsPageSelector,
    cardsTotalCountSelector,
    selectedCardsPackIdSelector,
    packUserIdSelector,
    isCardsLoadingSelector,
    cardsPageCountParamsSelector,
    cardQuestionsSelector,
    cardsInfoMessageSelector,
}
