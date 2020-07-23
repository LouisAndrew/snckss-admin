import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { FirebaseAppProvider } from 'reactfire'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import config from '../../../../../lib/firebase-config'
import Editor from '..'
import { Category } from 'ts/interfaces/category'
import { Brand } from 'ts/interfaces/brand'
import { Product } from 'ts/interfaces/product'
import { initialProduct } from 'components/creator-pages/products'

describe('Editor component inside categories', () => {
        const mockFn = jest.fn(() => {})

        const mockEmptyCategory: Category = {
                name: '',
                products: [],
        }

        const mockAllProducts: Product[] = [
                {
                        ...initialProduct,
                        name: 'Product1',
                },
                {
                        ...initialProduct,
                        name: 'Product2',
                },
        ]

        const mockCategory: Category = {
                name: 'mock',
                products: mockAllProducts,
        }

        afterEach(cleanup)
        const el = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <Editor
                                        goBack={mockFn}
                                        providedCategory={false}
                                        category={mockEmptyCategory}
                                        allBrands={[]}
                                        allProducts={[]}
                                />
                        </Suspense>
                </FirebaseAppProvider>
        )

        const elWithMockCategory = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <Editor
                                        goBack={mockFn}
                                        category={mockCategory}
                                        providedCategory={true}
                                        allBrands={[]}
                                        allProducts={mockAllProducts}
                                />
                        </Suspense>
                </FirebaseAppProvider>
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('renders name when given a certain category correctly', () => {
                const { getByPlaceholderText } = render(elWithMockCategory)

                const input: HTMLInputElement = getByPlaceholderText(
                        'Add category name here!'
                ) as HTMLInputElement

                expect(input.value).toBe(mockCategory.name)
        })

        // TODO: mock firebase get?
        // it('renders selected with given a certain category correctly', () => {
        //         const { getByText } = render(elWithMockCategory)
        //         mockCategory.brands.forEach((brand) => {
        //                 const el: HTMLElement = getByText(brand.name)
        //                 expect(el).toBeInTheDocument()
        //         })
        // })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
