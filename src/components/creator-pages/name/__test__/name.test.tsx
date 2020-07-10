import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Name from '..'

describe('Name input reusable component', () => {
        let valueContainer: string = ''

        const mockChangeValue: string = 'change'
        const mockName: string = 'mock name'
        const mockHeaderText: string = 'header'
        const mockPlaceholderText: string = 'placeholder'
        const mockOnChange = jest.fn(
                (event: React.ChangeEvent<HTMLInputElement>) => {
                        valueContainer = event.target.value
                }
        )
        // TODO
        afterEach(cleanup)
        const el: React.ReactElement = (
                <Name
                        name={mockName}
                        headerText={mockHeaderText}
                        placeholderText={mockPlaceholderText}
                        handleChange={mockOnChange}
                />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('should render with header text correctly', () => {
                const { queryByLabelText } = render(el)
                const input: HTMLElement | null = queryByLabelText(
                        mockHeaderText
                )
                expect(input).toBeInTheDocument()
        })

        it('should render with placeholder text correctly', () => {
                const { queryByPlaceholderText } = render(el)
                const input: HTMLElement | null = queryByPlaceholderText(
                        mockPlaceholderText
                )
                expect(input).toBeInTheDocument()
        })

        it('should call onChange function every time user gives an input', () => {
                const { getByPlaceholderText } = render(el)
                const input: HTMLInputElement = getByPlaceholderText(
                        mockPlaceholderText
                ) as HTMLInputElement
                fireEvent.change(input, { target: { value: mockChangeValue } })

                expect(mockOnChange).toBeCalled()
                expect(valueContainer).toBe(mockChangeValue)
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot(el)
        })
})
