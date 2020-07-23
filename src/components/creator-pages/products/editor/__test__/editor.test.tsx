import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductEditor from '..'
import { Product } from 'ts/interfaces/product'
import { Brand } from 'ts/interfaces/brand'
import { initialProduct } from '../..'
import { FirebaseAppProvider } from 'reactfire'
import config from 'lib/firebase-config'
import { Category } from 'ts/interfaces/category'

describe('Product editor component', () => {
        const allProducts: Product[] = []
        const alLBrands: Brand[] = []
        const allCategories: Category[] = []
        const providedProduct: boolean = false
        const product: Product = initialProduct
        const goBack = jest.fn(() => {})

        const productWithName: Product = { ...product, name: 'Product Name1' }

        afterEach(cleanup)
        const el: React.ReactElement = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <ProductEditor
                                        allBrands={alLBrands}
                                        allProducts={allProducts}
                                        allCategories={allCategories}
                                        providedProduct={providedProduct}
                                        product={product}
                                        goBack={goBack}
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
