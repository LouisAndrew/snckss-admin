import React, { useState } from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'

import config from './lib/firebase-config'
import logo from './logo.svg'
import Button from './components/button'
import { initial, UserContext } from './lib/user.context'
import { Admin } from './interfaces/admin'

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
                                <header className="App-header">
                                        <img
                                                src={logo}
                                                className="App-logo"
                                                alt="logo"
                                        />
                                        <p>
                                                Edit <code>src/App.tsx</code>{' '}
                                                and save to reload.
                                        </p>
                                        <a
                                                className="App-link"
                                                href="https://reactjs.org"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                        >
                                                Learn React
                                        </a>
                                </header>
                                <SuspenseWithPerf
                                        fallback={<h1>Loading!</h1>}
                                        traceId="loading whatever the fuck that is"
                                >
                                        <Button text="click me!" />
                                </SuspenseWithPerf>
                        </UserContext.Provider>
                </FirebaseAppProvider>
        )
}

export default App
