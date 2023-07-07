import { RootState } from 'app'

const errorSelector = (state: RootState) => state.app.error
const infoMessageSelector = (state: RootState) => state.app.infoMessage
const isInitializeSelector = (state: RootState) => state.app.isAppInitialized
const isLoadingSelector = (state: RootState) => state.app.isLoading

export { errorSelector, infoMessageSelector, isInitializeSelector, isLoadingSelector }
