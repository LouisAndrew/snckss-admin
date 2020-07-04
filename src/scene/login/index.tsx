import React, { useContext, useState } from 'react'
import { useAuth, useFirestoreDocData, useFirestore } from 'reactfire'
import firebase from 'firebase'

import { UserContext } from '../../lib/user.context'

interface Props {}

const Login: React.FC<Props> = ({}) => {
        const { user, changeUser } = useContext(UserContext)
        const [verified, setVerified] = useState(false)
        const [error, setError] = useState(false)

        const auth = useAuth()
        const adminRef = useFirestore().collection('admin-user')
        const provider = new firebase.auth.GoogleAuthProvider()

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
                                        setVerified(true)
                                        setError(false)
                                } else {
                                        setError(true)
                                        setVerified(false)
                                }
                        })
                        .catch(() => {
                                setError(true)
                                setVerified(false)
                        })
        }

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
                        console.log(hashed)
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
                </>
        )
}

export default Login
