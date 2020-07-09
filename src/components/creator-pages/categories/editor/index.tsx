import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'

import { useFirestore } from 'reactfire'

import { Brand } from '../../../../interfaces/brand'
import { ListItem } from '../../../list'
import { Category } from '../../../../interfaces/category'

import './styles.scss'
import SuccessPage from '../../../success'
import { Creations } from '../../../../scene/main/creator'
import Select from '../../../select'
import Name from '../../name'

interface Props {
        category: Category
        providedCategory: boolean
        goBack: () => void
}

const initialEmpty: Brand[] = []

const Editor: React.FC<Props> = ({ category, providedCategory, goBack }) => {
        const [name, setName] = useState('')
        const [availBrands, setAvailBrands] = useState(initialEmpty)
        const [selected, setSelected] = useState(initialEmpty)
        const [success, setSuccess] = useState(false)

        const categories = useFirestore().collection('categories')
        const brands = useFirestore().collection('brand')

        useEffect(() => {
                // fetch all brands from firestore
                if (providedCategory) {
                        // here brands given is just an array of strings.
                        const { name, brands: passedBrands } = category
                        setName(name)

                        // if category is provided -> filter all of the brands from firestore separate it into two categories where the selected
                        // is going to be the brands provided by the category from the param.
                        brands.get().then((docs) => {
                                let totalSelected: Brand[] = []
                                let totalAvailable: Brand[] = []
                                docs.forEach((doc) => {
                                        const data: Brand = doc.data() as Brand
                                        if (
                                                passedBrands.includes(
                                                        (data.name as unknown) as Brand
                                                )
                                        ) {
                                                totalSelected = [
                                                        ...totalSelected,
                                                        data,
                                                ]
                                        } else {
                                                totalAvailable = [
                                                        ...totalAvailable,
                                                        data,
                                                ]
                                        }
                                })

                                setSelected(totalSelected)
                                setAvailBrands(totalAvailable)
                        })
                } else {
                        brands.get().then((docs) => {
                                let total: Brand[] = []
                                docs.forEach((doc) => {
                                        // !important here -> casting all data as Brand.
                                        // : Datas from fs should be in the correct format
                                        const data: Brand = doc.data() as Brand
                                        total = [...total, data]
                                })
                                setAvailBrands(total)
                        })
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
                        handleNameError()
                        return
                }
                // getting all brands name from selected.
                const brandRefs: any[] = await selected.map((brand) =>
                        brands.doc(brand.name).get()
                )

                const promise: any[] = await Promise.all(brandRefs)
                const toSubmitBrands: string[] = await promise.map((doc) => {
                        if (doc.exists) {
                                const { name } = doc.data()
                                return name
                        }
                })

                categories.doc(name).set({
                        name,
                        brands: toSubmitBrands,
                })
                // set succes and go back to list.

                setSuccess(true)
        }

        const handleNameError = () => {
                const input: HTMLElement | null = document.getElementById(
                        'category-name'
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

        console.log(category)

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

export default Editor
