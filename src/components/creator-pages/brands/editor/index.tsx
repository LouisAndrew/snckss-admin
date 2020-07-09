import React, { useEffect } from 'react'
import { useFirestore } from 'reactfire'

import { Brand } from '../../../../interfaces/brand'

interface Props {
        providedBrand: boolean
        brand: Brand
        goBack: () => void
}

const Editor: React.FC<Props> = ({}) => {
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

        return <></>
}

export default Editor
