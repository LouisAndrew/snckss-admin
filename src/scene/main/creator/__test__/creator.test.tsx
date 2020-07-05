import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Creator from '..'

describe('Creator element inside main scene', () => {
        afterEach(cleanup)
        const el = <Creator />

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        // TODO: test behavior on state change
        // it('renders correctly', () => {

        //         const { getByTestId } = render()
        // })

        // TODO: how to render when state changes.
        // it('renders editor component when link is clicked', () => {
        //         const { getByText, getByTestId } = render(el)

        //         const categoriesLink: HTMLElement = getByText('Categories')
        //         fireEvent.click(categoriesLink)

        //         const editorEl: HTMLElement = getByTestId('editor')
        //         expect(editorEl).toBeInTheDocument()
        // })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
