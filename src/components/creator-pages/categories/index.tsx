import React, { useState, useEffect } from 'react'
import {
        InputGroup,
        InputGroupAddon,
        Input,
        Label,
        FormGroup,
} from 'reactstrap'

import { useFirestore } from 'reactfire'
import { Brand } from '../../../interfaces/brand'

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

                        // set selected to it.
                        setSelected([...selected, userSelected])
                        setAvailBrands(
                                availBrands.filter(
                                        (brd) => brd.name !== userSelected.name
                                )
                        )
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
                                        {availBrands.map((brd) => (
                                                <option
                                                        key={`option-${brd.name}`}
                                                        value={brd.name}
                                                >
                                                        {brd.name}
                                                </option>
                                        ))}
                                </Input>
                        </FormGroup>
                        <FormGroup>
                                <Label for="selected-brands">
                                        Selected brands
                                </Label>
                                {selected.map((slctd) => (
                                        <React.Fragment>
                                                <label
                                                        htmlFor={`selected-${slctd.name}`}
                                                >
                                                        {slctd.name}
                                                </label>
                                                <input
                                                        type="checkbox"
                                                        id={`selected-${slctd.name}`}
                                                />
                                        </React.Fragment>
                                ))}
                        </FormGroup>
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
