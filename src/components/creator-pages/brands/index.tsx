import React, { useState, useEffect } from 'react'
import { useFirestore } from 'reactfire'

import { Brand } from '../../../interfaces/brand'
import List, { ListItem } from '../../list'
import Icons from '../icons'
import './styles.scss'

const initialBrands: Brand[] = []
const initialBrand: Brand = {
        name: '',
        products: [],
}

/**
 * Almost the same structure as Categoties. Do I need to combine them just as one reusable component?
 * but if yes -> It's going to be a lot of if statements inside on component....
 */
const Brands: React.FC = () => {
        const [isEditing, setIsEditing] = useState(true)
        const [brd, setBrd] = useState(initialBrands)
        const [provideBrand, setProvideBrand] = useState(false)
        const [toProvide, setToProvide] = useState(initialBrand)

        const brands = useFirestore().collection('brand')

        // fetch all categories from firestore.
        useEffect(() => {
                brands.get().then((docs) => {
                        docs.forEach((doc) => {
                                const category = doc.data() as Brand
                                setBrd([...brd, category])
                        })
                })
        }, [])

        const handleRemove = () => {}

        const handleClick = (key: ListItem['key']) => {
                if (!isEditing) {
                        const selectedBrand: Brand = brd.filter(
                                (brand) => brand.name === key
                        )[0]
                        if (selectedBrand) {
                                setIsEditing(true)
                                setProvideBrand(true)
                                setToProvide(selectedBrand)
                        }
                }
        }

        const goBack = () => {
                if (isEditing) {
                        setIsEditing(false)
                        setProvideBrand(false)
                        setToProvide(initialBrand)
                }
        }

        const add = () => {
                if (provideBrand) {
                        setProvideBrand(false)
                }
                setIsEditing(true)
        }

        return (
                <div className="brands">
                        <Icons
                                goBack={goBack}
                                add={add}
                                displayAdd={!isEditing}
                        />
                        <h1>Brands</h1>
                        {isEditing ? (
                                <h1>Brand editor here!</h1>
                        ) : (
                                <List
                                        headerText=""
                                        items={brd.map((brand) => {
                                                const { name } = brand
                                                const list: ListItem = {
                                                        text: name,
                                                        key: name,
                                                }
                                                return list
                                        })}
                                        handleRemove={handleRemove}
                                        handleClick={handleClick}
                                />
                        )}
                </div>
        )
}

export default Brands
