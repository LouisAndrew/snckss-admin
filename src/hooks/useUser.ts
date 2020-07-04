import React, { useState } from 'react'
import { IContext, initial, User } from '../lib/user.context'
import { Admin } from '../interfaces/admin'

const useUser = (): IContext => {
        const { user: initialUser } = initial

        const [user, setUser] = useState(initialUser)

        const changeUser = ({ name, uid }: Admin) => {}

        return {
                user,
                changeUser,
        }
}

export default useUser
