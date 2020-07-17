import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ImgUploader from '..'

describe('img uploader element', () => {
        const mockImgUrls: string[] = [
                'https://res.cloudinary.com/dsvdffre0/image/upload/v1594991459/wzv9c2057bbqh6ht8kwi.jpg',
                'https://res.cloudinary.com/dsvdffre0/image/upload/v1594991470/oyjs4mo3xwksv7w7dvsf.png',
        ]
        afterEach(cleanup)
        const el: React.ReactElement = <ImgUploader />
        const elWithImgs: React.ReactElement = (
                <ImgUploader allImgs={mockImgUrls} />
        )

        it('renders without crashing', () => {
                const div = document.createElement('div')
                ReactDOM.render(el, div)
        })

        it('should render when a button clicked correctly', () => {
                const { getByRole } = render(el)
                const button: HTMLButtonElement = getByRole(
                        'button'
                ) as HTMLButtonElement

                fireEvent.click(button)
                const elements: NodeListOf<Element> = document.querySelectorAll(
                        '.img-upload'
                )
                elements.forEach((el) => {
                        expect(el).toBeInTheDocument()
                })
        })

        it('should render when a button clicked multiple times correctly', () => {
                const { getByRole } = render(el)
                const button: HTMLButtonElement = getByRole(
                        'button'
                ) as HTMLButtonElement

                const timesClicked: number = 4
                for (let i = 0; i < timesClicked; i++) {
                        fireEvent.click(button)
                }

                const elements: NodeListOf<Element> = document.querySelectorAll(
                        '.img-upload'
                )
                expect(elements.length).toBe(timesClicked)
        })

        // TODO: test img elements.
        it('should render correctly when an array of urls is being passed as props', () => {
                const { getAllByRole } = render(elWithImgs)
                const imgs: HTMLImageElement[] = getAllByRole(
                        'img'
                ) as HTMLImageElement[]

                imgs.forEach((img, i) => {
                        expect(img.src).toBe(mockImgUrls[i])
                })
        })

        it('matches snapshot', () => {
                const tree = renderer.create(el).toJSON()
                expect(tree).toMatchSnapshot()
        })
})
