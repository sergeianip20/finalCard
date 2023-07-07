import { RootState } from 'app'

const packsSelector = (state: RootState) => state.packs.packs
const paramsSelector = (state: RootState) => state.packs.params
const packsErrorSelector = (state: RootState) => state.packs.error
const packsInfoMessageSelector = (state: RootState) => state.packs.infoMessage
const isLoadingPacksSelector = (state: RootState) => state.packs.isLoading
const selectedPackSelector = (state: RootState) => state.packs.selectedPack

export {
    packsSelector,
    paramsSelector,
    isLoadingPacksSelector,
    packsErrorSelector,
    packsInfoMessageSelector,
    selectedPackSelector,
}
