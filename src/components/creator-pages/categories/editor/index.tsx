import React, { useState, useEffect } from 'react'
import { Input, Label, FormGroup, Button } from 'reactstrap'

import { useFirestore } from 'reactfire'

import { Brand } from '../../../../interfaces/brand'
import List, { ListItem } from '../../../list'
import { Category } from '../../../../interfaces/category'

import './styles.scss'

interface NameProps {
        name: string
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Name: React.FC<NameProps> = ({ name, handleChange }) => (
        <FormGroup>
                <Label for="category-name">Category Name</Label>
                <Input
                        type="text"
                        id="category-name"
                        onChange={handleChange}
                        placeholder="Add category name here!"
                        value={name}
                />
        </FormGroup>
)

interface BrandProps {
        availBrands: Brand[]
        selected: Brand[]
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
        handleRemove: (key: ListItem['key']) => void
}

const Brands: React.FC<BrandProps> = ({
        availBrands,
        selected,
        handleChange,
        handleRemove,
}) => {
        return (
                <>
                        <FormGroup>
                                <Label for="select-brands">Select Brands</Label>
                                <Input
                                        type="select"
                                        id="select-brands"
                                        name="select"
                                        onChange={handleChange}
                                        value=""
                                >
                                        <option key="default" value="default">
                                                Select multiple
                                        </option>
                                        {availBrands.map((brand) => (
                                                <option
                                                        key={`option-${brand.name}`}
                                                        value={brand.name}
                                                >
                                                        {brand.name}
                                                </option>
                                        ))}
                                </Input>
                        </FormGroup>
                        {selected.length > 0 && (
                                <List
                                        items={selected.map((brand) => {
                                                const { name } = brand
                                                const item = {
                                                        text: name,
                                                        key: name,
                                                } as ListItem

                                                return item
                                        })}
                                        headerText="Selected Items"
                                        handleRemove={handleRemove}
                                />
                        )}
                </>
        )
}

interface Props {
        category?: Category
        goBack: () => void
}

const initialEmpty: Brand[] = []

const Editor: React.FC<Props> = ({ category, goBack }) => {
        const [name, setName] = useState('')
        const [availBrands, setAvailBrands] = useState(initialEmpty)
        const [selected, setSelected] = useState(initialEmpty)

        const categories = useFirestore().collection('categories')
        const brands = useFirestore().collection('brand')

        useEffect(() => {
                // fetch all brands from firestore
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

                // check if default category is passed.
                getDefault()
        }, [])

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
        }

        const getDefault = () => {
                if (category) {
                        const { name, brands } = category
                        setName(name)
                        setSelected(brands)
                }
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

        return (
                <>
                        <Name name={name} handleChange={handleChangeInput} />
                        <Brands
                                selected={selected}
                                availBrands={availBrands}
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
        )
}

export default Editor
