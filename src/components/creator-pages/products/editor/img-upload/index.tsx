import React, { useState } from 'react'
import { Button, Label } from 'reactstrap'

import Img from './img'

interface Props {}

interface ImgUploadComponent {
        componentId: number
        imgUrl: string
}

const ImgUploader: React.FC<Props> = ({}) => {
        // keys: stores random identifiers for img input component.
        const [components, setComponents] = useState<ImgUploadComponent[]>([])

        const addImgComponent = (): void => {
                // setComponentIds([...componentIds, generateRandom()])
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
                        <div className="upload">
                                <Label>Product images</Label>
                                <Button onClick={addImgComponent}>+</Button>
                        </div>
                        {components.map((comp) => (
                                <Img
                                        key={comp.componentId}
                                        componentId={comp.componentId}
                                        addImgUrl={addImgUrl}
                                        // removeImgUrl={removeImgUrl}
                                        removeComponent={removeImgComponent}
                                />
                        ))}
                </>
        )
}

export default ImgUploader
