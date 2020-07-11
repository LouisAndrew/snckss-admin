import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { FirebaseAppProvider } from 'reactfire'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import Main from '..'
import config from '../../../lib/firebase-config'

describe('Main component', () => {
        afterEach(cleanup)
        const el: React.ReactElement = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <Main />
                        </Suspense>
                </FirebaseAppProvider>
        )
        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
