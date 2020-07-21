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
import Price from './price'

import Select from 'components/select'
import { initialBrand } from 'components/creator-pages/brands'
import SuccessPage from 'components/success'
import Name from 'components/creator-pages/name'
import { Creations } from 'scene/main/creator'
import usePriceError from 'hooks/usePriceError'
import { difference } from 'lib/helper'

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

        const fs = useFirestore()

        const products = fs.collection('product')
        const brands = fs.collection('brand')

        const arrayUnion = useFirestore.FieldValue.arrayUnion
        const arrayRemove = useFirestore.FieldValue.arrayRemove

        useEffect(() => {
                if (providedProduct) {
                        dispatch({
                                type: Actions.SET_ALL,
                                payload: { ...product, allProducts, allBrands },
                        })
                }
        }, [])

        useEffect(() => {
                if (success) {
                        setTimeout(() => {
                                goBack()
                        }, 1000)
                }
        }, [success])

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
                        imgs,
                        multipleVars,
                        timesPurchased,
                        price,
                })

                if (brandName) {
                        brands.doc(brandName).update({
                                products: arrayUnion(name),
                        })
                }

                if (varsNames.length > 0) {
                        varsNames.forEach((varName) => {
                                products.doc(varName).update({
                                        vars: arrayUnion(name),
                                })
                        })
                }

                if (providedProduct) {
                        checkForUpdate(brandName, varsNames)
                }

                dispatch({
                        type: Actions.SET_SUCCESS,
                        payload: {
                                success: true,
                        },
                })
        }

        // check for the provided product's former informations and update the firestore datas if needed.
        const checkForUpdate = (brandName: string, varsNames: string[]) => {
                const brandIsNotEmpty: boolean =
                        brandName !== '' && brandName !== undefined

                const brandNameBeforeChangeExist: boolean =
                        product.brand.name !== undefined &&
                        product.brand.name !== ''

                // product.vars is an array of string => object from firestore!!
                const varDifference: string[] = difference(
                        product.vars.map(
                                (variant) => (variant as unknown) as string
                        ), // map product.vars and cast it to string to avoid typecheck error
                        varsNames
                )

                const removeFromBrand = (brandName: string) => {
                        brands.doc(brandName).update({
                                products: arrayRemove(name),
                        })
                }

                const removeVariants = (varName: string) => {
                        products.doc(varName).update({
                                vars: arrayRemove(name),
                        })
                }

                // brands.
                if (brandIsNotEmpty) {
                        // remove the product's reference from the product's brand before the change is made.
                        if (
                                brandNameBeforeChangeExist &&
                                product.brand.name !== brandName
                        ) {
                                removeFromBrand(product.brand.name)
                        }
                } else {
                        if (brandNameBeforeChangeExist) {
                                // remove if brand name is not provided in this change but brand name is there before the change.
                                removeFromBrand(product.brand.name)
                        }
                }

                // product variants.
                if (varDifference.length > 0) {
                        console.log(varDifference)
                        varDifference.forEach((variant, i) => {
                                if (variant) {
                                        removeVariants(variant)
                                } else {
                                        console.log(
                                                `variant: ${variant} index: ${i}`
                                        )
                                }
                        })
                }
        }

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
                                selected={brand.name === '' ? [] : [brand]}
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
                                // allProducts={allProducts}
                                products={vars}
                                available={difference(allProducts, vars).filter(
                                        (product) => product.name !== name
                                )}
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
