import React, { useEffect, useReducer } from 'react'
import { Button } from 'reactstrap'
import { useFirestore } from 'reactfire'

import { Product } from 'ts/interfaces/product'
import { Brand } from 'ts/interfaces/brand'
import useNameError from 'hooks/useNameError'

import { reducer, initialState, Actions } from './reducer'
import Desc from './desc'
import ImgUploader from './img-upload'
import Availabilty from './availability'
import ArrivingAt from './arriving'
import Variations from './variations'

import Select from 'components/select'
import { initialBrand } from 'components/creator-pages/brands'
import SuccessPage from 'components/success'
import Name from 'components/creator-pages/name'
import { Creations } from 'scene/main/creator'
import Price from './price'
import usePriceError from 'hooks/usePriceError'

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
        const {
                name,
                desc,
                brand,
                imgs,
                available,
                arrivingAt,
                vars,
                price,
                multipleVars,
                timesPurchased,
                success,
        } = state

        const handleNameError = useNameError()
        const handlePriceError = usePriceError()

        const products = useFirestore().collection('product')
        const brands = useFirestore().collection('brand')

        useEffect(() => {
                if (providedProduct) {
                        dispatch({
                                type: Actions.SET_ALL,
                                payload: { ...product },
                        })
                }
        }, [])

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

        const handleChangePrice = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                const newPrice: string = event.target.value
                if (parseInt(newPrice) === 0) {
                        handlePriceError.displayError(false)
                }
                dispatch({
                        type: Actions.SET_PRICE,
                        payload: {
                                price: parseInt(newPrice),
                        },
                })
        }

        const handleChangeBrand = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                const items: Brand[] = allBrands.filter(
                        (brand) => brand.name === event.target.value
                )
                if (items.length > 0) {
                        dispatch({
                                type: Actions.SET_BRAND,
                                payload: {
                                        brand: items[0],
                                },
                        })
                }
        }

        const handleRemoveBrand = () => {
                dispatch({
                        type: Actions.SET_BRAND,
                        payload: {
                                brand: initialBrand,
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

        const handleChangeVars = (vars: Product[]) => {
                dispatch({
                        type: Actions.SET_VARS,
                        payload: {
                                vars,
                        },
                })
        }

        const handleClick = () => {
                if (name === '') {
                        handleNameError.apply()
                        return
                }

                const productRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = products.doc(
                        name
                )
                const brandName: string = brand.name
                const varsNames: string[] =
                        vars.length > 0
                                ? vars.map((variant) => variant.name)
                                : []

                productRef.set({
                        name,
                        desc,
                        brand: brandName,
                        available,
                        arrivingAt,
                        vars: varsNames,
                        images: imgs,
                        multipleVars,
                        timesPurchased,
                        price,
                })
        }

        const updateDuplicates = () => {}

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
                        <Price
                                headerText="Products price"
                                placeholderText="Add product's price here!"
                                price={price}
                                handleChange={handleChangePrice}
                        />
                        <Select
                                available={allBrands}
                                selected={brand === initialBrand ? [] : [brand]}
                                headerText="Product's brand"
                                selectedText="Product Brand"
                                handleChange={handleChangeBrand}
                                handleRemove={handleRemoveBrand}
                                single
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
                                allImgs={imgs}
                                handleChange={handleChangeImgs}
                        />
                        <Variations
                                headerText="Add a product variation"
                                allProducts={allProducts}
                                products={vars}
                                handleChange={handleChangeVars}
                        />
                        <Button
                                className="submit-btn"
                                color="primary"
                                block
                                onClick={handleClick}
                        >
                                Post
                        </Button>
                </>
        ) : (
                <SuccessPage
                        type={Creations.PRODUCT}
                        create={providedProduct}
                />
        )
}

export default ProductEditor
