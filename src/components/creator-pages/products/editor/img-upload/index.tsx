import React, { useState } from 'react'
import { InputGroup, Button, ButtonGroup } from 'reactstrap'
import { CloudinaryContext } from 'cloudinary-react'

import Img from './img'

interface Props {}

const ImgUploader: React.FC<Props> = ({}) => {
        const [numOfImgs, setNumOfImgs] = useState(0)

        const increment = () => setNumOfImgs(numOfImgs + 1)
        const decrement = () => setNumOfImgs(numOfImgs == 0 ? 0 : numOfImgs - 1)

        let ary: number[] = []
        for (let i = 0; i < numOfImgs; i++) {
                ary = [...ary, i]
        }

        return (
                <InputGroup>
                        <div>
                                <h3>Upload images</h3>
                                <ButtonGroup>
                                        <Button onClick={increment}>+</Button>
                                        <Button onClick={decrement}>-</Button>
                                </ButtonGroup>
                        </div>
                        <CloudinaryContext cloudName="dsvdffre0">
                                {ary.map((num) => (
                                        <Img
                                                key={(num + 1234).toString()}
                                                i={num}
                                        />
                                ))}
                        </CloudinaryContext>
                </InputGroup>
        )
}

export default ImgUploader
