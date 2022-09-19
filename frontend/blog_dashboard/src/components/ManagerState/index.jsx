import React from 'react'
import ModalState from './ModalState'
import UserState from './UserState'

ManagerState.propTypes = {}

function ManagerState() {
    return (
        <>
            <UserState />
            <ModalState />
        </>
    )
}

export default ManagerState
