import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Dashboard from '..'
import { Views } from '../..'

describe('Dashboard component within main scene. used to change tabs ', () => {
        const mockFn = jest.fn((view: Views) => {})

        afterEach(cleanup)

        const el: React.ReactElement = <Dashboard changeView={mockFn} />

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('renders correctly', () => {
                const { getByText } = render(el)
                const tab: HTMLElement = getByText('Create Products')

                fireEvent.click(tab)
                expect(mockFn).toBeCalled()
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
