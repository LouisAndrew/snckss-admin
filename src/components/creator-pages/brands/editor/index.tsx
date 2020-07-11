import React, { useEffect, useReducer } from 'react'
import { useFirestore } from 'reactfire'

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

        //  // handle success here
        //  useEffect(() => {
        //          if (success) {
        //                  setTimeout(() => {
        //                          setSuccess(false)
        //                          goBack()
        //                  }, 1000)
        //          }
        //  }, [success])

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
                        // const index: number = availableCtg.indexOf(userSelected)
                        // const secondArrayStart: number =
                        //         index !== availableCtg.length - 1
                        //                 ? index + 1
                        //                 : availableCtg.length - 1
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
        const handleRemoveProd = (key: any) => {}

        console.log(selectedProd)

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
                </>
        ) : (
                <SuccessPage type={Creations.BRAND} create={providedBrand} />
        )
}

export default BrandEditor
