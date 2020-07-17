import React, { useState, useEffect } from 'react'
import { Card, Input, Label, InputGroup } from 'reactstrap'
import Icon from '@iconify/react'
import deleteIcon from '@iconify/icons-mdi/delete'

import useSureQuestion from 'hooks/useSureQuestion'

import './styles.scss'

interface Props {
        componentId: number
        provided: boolean
        imgUrl?: string
        addImgUrl: (imgUrl: string, componentId: number) => void
        removeComponent: (componentId: number) => void
}

const Img: React.FC<Props> = ({
        componentId,
        provided,
        imgUrl: providedUrl,
        addImgUrl,
        removeComponent,
}) => {
        const [imgUrl, setImgUrl] = useState('')

        const question = useSureQuestion()

        const id: string = `img-${componentId}`
        const endPoint: string = `https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`

        useEffect(() => {
                if (provided && providedUrl) {
                        setImgUrl(providedUrl)
                }
        }, [])

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const file: FileList | null = event.target.files
                if (file) {
                        const img: File = file[0]
                        handleUpload(img)
                }
        }

        // notice: delete directly from the client-side is not possible, upload image accordingly.
        const handleUpload = async (file: File) => {
                let formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', 'u95k3wgx')

                const options = { method: 'POST', body: formData }

                const req = await fetch(endPoint, options)
                const rsp: Promise<any> = await req
                        .json()
                        .catch((err) => console.log(err))
                handleGetUrl(rsp)
        }

        const handleGetUrl = async (promise: any) => {
                const url: string = await promise.secure_url
                setAndPassUrl(url)
        }

        const setAndPassUrl = (url: string) => {
                setImgUrl(url)
                addImgUrl(url, componentId)
        }

        // this func is going to be called when user confirms to remove the component
        const remove = () => {
                removeComponent(componentId)
        }

        // remove this component from ImgUploader
        const handleRemoveComponent = () => {
                question.apply(
                        `Sure to delete this image?`,
                        `img-upload-${componentId}`,
                        remove,
                        () => {}
                )
        }

        return (
                <Card className={`img-upload img-upload-${componentId}`}>
                        <div
                                className={`delete-img`}
                                onClick={handleRemoveComponent}
                        >
                                <Icon icon={deleteIcon} />
                        </div>
                        <InputGroup>
                                <Label for={id}>Upload image</Label>
                                <Input
                                        onChange={handleChange}
                                        id={id}
                                        type="file"
                                        name="file"
                                        accept="image/*"
                                />
                        </InputGroup>
                        {imgUrl !== '' && <img src={imgUrl} />}
                </Card>
        )
}

export default Img
