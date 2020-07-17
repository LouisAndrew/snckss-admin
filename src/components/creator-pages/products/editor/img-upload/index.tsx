import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Button, Label } from 'reactstrap'
import { Icon } from '@iconify/react'
import addIcon from '@iconify/icons-mdi/add'

import Img from './img'
import { compareArr } from 'lib/helper'

/**
 * allImgs here: default images passed from the component.
 * this props won't be updated from ImgUploader component.
 * It is merely a default value(s) from the product information which was fetched from fs.
 */
interface Props {
        allImgs?: string[]
        handleChange: (imgUrls: string[]) => void
}

interface ImgUploadComponent {
        componentId: number
        imgUrl: string
}

const ImgUploader: React.FC<Props> = ({ allImgs, handleChange }) => {
        // keys: stores random identifiers for img input component.
        const [components, setComponents] = useState<ImgUploadComponent[]>([])
        // temporary value container: updates everytime the allImgs props update and the update isn't being tracked within the components state.
        const [allImgsTemp, setAllImgsTemp] = useState<string[]>([])

        // overcomes the problem: where imgs won't be loaded on the initial render.
        useEffect(() => {
                if (
                        allImgs &&
                        !allImgs.every((string) => allImgsTemp.includes(string))
                ) {
                        let state: ImgUploadComponent[] = allImgs.map(
                                (img) => ({
                                        componentId: generateRandom(),
                                        imgUrl: img,
                                })
                        )
                        setComponents(state)
                        setAllImgsTemp(allImgs)
                }
        })

        // everytime components state updates -> update the parent's list of url.
        useEffect(() => {
                handleChange(
                        components
                                .filter((component) => component.imgUrl !== '')
                                .map((component) => component.imgUrl)
                )
        }, [components])

        const addImgComponent = (): void => {
                const newComponent: ImgUploadComponent = {
                        componentId: generateRandom(),
                        imgUrl: '',
                }
                setComponents([...components, newComponent])
        }

        const removeImgComponent = (componentId: number): void => {
                removeComponentFromState(componentId)
        }

        const addImgUrl = (imgUrl: string, componentId: number): void => {
                const updatedComponent: ImgUploadComponent = {
                        componentId,
                        imgUrl,
                }

                const index: number = components.findIndex(
                        (component) => component.componentId === componentId
                )

                if (index !== -1) {
                        setComponents([
                                ...components.slice(0, index),
                                updatedComponent,
                                ...components.slice(index + 1),
                        ])
                }
        }

        const removeComponentFromState = (componentId: number) => {
                setComponents(
                        components.filter(
                                (component) =>
                                        component.componentId !== componentId
                        )
                )
        }

        const generateRandom = (): number => {
                // get a random integer from 1 to 100
                const random = () => Math.floor(Math.random() * 100) + 1

                let num: number = random()
                while (components.some((comp) => comp.componentId === num)) {
                        num = random()
                }

                return num
        }

        return (
                <>
                        <div className="adder">
                                <Label>Product images</Label>
                                <Button onClick={addImgComponent} color="dark">
                                        <Icon icon={addIcon} />
                                </Button>
                        </div>
                        {components.map((comp) => (
                                <Img
                                        key={comp.componentId}
                                        componentId={comp.componentId}
                                        addImgUrl={addImgUrl}
                                        // removeImgUrl={removeImgUrl}
                                        removeComponent={removeImgComponent}
                                        provided={comp.imgUrl !== ''}
                                        imgUrl={comp.imgUrl}
                                />
                        ))}
                </>
        )
}

export default ImgUploader
