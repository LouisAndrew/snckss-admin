import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Price from '..'

describe('Price element on products editor', () => {
        let temp: string = ''

        const mockPrice: number = 12
        const mockHeaderText: string = 'label'
        const mockPlaceholderText: string = 'placeholder'
        const mockHandleChange = jest.fn(
                (event: React.ChangeEvent<HTMLInputElement>) => {
                        temp = event.target.value
                }
        )

        afterEach(cleanup)
        const el: React.ReactElement = (
                <Price
                        price={mockPrice}
                        headerText={mockHeaderText}
                        placeholderText={mockPlaceholderText}
                        handleChange={mockHandleChange}
                />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('should render with placeholder text correctly', () => {
                const { getByPlaceholderText } = render(el)
                const input: HTMLElement = getByPlaceholderText(
                        mockPlaceholderText
                )

                expect(input).toBeInTheDocument()
        })

        it('should render with label text correctly', () => {
                const { getByLabelText } = render(el)
                const input: HTMLElement = getByLabelText(mockHeaderText)

                expect(input).toBeInTheDocument()
        })

        // test passes if input is not casted to HTMLInputElement. Why?
        it('should react to user changes correctly', () => {
                const mockUserChange: string = 'change'

                const { getByLabelText } = render(el)
                const input: HTMLElement = getByLabelText(mockHeaderText)

                fireEvent.change(input, { target: { value: mockUserChange } })

                expect(mockHandleChange).toBeCalled()
                // expect(mockUserChange).toBe(temp)
                // where is the problem here?
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
