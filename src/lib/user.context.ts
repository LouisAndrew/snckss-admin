import React, { createContext } from 'react'
import { Admin } from '../interfaces/admin'

export interface User extends Admin {
        isLoggedIn: boolean
}

export interface IContext {
        user: User
        changeUser: ({ name, uid }: Admin) => void
}

export const initial: IContext = {
        user: {
                name: '',
                uid: '',
                isLoggedIn: false,
        },
        changeUser: () => {},
}

export const UserContext: React.Context<IContext> = createContext(initial)

const ContextProvider = UserContext.Provider

export default ContextProvider
