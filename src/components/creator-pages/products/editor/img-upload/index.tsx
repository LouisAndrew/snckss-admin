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
        const [componentIds, setComponentIds] = useState<number[]>([])
        const [imgUrls, setImgUrls] = useState<string[]>([])
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
                // const component: ImgUploadComponent | null = getAndRemoveComponent(
                //         componentId
                // )

                // console.log(component, 'component')
                // console.log(components, 'components')
                // if (component) {
                //         component.imgUrl = imgUrl
                //         setComponents([...components, component])
                // }
                const updatedComponent: ImgUploadComponent = {
                        componentId,
                        imgUrl,
                }

                const index: number = components.findIndex(
                        (component) => component.componentId === componentId
                )

                // TODO: assign object set state
        }

        // const removeImgUrl = (componentId: number): void => {
        //         const component: ImgUploadComponent | null = getAndRemoveComponent(
        //                 componentId
        //         )
        //         if (component) {
        //                 component.imgUrl = ''
        //                 setComponents([...components, component])
        //         }
        // }

        const getAndRemoveComponent = (
                componentId: number
        ): ImgUploadComponent | null => {
                const arrOfComps = components.filter(
                        (component) => component.componentId === componentId
                )
                if (arrOfComps.length > 0) {
                        removeComponentFromState(componentId)
                        return arrOfComps[0]
                } else return null
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

        console.log(components)

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
