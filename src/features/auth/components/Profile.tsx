import React from 'react'
import { BackTo, paths, ProfileCard } from 'common'

export const Profile = () => {
    return (
        <>
            <BackTo text={'Back to Packs List'} link={paths.PACKS} />
            <ProfileCard />
        </>
    )
}
