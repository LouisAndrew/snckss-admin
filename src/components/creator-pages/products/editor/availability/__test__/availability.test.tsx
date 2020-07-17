import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Availabilty from '..'

describe('Availability component on product editor', () => {
        let valueContainer: boolean = true

        const mockHeaderText: string = 'Input'
        const mockIsAvailable: boolean = true
        const mockHandleChange = jest.fn(
                (event: React.ChangeEvent<HTMLInputElement>) => {
                        valueContainer = event.target.checked
                }
        )

        afterEach(cleanup)
        const el: React.ReactElement = (
                <Availabilty
                        isAvailable={mockIsAvailable}
                        headerText={mockHeaderText}
                        handleChange={mockHandleChange}
                />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('should render with label text correctly', () => {
                const { getByLabelText } = render(el)
                const input: HTMLInputElement = getByLabelText(
                        mockHeaderText
                ) as HTMLInputElement

                expect(input).toBeInTheDocument()
        })

        it('should render with default value correctly', () => {
                const { getByLabelText } = render(el)
                const input: HTMLInputElement = getByLabelText(
                        mockHeaderText
                ) as HTMLInputElement

                expect(input.checked).toBe(mockIsAvailable)
        })

        it('should render and react to user input correctly', () => {
                const { getByLabelText } = render(el)
                const input: HTMLInputElement = getByLabelText(
                        mockHeaderText
                ) as HTMLInputElement

                const changeFromUser: boolean = false
                fireEvent.click(input)

                expect(mockHandleChange).toBeCalled()
                expect(valueContainer).toBe(changeFromUser)
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
