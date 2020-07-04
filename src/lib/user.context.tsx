import React, { useState, createContext } from 'react'
import { Admin } from '../interfaces/admin'

export interface User extends Admin {
        isLoggedIn: boolean
}

export interface IContext {
        user: User
        changeUser: ({ name, uid }: Admin) => void
}

export const initial: User = {
        name: '',
        uid: '',
        isLoggedIn: false,
}

export const UserContext = createContext<Partial<IContext>>({})
