import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import List, { ListItem } from '..'

describe('List reusable Component', () => {
        let concatenated: ListItem['key'] = []

        const mockHandleRemove = jest.fn((key: ListItem['key']) => {
                concatenated = [...concatenated, key]
        })

        const mockHandleClick = jest.fn((key: ListItem['key']) => {
                concatenated = [...concatenated, key]
        })

        const mockItems: ListItem[] = [
                {
                        text: 'item1',
                        key: 'item1',
                },
                {
                        text: 'item2',
                        key: 'item2',
                },
        ]

        const mockHeader: string = 'Mock Header'

        afterEach(cleanup)
        const el: React.ReactElement = (
                <List
                        items={mockItems}
                        headerText={mockHeader}
                        handleRemove={mockHandleRemove}
                        handleClick={mockHandleClick}
                />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('renders with children correctly', () => {
                const { getByText } = render(el)

                // iterate over mockItems to make sure it exists within the document
                mockItems.forEach((item) => {
                        const listItem: HTMLElement = getByText(item.text)
                        expect(listItem).toBeInTheDocument()
                })
        })

        it('renders and respond to user clicking the event correctly when clicked.', () => {
                const { getByText } = render(el)

                mockItems.forEach((item) => {
                        const el: HTMLElement = getByText(item.text)
                        fireEvent.click(el)

                        expect(concatenated).toContain(item.key)
                })
        })

        it('renders and removes the item correctly when an item is clicked', () => {
                const { getAllByTestId } = render(el)
                const listItem: HTMLElement[] = getAllByTestId('list-items')

                mockItems.forEach((item, index) => {
                        const deleteSpan: HTMLElement | null = document.querySelector(
                                `.${listItem[index].className
                                        .split(' ')
                                        .join('.')} .del-${item.text}`
                        )

                        if (deleteSpan) {
                                fireEvent.click(deleteSpan)
                                expect(concatenated).toContain(item.key)
                        } else {
                                fail()
                        }
                })
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
