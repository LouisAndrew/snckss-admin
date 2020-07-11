import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { FirebaseAppProvider } from 'reactfire'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import BrandEditor from '..'

import config from '../../../../../lib/firebase-config'
import { Category, Brand, Product } from '../../../../../interfaces'

describe('Brand editor element', () => {
        const mockSampleCategory: Category = {
                name: 'sample category',
                brands: [],
        }
        const mockAllCategories: Category[] = [mockSampleCategory]
        const mockAllProducts: Product[] = []
        const mockBrand: Brand = {
                name: 'mock',
                products: mockAllProducts,
                category: mockSampleCategory,
        }
        const mockEmptyBrand: Brand = {
                name: '',
                products: [],
                category: {
                        name: '',
                        brands: [],
                },
        }

        const mockGoBack = jest.fn(() => {})

        afterEach(cleanup)
        const el: React.ReactElement = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <BrandEditor
                                        allCategories={mockAllCategories}
                                        allProducts={mockAllProducts}
                                        brand={mockEmptyBrand}
                                        providedBrand={false}
                                        goBack={mockGoBack}
                                />
                        </Suspense>
                </FirebaseAppProvider>
        )
        const elWithBrand: React.ReactElement = (
                <FirebaseAppProvider firebaseConfig={config}>
                        <Suspense fallback={<></>}>
                                <BrandEditor
                                        allCategories={mockAllCategories}
                                        allProducts={mockAllProducts}
                                        brand={mockBrand}
                                        providedBrand={true}
                                        goBack={mockGoBack}
                                />
                        </Suspense>
                </FirebaseAppProvider>
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('should render correctly with default value when no brand is provided', () => {
                const { getByPlaceholderText } = render(el)
                const nameInput: HTMLInputElement = getByPlaceholderText(
                        'Add brand name here!'
                ) as HTMLInputElement
                expect(nameInput.value).toBe('')
        })

        it('should render name input correctly when brand is provided', () => {
                const { getByPlaceholderText } = render(elWithBrand)
                const nameInput: HTMLInputElement = getByPlaceholderText(
                        'Add brand name here!'
                ) as HTMLInputElement
                expect(nameInput.value).toBe(mockBrand.name)
        })

        // TODO: fix this
        // it('should render selected list correctly when brand is provided', () => {
        //         const { getByTestId } = render(elWithBrand)
        //         const listItems: HTMLElement = getByTestId('list-items')
        //         const children: ChildNode[] = Array.from(listItems.childNodes)
        //         mockAllCategories.forEach((ctg, i) => {
        //                 expect(children[i]).toHaveTextContent(ctg.name)
        //         })
        // })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
