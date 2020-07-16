import React, { useState, useEffect, useMemo } from 'react'
import { Card, Input, Label, InputGroup } from 'reactstrap'
import Icon from '@iconify/react'
import deleteIcon from '@iconify/icons-mdi/delete'

import useSureQuestion from 'hooks/useSureQuestion'

import './styles.scss'

interface Props {
        componentId: number
        addImgUrl: (imgUrl: string) => void
        removeImgUrl: (imgUrl: string) => void
        removeComponent: (componentId: number) => void
}

const Img: React.FC<Props> = ({
        componentId,
        addImgUrl,
        removeImgUrl,
        removeComponent,
}) => {
        const [imgUrl, setImgUrl] = useState('')
        const [urlSent, setUrlSent] = useState(false)
        const question = useSureQuestion()

        const id: string = `img-${componentId}`
        const endPoint: string = `https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`

        useEffect(() => {
                if (imgUrl !== '') {
                        addImgUrl(imgUrl)
                        setUrlSent(true)
                }
        }, [imgUrl])

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
                if (!urlSent) {
                        setImgUrl(url) // if url hsn't been send to parent, just send the url.
                } else {
                        resendImgUrl(url) // if not, call resendImgUrl
                }
        }

        // what this function does first removing the url from the parent's list of urls and then replacing it with a new one.
        const resendImgUrl = (url: string): void => {
                removeImgUrl(imgUrl)
                setImgUrl(url)
        }

        const remove = () => {
                if (urlSent) {
                        removeImgUrl(imgUrl)
                }
                removeComponent(componentId)
        }

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
