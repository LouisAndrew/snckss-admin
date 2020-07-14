import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { FirebaseAppProvider } from 'reactfire'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import config from '../../../../lib/firebase-config'
import Brands from '..'
import { Category } from 'ts/interfaces/category'
import { Brand } from 'ts/interfaces/brand'
import { Product } from 'ts/interfaces/product'

describe('categories element.', () => {
        const mockAllCategories: Category[] = []
        const mockAllBrands: Brand[] = []
        const mockAllProducts: Product[] = []
        const doRerender = jest.fn(() => {})

        afterEach(cleanup)
        const el = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <Brands
                                        allBrands={mockAllBrands}
                                        allCategories={mockAllCategories}
                                        allProducts={mockAllProducts}
                                        doRerender={doRerender}
                                />
                        </Suspense>
                </FirebaseAppProvider>
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        // TODO
        it('renders correctly', () => {})

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
