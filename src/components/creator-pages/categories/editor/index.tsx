import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useFirestore } from 'reactfire'

import { Brand } from 'ts/interfaces/brand'
import { ListItem } from '../../../list'
import { Category } from 'ts/interfaces/category'

import './styles.scss'
import SuccessPage from '../../../success'
import { Creations } from '../../../../scene/main/creator'
import Select from '../../../select'
import Name from '../../name'
import { difference } from '../../../../lib/helper'
import useNameError from 'hooks/useNameError'
import { Product } from 'ts/interfaces/product'

interface Props {
        category: Category
        providedCategory: boolean
        // allCategories: Category[]
        allProducts: Product[]
        allBrands: Brand[]
        goBack: () => void
}

const CategoryEditor: React.FC<Props> = ({
        category,
        providedCategory,
        allProducts,
        allBrands,
        // allCategories,
        goBack,
}) => {
        const [name, setName] = useState('')
        const [availProducts, setAvailProducts] = useState<Product[]>([])
        const [selected, setSelected] = useState<Product[]>([])
        const [success, setSuccess] = useState(false)

        const categories = useFirestore().collection('categories')
        const brands = useFirestore().collection('brand')
        const products = useFirestore().collection('product')

        const handleNameError = useNameError()

        useEffect(() => {
                if (providedCategory) {
                        // here brands given is just an array of strings.
                        const { name, products: passedProducts } = category
                        setName(name)

                        // if category is provided -> filter all of the brands from firestore separate it into two categories where the selected
                        // is going to be the brands provided by the category from the param.
                        let totalSelected: Product[] = []
                        let totalAvailable: Product[] = []
                        allProducts.forEach((product) => {
                                const { name } = product
                                if (
                                        passedProducts.includes(
                                                (name as unknown) as Product
                                        )
                                ) {
                                        totalSelected = [
                                                ...totalSelected,
                                                product,
                                        ]
                                } else {
                                        totalAvailable = [
                                                ...totalAvailable,
                                                product,
                                        ]
                                }
                        })

                        setSelected(totalSelected)
                        setAvailProducts(totalAvailable)
                } else {
                        setAvailProducts(allProducts)
                }
        }, [])

        // handle success here
        useEffect(() => {
                if (success) {
                        setTimeout(() => {
                                setSuccess(false)
                                goBack()
                        }, 1000)
                }
        }, [success])

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                if (event) {
                        // get the brand recently selected by user.
                        const userSelected: Product = availProducts.filter(
                                (product) => product.name === event.target.value
                        )[0]

                        if (userSelected) {
                                // set selected to it.
                                setSelected([...selected, userSelected])
                                setAvailProducts(
                                        availProducts.filter(
                                                (product) =>
                                                        product.name !==
                                                        userSelected.name
                                        )
                                )
                        }
                }
        }

        const handleRemove = (key: ListItem['key']): void => {
                // here key = brand name.
                // exact same function as handle change, but in this case adding the item to available and removing it from selected.
                const toRemove: Product = selected.filter(
                        (product) => product.name === key
                )[0]

                if (toRemove) {
                        setSelected(
                                selected.filter(
                                        (product) =>
                                                product.name !== toRemove.name
                                )
                        )
                        setAvailProducts([...availProducts, toRemove])
                }
        }

        const handleChangeInput = (
                event: React.ChangeEvent<HTMLInputElement>
        ): void => {
                setName(event.target.value)
        }

        const handleClick = async () => {
                if (name === '') {
                        handleNameError.apply()
                        return
                }
                // getting all brands name from selected.
                const productRefs: firebase.firestore.DocumentReference<
                        firebase.firestore.DocumentData
                >[] = await selected.map((product) =>
                        products.doc(product.name)
                )

                categories.doc(name).set({
                        name,
                        products: selected.map((brand) => brand.name),
                })

                // update brand's selected category.
                productRefs.forEach((product) =>
                        product.update({
                                category: name,
                        })
                )

                // updating other brands' category (just if needed.)
                if (providedCategory) {
                        checkForUpdate()
                }

                // set succes and go back to list.
                setSuccess(true)
        }

        const checkForUpdate = () => {
                // filter the difference between passed category's brands and actual selected items.
                const diff: Product[] = difference(category.products, selected)
                if (
                        category.products.length !== selected.length ||
                        diff.length > 0
                ) {
                        // remove the category from the difference
                        diff.forEach((product) => {
                                products.doc(product.name).update({
                                        category: '',
                                })
                        })
                }
        }

        return !success ? (
                <>
                        <Name
                                headerText="Category Name"
                                placeholderText="Add category name here!"
                                name={name}
                                handleChange={handleChangeInput}
                        />
                        <Select
                                selected={selected}
                                available={availProducts}
                                headerText="Select Products"
                                handleChange={handleChange}
                                handleRemove={handleRemove}
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
                        type={Creations.CATEGORIES}
                        create={!providedCategory}
                />
        )
}

export default CategoryEditor
