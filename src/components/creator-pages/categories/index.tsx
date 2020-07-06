import React, { useState, useEffect } from 'react'
import { Input, Label, FormGroup } from 'reactstrap'

import { useFirestore } from 'reactfire'
import { Brand } from '../../../interfaces/brand'
import List, { ListItem } from './list'

interface Props {}

const Name: React.FC<{}> = ({}) => {
        return (
                <FormGroup>
                        <Label for="category-name">Category Name</Label>
                        <Input type="text" id="category-name" />
                </FormGroup>
        )
}

const initialEmpty: Brand[] = []

const Brands: React.FC<{}> = ({}) => {
        const [availBrands, setAvailBrands] = useState(initialEmpty)
        const [selected, setSelected] = useState(initialEmpty)

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
                </>
        )
}

const Editor: React.FC<{}> = ({}) => {
        return (
                <>
                        <Name />
                        <Brands />
                </>
        )
}

const Categories: React.FC<Props> = ({}) => {
        const [isEditing, setIsEditing] = useState(true)

        return (
                <>
                        <h1>Categories</h1>
                        {isEditing && <Editor />}
                </>
        )
}

export default Categories
