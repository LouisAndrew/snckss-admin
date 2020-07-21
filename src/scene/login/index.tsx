import React, { useContext, useEffect, useReducer } from 'react'
import { useAuth, useFirestore, useFirebaseApp } from 'reactfire'
import firebase from 'firebase'
import { Button } from 'reactstrap'

import { UserContext } from '../../lib/user.context'
import './styles.scss'

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
        error: false,
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
                try {
                        const rq = await auth.signInWithPopup(provider)
                        const user = await rq.user

                        if (user) {
                                const { displayName, email } = user
                                const hashed = hashCode(
                                        (displayName ? displayName : '') +
                                                (email ? email : '')
                                )
                                verify(hashed)
                        }
                } catch (error) {
                        const { message } = error
                        dispatch({
                                type: Actions.ERROR,
                                payload: {
                                        errMsg: message,
                                },
                        })
                }
        }

        const handleClick = () => {
                signIn()
        }

        return (
                <div className="wrapper">
                        <div className="login">
                                <h1>Snckss Admin Panel</h1>
                                <h3>Please login to continue</h3>
                                <Button onClick={handleClick} color="primary">
                                        Login with google
                                </Button>
                                {error && errMsg !== '' && (
                                        <h5
                                                className="error"
                                                style={{ fontSize: 'medium' }}
                                        >
                                                {errMsg}. Please try again
                                        </h5>
                                )}
                        </div>
                </div>
        )
}

export default Login
