import React, { useState } from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'

import config from './lib/firebase-config'
// import logo from './logo.svg'
import Button from './components/button'
import { initial, UserContext } from './lib/user.context'
import { Admin } from 'ts/interfaces/admin'
import Login from './scene/login'
import Main from './scene/main'

import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'

function App() {
        const [user, setUser] = useState(initial)

        /**
         * empty params would means log out!
         * @param info admin credentials
         */
        const changeUser = (info?: Admin) => {
                if (info) {
                        const { name, uid } = info
                        setUser({
                                name,
                                uid,
                                isLoggedIn: true,
                        })
                } else {
                        setUser(initial)
                }
        }

        // for testing purposes -> no log in required here
        const skipLogin = () => {
                if (!user.isLoggedIn) {
                        setUser({
                                ...initial,
                                isLoggedIn: true,
                        })
                }
        }

        skipLogin()

        return (
                <FirebaseAppProvider firebaseConfig={config}>
                        <UserContext.Provider value={{ user, changeUser }}>
                                <SuspenseWithPerf
                                        fallback={<h1>Loading!</h1>}
                                        traceId="loading whatever the fuck that is"
                                >
                                        {user.isLoggedIn ? <Main /> : <Login />}
                                        <Button text="click me!" />
                                </SuspenseWithPerf>
                        </UserContext.Provider>
                </FirebaseAppProvider>
        )
}

export default App
