import React, { useState } from 'react'
import { useFirestore } from 'reactfire'
import { Input, Label, InputGroup } from 'reactstrap'
import { Image } from 'cloudinary-react'

interface Props {
        key: string
        i: number
}

const Img: React.FC<Props> = ({ i, key }) => {
        const [imgUrl, setImgUrl] = useState('')

        const allImgsRef = useFirestore().collection('images')

        const id: string = `img-${key}`
        const endPoint: string = `https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const file: FileList | null = event.target.files
                if (file) {
                        const img: File = file[0]
                        // const imgRef = allImgsRef.doc(`img-${img.name}`)
                        // const uploadTask = imgRef.set(img).then(async () => {
                        //         const temp = await imgRef.get()
                        //         if (temp.exists) {
                        //                 const data = await temp.data()
                        //                 console.log(data)
                        //         }
                        // })
                        handleUpload(img)
                }
        }

        // wow tis actually works
        // TODO: delete is not possible, so: PLEASE UPLOAD ACCORDINGLY
        const handleUpload = async (file: File) => {
                let formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', 'u95k3wgx')

                const options = { method: 'POST', body: formData }

                const req = await fetch(endPoint, options)
                const rsp = await req.json().catch((err) => console.log(err))
                const data = rsp
                console.log(data)
        }

        return (
                <InputGroup>
                        <Label for={id}>Upload image</Label>
                        <Input
                                onChange={handleChange}
                                id={id}
                                type="file"
                                name="file"
                                accept="image/*"
                        />
                        <Image />
                </InputGroup>
        )
}

export default Img
