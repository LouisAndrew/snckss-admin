import React, { useEffect, useReducer } from 'react'
import { useFirestore } from 'reactfire'

import { Brand } from '../../../../interfaces/brand'
import SuccessPage from '../../../success'
import { Creations } from '../../../../scene/main/creator'
import Name from '../../name'
import Select from '../../../select'
import { reducer } from '../reducer'
import { Category } from '../../../../interfaces/category'
import { Product } from '../../../../interfaces/product'

interface Props {
        providedBrand: boolean
        brand: Brand
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

const BrandEditor: React.FC<Props> = ({ providedBrand, brand, goBack }) => {
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

        //  useEffect(() => {
        //          // fetch all brands from firestore
        //          if (providedCategory) {
        //                  // here brands given is just an array of strings.
        //                  const { name, brands: passedBrands } = category
        //                  setName(name)

        //                  // if category is provided -> filter all of the brands from firestore separate it into two categories where the selected
        //                  // is going to be the brands provided by the category from the param.
        //                  brands.get().then((docs) => {
        //                          let totalSelected: Brand[] = []
        //                          let totalAvailable: Brand[] = []
        //                          docs.forEach((doc) => {
        //                                  const data: Brand = doc.data() as Brand
        //                                  if (
        //                                          passedBrands.includes(
        //                                                  (data.name as unknown) as Brand
        //                                          )
        //                                  ) {
        //                                          totalSelected = [
        //                                                  ...totalSelected,
        //                                                  data,
        //                                          ]
        //                                  } else {
        //                                          totalAvailable = [
        //                                                  ...totalAvailable,
        //                                                  data,
        //                                          ]
        //                                  }
        //                          })

        //                          setSelected(totalSelected)
        //                          setAvailBrands(totalAvailable)
        //                  })
        //          } else {
        //                  brands.get().then((docs) => {
        //                          let total: Brand[] = []
        //                          docs.forEach((doc) => {
        //                                  // !important here -> casting all data as Brand.
        //                                  // : Datas from fs should be in the correct format
        //                                  const data: Brand = doc.data() as Brand
        //                                  total = [...total, data]
        //                          })
        //                          setAvailBrands(total)
        //                  })
        //          }
        //  }, [])

        //  // handle success here
        //  useEffect(() => {
        //          if (success) {
        //                  setTimeout(() => {
        //                          setSuccess(false)
        //                          goBack()
        //                  }, 1000)
        //          }
        //  }, [success])

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value)
        }

        const handleChangeCtg = (
                event: React.ChangeEvent<HTMLInputElement>
        ) => {}
        const handleRemoveCtg = (key: any) => {}

        return !success ? (
                <>
                        <Name
                                headerText="Brand Name"
                                placeholderText="Add brand name here!"
                                name={name}
                                handleChange={handleChange}
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
