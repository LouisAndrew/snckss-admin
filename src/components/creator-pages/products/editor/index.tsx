import React, { useEffect, useState, useReducer } from 'react'

import { Product } from 'ts/interfaces/product'
import { Brand } from 'ts/interfaces/brand'
import { reducer, initialState, Actions } from './reducer'
import SuccessPage from 'components/success'
import { Creations } from 'scene/main/creator'
import Name from 'components/creator-pages/name'
import Desc from './desc'
import ImgUploader from './img-upload'
import Availabilty from './availability'
import ArrivingAt from './arriving'
import { time } from 'console'

interface Props {
        providedProduct: boolean
        product: Product
        allBrands: Brand[]
        allProducts: Product[]
        goBack: () => void
}

const ProductEditor: React.FC<Props> = ({
        providedProduct,
        product,
        allBrands,
        allProducts,
        goBack,
}) => {
        const [state, dispatch] = useReducer(reducer, initialState)
        const { name, desc, imgs, available, arrivingAt, success } = state

        const handleChangeName = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                dispatch({
                        type: Actions.SET_NAME,
                        payload: {
                                name: event.target.value,
                        },
                })
        }

        const handleChangeDesc = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                dispatch({
                        type: Actions.SET_DESC,
                        payload: {
                                desc: event.target.value,
                        },
                })
        }

        const handleChangeImgs = (imgUrls: string[]) => {
                dispatch({
                        type: Actions.SET_IMGS,
                        payload: {
                                imgs: imgUrls,
                        },
                })
        }

        const handleChangeAvailable = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                dispatch({
                        type: Actions.SET_AVAILABLE,
                        payload: {
                                available: event.target.checked,
                        },
                })
        }

        const handleChangeDate = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                const timestamp: number = Date.parse(event.target.value)
                dispatch({
                        type: Actions.SET_ARRIVING_AT,
                        payload: {
                                arrivingAt: new Date(timestamp),
                        },
                })
        }

        const imgUrls: string[] = [
                'https://res.cloudinary.com/dsvdffre0/image/upload/v1594991459/wzv9c2057bbqh6ht8kwi.jpg',
                'https://res.cloudinary.com/dsvdffre0/image/upload/v1594991470/oyjs4mo3xwksv7w7dvsf.png',
        ]

        return !success ? (
                <>
                        <Name
                                name={name}
                                placeholderText="Add product's name here!"
                                headerText="Product's name"
                                handleChange={handleChangeName}
                        />
                        <Desc
                                desc={desc}
                                placeholderText="Add product's description here!"
                                headerText="Product's description"
                                handleChange={handleChangeDesc}
                        />
                        {/* using name as simply a string input here */}
                        <Availabilty
                                isAvailable={available}
                                headerText="Is this product available"
                                handleChange={handleChangeAvailable}
                        />
                        <ArrivingAt
                                date={arrivingAt}
                                headerText="Product arriving date"
                                handleChange={handleChangeDate}
                        />
                        {/* Img Uploader should be at the very bottom of the page */}
                        <ImgUploader
                                allImgs={imgUrls}
                                handleChange={handleChangeImgs}
                        />
                </>
        ) : (
                <SuccessPage
                        type={Creations.PRODUCT}
                        create={providedProduct}
                />
        )
}

export default ProductEditor
