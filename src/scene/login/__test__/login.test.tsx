import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { FirebaseAppProvider } from 'reactfire'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import config from '../../../lib/firebase-config'
import Login from '..'

// TODO: how to test login auth?
describe('Login component', () => {
        afterEach(cleanup)
        const el: React.ReactElement = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <Login />
                        </Suspense>
                </FirebaseAppProvider>
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        // it('renders correctly', () => {

        //         const { getByTestId } = render()
        // })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
