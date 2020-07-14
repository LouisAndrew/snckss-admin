import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Desc from '..'

describe('Description input element', () => {
        let temp: string = ''

        const mockHeaderText: string = 'Mock Header'
        const mockPlaceholderText: string = 'Mock placeholder'
        const mockDesc: string = ''
        const mockHandleChange = jest.fn(
                (event: React.ChangeEvent<HTMLInputElement>) => {
                        temp = event.target.value
                }
        )

        afterEach(cleanup)
        const el: React.ReactElement = (
                <Desc
                        headerText={mockHeaderText}
                        placeholderText={mockPlaceholderText}
                        desc={mockDesc}
                        handleChange={mockHandleChange}
                />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('should render the placeholder text correctly', () => {
                const { queryByPlaceholderText } = render(el)
                const element: HTMLElement | null = queryByPlaceholderText(
                        mockPlaceholderText
                )
                if (element) {
                        expect(element).toBeInTheDocument()
                } else {
                        fail()
                }
        })

        it('should render the label text correctly', () => {
                const { queryByLabelText } = render(el)
                const element: HTMLElement | null = queryByLabelText(
                        mockHeaderText
                )
                if (element) {
                        expect(element).toBeInTheDocument()
                } else {
                        fail()
                }
        })

        it('should respond to the input function correctly', () => {
                const mockUserInput: string = 'user input'

                const { getByLabelText } = render(el)
                const element: HTMLElement = getByLabelText(mockHeaderText)
                fireEvent.change(element, { target: { value: mockUserInput } })

                expect(temp).toBe(mockUserInput)
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
