import React from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'

import config from './lib/firebase-config'
import logo from './logo.svg'
import Button from './components/button'

function App() {
        return (
                <FirebaseAppProvider firebaseConfig={config}>
                        <header className="App-header">
                                <img
                                        src={logo}
                                        className="App-logo"
                                        alt="logo"
                                />
                                <p>
                                        Edit <code>src/App.tsx</code> and save
                                        to reload.
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
                </FirebaseAppProvider>
        )
}

export default App
