import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import NonePage from '..'

describe('None component.', () => {
        afterEach(cleanup)
        const el: React.ReactElement = <NonePage />

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        // it('renders correctly', () => {

        //         const { getByTestId } = render()
        // })

        // it('matches snapshot', () => {

        //         const tree = renderer.create().toJSON()
        //         expect(tree).toMatchSnapshot()
        // })
})
