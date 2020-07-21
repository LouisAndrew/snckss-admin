import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Variations from '..'
import { Product } from 'ts/interfaces/product'
import { initialProduct } from 'components/creator-pages/products'

// not really much to test here, basically just a select component with some additional handling function
describe('Variation adder on product editor', () => {
        const product1: Product = { ...initialProduct, name: 'mockProduct' }
        let valueContainer: Product[] = []

        const mockHeaderText: string = 'mock'
        const mockAllProducts: Product[] = [product1]
        const mockHandleChange = jest.fn((vars: Product[]) => {
                valueContainer = vars
        })

        afterEach(cleanup)
        const el: React.ReactElement = (
                <Variations
                        products={[]}
                        headerText={mockHeaderText}
                        allProducts={mockAllProducts}
                        handleChange={mockHandleChange}
                />
        )

        const elWithProduct: React.ReactElement = (
                <Variations
                        products={[product1]}
                        headerText={mockHeaderText}
                        allProducts={mockAllProducts}
                        handleChange={mockHandleChange}
                />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('should react to user changes correctly', () => {
                const { getByLabelText } = render(el)
                const input: HTMLInputElement = getByLabelText(
                        mockHeaderText
                ) as HTMLInputElement

                fireEvent.change(input, { target: { value: product1.name } })
                expect(mockHandleChange).toHaveBeenCalled()
                expect(valueContainer).toContain(product1)
        })

        it('should render correctly when given a list of default product', () => {
                const { getAllByText } = render(elWithProduct)
                const selectedListElement: HTMLElement[] = getAllByText(
                        product1.name
                )

                expect(selectedListElement.length).toBe(2)
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
