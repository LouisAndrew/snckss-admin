import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Select from '..'
import { ListItem } from '../../list'

describe('Select reusable component', () => {
        interface mockItems {
                name: string
        }

        let calledAvailable: mockItems[] = []
        let calledSelected: mockItems[] = []
        const mockAvailable: mockItems[] = [
                {
                        name: '1',
                },
                {
                        name: '2',
                },
                {
                        name: '3',
                },
        ]
        const mockSelected: mockItems[] = [
                {
                        name: '4',
                },
                {
                        name: '5',
                },
        ]
        const mockHeaderText: string = 'Select One'

        const handleChange = jest.fn(
                (event: React.ChangeEvent<HTMLInputElement>) => {
                        const which: string = event.target.value
                        const item: mockItems = mockAvailable.filter(
                                (mck) => mck.name === which
                        )[0]

                        calledAvailable = [...calledAvailable, item]
                }
        )

        // handle remove doesn't need to be tested here bcs handle remove would be
        // passed as the remove function to list component and is already tested
        // separately
        const handleRemove = jest.fn(() => {})

        afterEach(cleanup)
        const el: React.ReactElement = (
                <Select
                        available={mockAvailable}
                        selected={mockSelected}
                        headerText={mockHeaderText}
                        handleChange={handleChange}
                        handleRemove={handleRemove}
                />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('renders the available options correctly', () => {
                const { getByText } = render(el)
                mockAvailable.forEach((item) => {
                        const option: HTMLElement = getByText(item.name)
                        expect(option).toBeInTheDocument()
                })
        })

        it('renders the selected options correctly', () => {
                const { getByText } = render(el)
                mockSelected.forEach((item) => {
                        const option: HTMLElement = getByText(item.name)
                        expect(option).toBeInTheDocument()
                })
        })

        it('should call handleChange everytime the available options is clicked', () => {
                const { getByLabelText } = render(el)
                const option: HTMLElement = getByLabelText(mockHeaderText)
                mockAvailable.forEach((item) => {
                        fireEvent.change(option, {
                                target: { value: item.name },
                        })
                        expect(calledAvailable).toContain(item)
                })
        })

        it('matches snapshot', () => {
                const tree = renderer.create().toJSON()
                expect(tree).toMatchSnapshot()
        })
})
