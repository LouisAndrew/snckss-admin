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

const Brands: React.FC = () => {
        const [isEditing, setIsEditing] = useState(true)
        const [ctg, setCtg] = useState(initialBrands)
        const [provideBrand, setProvideBrand] = useState(false)
        const [toProvide, setToProvide] = useState(initialBrand)

        const categories = useFirestore().collection('categories')

        // fetch all categories from firestore.
        useEffect(() => {
                categories.get().then((docs) => {
                        docs.forEach((doc) => {
                                const category = doc.data() as Brand
                                setCtg([...ctg, category])
                        })
                })
        }, [])

        const handleRemove = () => {}

        const handleClick = (key: ListItem['key']) => {
                if (!isEditing) {
                        const selectedBrand: Brand = ctg.filter(
                                (category) => category.name === key
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
                                        items={ctg.map((category) => {
                                                const { name } = category
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
