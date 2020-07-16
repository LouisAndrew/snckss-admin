import React, { useState } from 'react'
import { Button, Label } from 'reactstrap'

import Img from './img'

interface Props {}

const ImgUploader: React.FC<Props> = ({}) => {
        // keys: stores random identifiers for img input component.
        const [componentIds, setComponentIds] = useState<number[]>([])
        const [imgUrls, setImgUrls] = useState<string[]>([])

        const addImgComponent = () => {
                setComponentIds([...componentIds, generateRandom()])
        }

        const removeImgComponent = (componentId: number) => {
                setComponentIds(componentIds.filter((id) => id !== componentId))
        }

        const addImgUrl = (imgUrl: string): void => {
                setImgUrls([...imgUrls, imgUrl])
        }

        const removeImgUrl = (imgUrl: string): void => {
                setImgUrls(imgUrls.filter((url) => url !== imgUrl))
        }

        const generateRandom = (): number => {
                // get a random integer from 1 to 100
                const random = () => Math.floor(Math.random() * 100) + 1

                let num: number = random()
                while (componentIds.includes(num)) {
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
                        {componentIds.map((id) => (
                                <Img
                                        key={id}
                                        componentId={id}
                                        addImgUrl={addImgUrl}
                                        removeImgUrl={removeImgUrl}
                                        removeComponent={removeImgComponent}
                                />
                        ))}
                </>
        )
}

export default ImgUploader
