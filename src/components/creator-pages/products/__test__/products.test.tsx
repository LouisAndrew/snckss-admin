import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Products from '..'
import { Product } from 'ts/interfaces/product'
import { Brand } from 'ts/interfaces/brand'
import { FirebaseAppProvider } from 'reactfire'
import config from 'lib/firebase-config'

describe('Product creator component', () => {
        const doRerender = jest.fn(() => {})
        const allProducts: Product[] = []
        const allBrands: Brand[] = []

        afterEach(cleanup)
        const el: React.ReactElement = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <Products
                                        allBrands={allBrands}
                                        allProducts={allProducts}
                                        doRerender={doRerender}
                                />
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

        // it('matches snapshot', () => {

        //         const tree = renderer.create().toJSON()
        //         expect(tree).toMatchSnapshot()
        // })
})
