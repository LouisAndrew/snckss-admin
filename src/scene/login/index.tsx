import React, { useContext, useState, useEffect, useReducer } from 'react'
import { useAuth, useFirestore } from 'reactfire'
import firebase from 'firebase'

import { UserContext } from '../../lib/user.context'
import { act } from 'react-dom/test-utils'

interface State {
        verified: boolean
        error: boolean
        errMsg: string
        name: string
        uid: string
}

// actions enum
enum Actions {
        VERIFY,
        ERROR,
        LOG_IN,
        LOG_OUT,
}

const reducer: React.Reducer<State, any> = (state, action): State => {
        const { type } = action
        switch (type) {
                case Actions.VERIFY:
                        return {
                                ...state,
                                verified: true,
                                error: false,
                                errMsg: '',
                        }
                case Actions.ERROR:
                        const {
                                payload: { errMsg },
                        } = action
                        return {
                                ...state,
                                verified: false,
                                error: true,
                                errMsg,
                        }
                case Actions.LOG_IN:
                        const {
                                payload: { name, uid },
                        } = action
                        return {
                                ...state,
                                name,
                                uid,
                        }
                case Actions.LOG_OUT:
                        return initial
                default:
                        return state
        }
}

// initial state for the reducer
const initial: State = {
        verified: false,
        error: true,
        errMsg: '',
        name: '',
        uid: '',
}

interface Props {}

const Login: React.FC<Props> = ({}) => {
        const { user, changeUser } = useContext(UserContext)

        const [state, dispatch] = useReducer(reducer, initial)
        const { verified, error, errMsg, name, uid } = state

        const auth = useAuth()
        const adminRef = useFirestore().collection('admin-user')
        const provider = new firebase.auth.GoogleAuthProvider()

        useEffect(() => {
                if (verified && changeUser) {
                        changeUser({ name, uid })
                }
        }, [verified, name])

        // code were taken from an answer here:
        // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
        const hashCode = (s: string): number =>
                s
                        .split('')
                        .reduce(
                                (a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0,
                                0
                        )

        /**
         * function to verify user trying to sign in by comparing it to the database's admin users
         * @param hash hash number returned by hashCode function
         */
        const verify = (hash: number): void => {
                adminRef.where('hashValue', '==', hash)
                        .get()
                        .then((docs) => {
                                if (!docs.empty) {
                                        dispatch({ type: Actions.VERIFY })
                                        const {
                                                name,
                                                uid,
                                        } = docs.docs[0].data()
                                        dispatch({
                                                type: Actions.LOG_IN,
                                                payload: { name, uid },
                                        })
                                } else {
                                        dispatch({
                                                type: Actions.ERROR,
                                                payload: {
                                                        errMsg:
                                                                'No admin user found',
                                                },
                                        })
                                }
                        })
                        .catch(() => {
                                dispatch({
                                        type: Actions.ERROR,
                                        payload: {
                                                errMsg:
                                                        'Network error, Please try again',
                                        },
                                })
                        })
        }

        /**
         * async function to sign in admin user and checks if the user exists in admin database
         */
        const signIn = async () => {
                const rq = await auth.signInWithPopup(provider)
                const user = await rq.user

                if (user) {
                        console.log(user)
                        const { displayName, email } = user
                        const hashed = hashCode(
                                (displayName ? displayName : '') +
                                        (email ? email : '')
                        )
                        verify(hashed)
                }
        }

        const handleClick = () => {
                signIn()
        }

        return (
                <>
                        <h1>Hello, please login to continue</h1>
                        <button onClick={handleClick}>Login with google</button>
                        {verified && <h1>Welcome!!!</h1>}
                        {error && <h1>Not welcome!</h1>}
                        {name && <h2>Welcome, {name}</h2>}
                </>
        )
}

export default Login
