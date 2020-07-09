import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Name input reusable component', () => {

        // TODO
        afterEach(cleanup)

        it('renders without crashing', () => {

                const div = document.createElement('div')
                ReactDOM.render(, div)
        })

        it('renders correctly', () => {

                const { getByTestId } = render()
        })

        it('matches snapshot', () => {

                const tree = renderer.create().toJSON()
                expect(tree).toMatchSnapshot()
        })

})