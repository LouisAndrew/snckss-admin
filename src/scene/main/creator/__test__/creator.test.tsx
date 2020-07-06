// how to test component with node env?

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Creator from '..'
import { FirebaseAppProvider } from 'reactfire'
import config from '../../../../lib/firebase-config'

describe('Creator element inside main scene', () => {
        beforeEach(() => {
                jest.resetModules()
        })
        afterEach(cleanup)
        const el = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<h1></h1>}>
                                <Creator />
                        </Suspense>
                </FirebaseAppProvider>
        )

        it('env variables matches', () => {
                expect(process.env.REACT_APP_API_KEY).toBeDefined()
        })

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        // TODO: test behavior on state change
        // it('renders correctly', () => {

        //         const { getByTestId } = render()
        // })

        // TODO: how to render when state changes.
        // it('renders editor component when link is clicked', () => {
        //         const { getByText, getByTestId } = render(el)

        //         const categoriesLink: HTMLElement = getByText('Categories')
        //         fireEvent.click(categoriesLink)

        //         const editorEl: HTMLElement = getByTestId('editor')
        //         expect(editorEl).toBeInTheDocument()
        // })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
