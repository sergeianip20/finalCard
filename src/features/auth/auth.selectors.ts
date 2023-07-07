import { RootState } from 'app'

const profileSelector = (state: RootState) => state.auth.profile
const redirectPathSelector = (state: RootState) => state.auth.redirectPath
const userIdSelector = (state: RootState) => state.auth.profile?._id
const checkEmailMessageSelector = (state: RootState) => state.auth.checkEmailMessage

export { profileSelector, redirectPathSelector, userIdSelector, checkEmailMessageSelector }
