import React, { useEffect, useReducer } from 'react'
import { useFirestore } from 'reactfire'
import { Button } from 'reactstrap'

import { Brand } from '../../../../interfaces/brand'
import SuccessPage from '../../../success'
import { Creations } from '../../../../scene/main/creator'
import Name from '../../name'
import Select from '../../../select'
import { reducer, Actions } from './reducer'
import { Category } from '../../../../interfaces/category'
import { Product } from '../../../../interfaces/product'

interface Props {
        providedBrand: boolean
        brand: Brand
        allCategories: Category[]
        allProducts: Product[]
        goBack: () => void
}

export interface State {
        name: string
        availableCtg: Category[]
        selectedCtg: Category[]
        availableProd: Product[]
        selectedProd: Product[]
        success: boolean
}

const initialEmptyProd: Product[] = []
const initialEmptyCtg: Category[] = []
const initialState: State = {
        name: '',
        availableCtg: initialEmptyCtg,
        selectedCtg: initialEmptyCtg,
        availableProd: initialEmptyProd,
        selectedProd: initialEmptyProd,
        success: false,
}

const BrandEditor: React.FC<Props> = ({
        providedBrand,
        brand,
        allCategories,
        allProducts,
        goBack,
}) => {
        const [state, dispatch] = useReducer(reducer, initialState)
        const {
                name,
                availableCtg,
                selectedCtg,
                availableProd,
                selectedProd,
                success,
        } = state

        const brands = useFirestore().collection('brand')
        const products = useFirestore().collection('product')
        const categories = useFirestore().collection('categories')
        const FieldValue = useFirestore.FieldValue

        useEffect(() => {
                // fetch all brands from firestore
                if (providedBrand) {
                        const {
                                name,
                                products: passedProducts,
                                category,
                        } = brand
                        dispatch({
                                type: Actions.SET_NAME,
                                payload: {
                                        name,
                                },
                        })

                        if (passedProducts) {
                                let totalSelectedProd: Product[] = []
                                let totalAvailableProd: Product[] = []

                                allProducts.forEach((prd) => {
                                        const { name } = prd
                                        if (
                                                passedProducts.includes(
                                                        (name as unknown) as Product
                                                )
                                        ) {
                                                totalSelectedProd = [
                                                        ...totalSelectedProd,
                                                        prd,
                                                ]
                                        } else {
                                                totalAvailableProd = [
                                                        ...totalAvailableProd,
                                                        prd,
                                                ]
                                        }
                                })

                                dispatch({
                                        type: Actions.SET_PROD,
                                        payload: {
                                                availableProd: totalAvailableProd,
                                                selectedProd: totalSelectedProd,
                                        },
                                })
                        } else {
                                dispatch({
                                        type: Actions.SET_PROD,
                                        payload: {
                                                selectedProd: [],
                                                availableProd: allProducts,
                                        },
                                })
                        }

                        if (category) {
                                dispatch({
                                        type: Actions.SET_CTG,
                                        payload: {
                                                availableCtg: allCategories.filter(
                                                        (ctg) =>
                                                                ctg.name !==
                                                                category.name
                                                ),
                                                selectedCtg: [category],
                                        },
                                })
                        } else {
                                dispatch({
                                        type: Actions.SET_CTG,
                                        payload: {
                                                selectedCtg: [],
                                                availableCtg: allCategories,
                                        },
                                })
                        }
                } else {
                        // assign all categories to available
                        dispatch({
                                type: Actions.SET_CTG,
                                payload: {
                                        selectedCtg: [],
                                        availableCtg: allCategories,
                                },
                        })
                        // assign all products to available
                        dispatch({
                                type: Actions.SET_PROD,
                                payload: {
                                        selectedProd: [],
                                        availableProd: allProducts,
                                },
                        })
                }
        }, [])

        // handle success here
        useEffect(() => {
                if (success) {
                        setTimeout(() => {
                                dispatch({
                                        type: Actions.SET_SUCCESS,
                                        payload: {
                                                success: false,
                                        },
                                })
                                goBack()
                        }, 1000)
                }
        }, [success])

        const handleChangeName = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                dispatch({
                        type: Actions.SET_NAME,
                        payload: { name: event.target.value },
                })
        }

        const handleChangeCtg = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                const userSelected: Category = availableCtg.filter(
                        (ctg) => ctg.name === event.target.value
                )[0]

                if (userSelected) {
                        dispatch({
                                type: Actions.SET_CTG,
                                payload: {
                                        availableCtg: availableCtg.filter(
                                                (ctg) =>
                                                        ctg.name !==
                                                        userSelected.name
                                        ),
                                        selectedCtg: [
                                                ...selectedCtg,
                                                userSelected,
                                        ],
                                },
                        })
                }
        }
        const handleRemoveCtg = (key: any) => {
                if (selectedCtg.every((ctg) => ctg.name === key)) {
                        dispatch({
                                type: Actions.SET_CTG,
                                payload: {
                                        availableCtg: availableCtg.includes(
                                                selectedCtg[0]
                                        )
                                                ? availableCtg
                                                : [
                                                          ...availableCtg,
                                                          selectedCtg[0],
                                                  ],
                                        selectedCtg: [],
                                },
                        })
                }
        }

        const handleChangeProd = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {
                const userSelected: Product = availableProd.filter(
                        (ctg) => ctg.name === event.target.value
                )[0]

                if (userSelected) {
                        dispatch({
                                type: Actions.SET_PROD,
                                payload: {
                                        availableProd: availableProd.filter(
                                                (prod) =>
                                                        prod.name !==
                                                        userSelected.name
                                        ),
                                        selectedProd: [
                                                ...selectedProd,
                                                userSelected,
                                        ],
                                },
                        })
                }
        }
        const handleRemoveProd = (key: any) => {
                const toRemove: Product = selectedProd.filter(
                        (prd) => prd.name === key
                )[0]

                if (toRemove) {
                        dispatch({
                                type: Actions.SET_PROD,
                                payload: {
                                        availableProd: availableProd.includes(
                                                toRemove
                                        )
                                                ? availableProd
                                                : [...availableProd, toRemove],
                                        selectedProd: selectedProd.filter(
                                                (prd) =>
                                                        prd.name !==
                                                        toRemove.name
                                        ),
                                },
                        })
                }
        }

        const handleNameError = () => {
                const input: HTMLElement | null = document.getElementById(
                        'name'
                )
                if (input) {
                        input.style.borderColor = 'red'
                        const errorMsg: HTMLHeadingElement = document.createElement(
                                'h5'
                        )
                        errorMsg.innerText = 'Category name should not be empty'
                        errorMsg.className = 'name-error'

                        input.parentElement?.appendChild(errorMsg)
                }
        }

        const handleClick = async () => {
                if (name === '') {
                        handleNameError()
                        return
                }

                const { name: categoryName } = selectedCtg[0]
                const productNames: string[] = selectedProd.map(
                        (prd) => prd.name
                )

                const categoryRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = await categories.doc(
                        categoryName
                )
                const productRefs: firebase.firestore.DocumentReference<
                        firebase.firestore.DocumentData
                >[] = await productNames.map((prod) => products.doc(prod))

                brands.doc(name).set({
                        name,
                        category: categoryName,
                        products: productNames,
                })

                categoryRef.update({
                        brands: FieldValue.arrayUnion(categoryName),
                })

                productRefs.forEach((product) => {
                        product.update({
                                brand: name,
                        })
                })

                // TODO: check if category/brands is being updated
                if (providedBrand) {
                        checkForUpdate()
                }
                // const
                // TODO: handle update to firebase
                dispatch({
                        type: Actions.SET_SUCCESS,
                        payload: {
                                success: true,
                        },
                })
        }

        /**
         * updates data in firestore if any changes needed to be updated
         */
        const checkForUpdate = () => {
                if (brand.category.name !== selectedCtg[0].name) {
                        categories.doc(brand.category.name).update({
                                brands: FieldValue.arrayRemove(name),
                        })
                }

                // check for product update here?
        }

        return !success ? (
                <>
                        <Name
                                headerText="Brand Name"
                                placeholderText="Add brand name here!"
                                name={name}
                                handleChange={handleChangeName}
                        />
                        <Select
                                available={availableCtg}
                                selected={selectedCtg}
                                headerText="Select brand's category"
                                selectedText="Category"
                                handleChange={handleChangeCtg}
                                handleRemove={handleRemoveCtg}
                                single
                        />
                        <Select
                                available={availableProd}
                                selected={selectedProd}
                                headerText="Select prodcuts"
                                handleChange={handleChangeProd}
                                handleRemove={handleRemoveProd}
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
                <SuccessPage type={Creations.BRAND} create={providedBrand} />
        )
}

export default BrandEditor
