import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import SuccessPage from '..'
import { Creations } from '../../../scene/main/creator'

describe('Succes reusable page.', () => {
        afterEach(cleanup)
        const elProducts: React.ReactElement = (
                <SuccessPage type={Creations.PRODUCT} create={true} />
        )
        const elProductsUpdate: React.ReactElement = (
                <SuccessPage type={Creations.PRODUCT} create={false} />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(elProducts, div)
        })

        it('renders when given a type correctly', () => {
                const { getByTestId } = render(elProducts)
                const h2: HTMLHeadingElement = getByTestId(
                        'success'
                ) as HTMLHeadingElement

                expect(h2).toHaveTextContent('product')
        })

        it('renders when given a type and shows if user created a product correctly', () => {
                const { getByTestId } = render(elProducts)
                const h2: HTMLHeadingElement = getByTestId(
                        'success'
                ) as HTMLHeadingElement

                expect(h2).toHaveTextContent('adding new')
        })

        it('renders when given a type and shows if user updated a product correctly', () => {
                const { getByTestId } = render(elProductsUpdate)
                const h2: HTMLHeadingElement = getByTestId(
                        'success'
                ) as HTMLHeadingElement

                expect(h2).toHaveTextContent('updating existing')
        })

        it('matches snapshot', () => {
                const tree = renderer.create(elProducts).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
