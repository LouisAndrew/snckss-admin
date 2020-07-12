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

interface Props {
        category: Category
        providedCategory: boolean
        // allCategories: Category[]
        allBrands: Brand[]
        goBack: () => void
}

const CategoryEditor: React.FC<Props> = ({
        category,
        providedCategory,
        allBrands,
        // allCategories,
        goBack,
}) => {
        const [name, setName] = useState('')
        const [availBrands, setAvailBrands] = useState<Brand[]>([])
        const [selected, setSelected] = useState<Brand[]>([])
        const [success, setSuccess] = useState(false)

        const categories = useFirestore().collection('categories')
        const brands = useFirestore().collection('brand')

        const handleNameError = useNameError()

        useEffect(() => {
                if (providedCategory) {
                        // here brands given is just an array of strings.
                        const { name, brands: passedBrands } = category
                        setName(name)

                        // if category is provided -> filter all of the brands from firestore separate it into two categories where the selected
                        // is going to be the brands provided by the category from the param.
                        let totalSelected: Brand[] = []
                        let totalAvailable: Brand[] = []
                        allBrands.forEach((brand) => {
                                const { name } = brand
                                if (
                                        passedBrands.includes(
                                                (name as unknown) as Brand
                                        )
                                ) {
                                        totalSelected = [
                                                ...totalSelected,
                                                brand,
                                        ]
                                } else {
                                        totalAvailable = [
                                                ...totalAvailable,
                                                brand,
                                        ]
                                }
                        })

                        setSelected(totalSelected)
                        setAvailBrands(totalAvailable)
                } else {
                        setAvailBrands(allBrands)
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
                        const userSelected: Brand = availBrands.filter(
                                (brd) => brd.name === event.target.value
                        )[0]

                        if (userSelected) {
                                // set selected to it.
                                setSelected([...selected, userSelected])
                                setAvailBrands(
                                        availBrands.filter(
                                                (brd) =>
                                                        brd.name !==
                                                        userSelected.name
                                        )
                                )
                        }
                }
        }

        const handleRemove = (key: ListItem['key']): void => {
                // here key = brand name.
                // exact same function as handle change, but in this case adding the item to available and removing it from selected.
                const toRemove: Brand = selected.filter(
                        (brand) => brand.name === key
                )[0]

                if (toRemove) {
                        setSelected(
                                selected.filter(
                                        (brand) => brand.name !== toRemove.name
                                )
                        )
                        setAvailBrands([...availBrands, toRemove])
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
                const brandRefs: firebase.firestore.DocumentReference<
                        firebase.firestore.DocumentData
                >[] = await selected.map((brand) => brands.doc(brand.name))

                categories.doc(name).set({
                        name,
                        brands: selected.map((brand) => brand.name),
                })

                // update brand's selected category.
                brandRefs.forEach((brand) =>
                        brand.update({
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
                const diff: Brand[] = difference(category.brands, selected)
                if (
                        category.brands.length !== selected.length ||
                        diff.length > 0
                ) {
                        // remove the category from the difference
                        diff.forEach((brand) => {
                                brands.doc(brand.name).update({
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
                                available={availBrands}
                                headerText="Select Brands"
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
