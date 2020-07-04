import React, { useState } from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'

import config from './lib/firebase-config'
import logo from './logo.svg'
import Button from './components/button'
import { initial, UserContext } from './lib/user.context'
import { Admin } from './interfaces/admin'
import Login from './scene/login'

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

        return (
                <FirebaseAppProvider firebaseConfig={config}>
                        <UserContext.Provider value={{ user, changeUser }}>
                                <SuspenseWithPerf
                                        fallback={<h1>Loading!</h1>}
                                        traceId="loading whatever the fuck that is"
                                >
                                        <Login />
                                        <Button text="click me!" />
                                </SuspenseWithPerf>
                        </UserContext.Provider>
                </FirebaseAppProvider>
        )
}

export default App
