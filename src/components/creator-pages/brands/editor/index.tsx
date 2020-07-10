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
                        // // here products given is just an array of strings.
                        // const { name, category, products } = brand
                        // // if category is provided -> filter all of the brands from firestore separate it into two categories where the selected
                        // // is going to be the brands provided by the category from the param.
                        // brands.get().then((docs) => {
                        //         let totalSelected: Brand[] = []
                        //         let totalAvailable: Brand[] = []
                        //         docs.forEach((doc) => {
                        //                 const data: Brand = doc.data() as Brand
                        //                 if (
                        //                         passedBrands.includes(
                        //                                 (data.name as unknown) as Brand
                        //                         )
                        //                 ) {
                        //                         totalSelected = [
                        //                                 ...totalSelected,
                        //                                 data,
                        //                         ]
                        //                 } else {
                        //                         totalAvailable = [
                        //                                 ...totalAvailable,
                        //                                 data,
                        //                         ]
                        //                 }
                        //         })
                        //         setSelected(totalSelected)
                        //         setAvailBrands(totalAvailable)
                        // })
                } else {
                        // fetch all products available here.
                        dispatch({
                                type: Actions.SET_AVAILABLE_PROD,
                                payload: { data: allProducts },
                        })
                        // then fetch all categories.
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
        ) => {}
        const handleRemoveCtg = (key: any) => {}

        console.log(availableProd)

        return !success ? (
                <>
                        <Name
                                headerText="Brand Name"
                                placeholderText="Add brand name here!"
                                name={name}
                                handleChange={handleChangeName}
                        />
                        <Select
                                available={[1, 2, 3]}
                                selected={[]}
                                headerText="Select brand's category"
                                handleChange={handleChangeCtg}
                                handleRemove={handleRemoveCtg}
                                single
                        />
                </>
        ) : (
                <SuccessPage type={Creations.BRAND} create={providedBrand} />
        )
}

export default BrandEditor
