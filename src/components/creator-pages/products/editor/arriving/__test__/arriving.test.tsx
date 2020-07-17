import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ArrivingAt from '..'

describe('Date picker component on products editor', () => {
        let valueContainer: string = ''

        // 6 may 2020
        const mockDate: Date = new Date(1588723200000)
        const mockHandleChange = jest.fn(
                (event: React.ChangeEvent<HTMLInputElement>) => {
                        valueContainer = event.target.value
                }
        )
        const mockHeaderText: string = 'mock'

        afterEach(cleanup)
        const el: React.ReactElement = (
                <ArrivingAt
                        date={mockDate}
                        headerText={mockHeaderText}
                        handleChange={mockHandleChange}
                />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('should render with label correctly', () => {
                const { getByLabelText } = render(el)
                const input: HTMLElement = getByLabelText(mockHeaderText)

                expect(input).toBeInTheDocument()
        })

        it('should render with default date correctly', () => {
                const { getByLabelText } = render(el)
                const input: HTMLInputElement = getByLabelText(
                        mockHeaderText
                ) as HTMLInputElement

                // 30 may 2020
                const userInput: string = '2020-05-30'
                fireEvent.change(input, { target: { value: userInput } })

                expect(valueContainer).toBe(userInput)
        })

        it('should react to user changes correctly', () => {
                const { getByLabelText } = render(el)
                const input: HTMLInputElement = getByLabelText(
                        mockHeaderText
                ) as HTMLInputElement

                expect(input).toBeInTheDocument()
        })

        it('matches snapshot', () => {
                const tree = renderer.create().toJSON()
                expect(tree).toMatchSnapshot()
        })
})
