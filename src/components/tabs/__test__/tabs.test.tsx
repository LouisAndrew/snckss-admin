import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Tabs from '..'

describe('Tabs reusable component', () => {
        afterEach(cleanup)
        const mockFn = jest.fn(() => {})
        const mockText: string = 'Test'
        const mockClassName: string = 'class'

        const el = (
                <Tabs handleClick={mockFn} className={mockClassName}>
                        {mockText}
                </Tabs>
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('renders with function correctly', () => {
                const { getByText } = render(el)
                const link: HTMLElement = getByText(mockText)

                fireEvent.click(link)
                expect(mockFn).toBeCalled()
        })

        it('renders with classname correctly', () => {
                render(el)
                const element: HTMLElement | null = document.querySelector(
                        `.${mockClassName}`
                )

                if (element) {
                        expect(element).toBeInTheDocument()
                } else {
                        fail()
                }
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
