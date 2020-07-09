import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup } from '@testing-library/react'
import { FirebaseAppProvider } from 'reactfire'
import '@testing-library/jest-dom'

import Editor from '..'
import { Creations } from '../..'
import config from '../../../../../lib/firebase-config'

describe('', () => {
        afterEach(cleanup)
        const elBrands: React.ReactElement = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <Editor nowCreating={Creations.BRAND} />
                        </Suspense>
                </FirebaseAppProvider>
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(elBrands, div)
        })

        it('should render with creationtypes correctly', () => {
                const { getByText } = render(elBrands)
                const el: HTMLElement = getByText('Brands')
                expect(el).toBeInTheDocument()
        })

        it('matches snapshot', () => {
                const tree = renderer.create(elBrands).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
