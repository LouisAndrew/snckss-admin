import React, { useState, useEffect } from 'react'
import { useFirestore } from 'reactfire'

import './styles.scss'
import List, { ListItem } from '../../list'
import { Category } from 'ts/interfaces/category'
import Icons from '../icons'
import CategoryEditor from './editor'
import { Brand } from 'ts/interfaces/brand'

const initialCategories: Category[] = []
const initialCategory: Category = {
        name: '',
        brands: [],
}

interface Props {
        allCategories: Category[]
        allBrands: Brand[]
}

const Categories: React.FC<Props> = ({ allCategories, allBrands }) => {
        const [isEditing, setIsEditing] = useState(false)
        const [ctg, setCtg] = useState(initialCategories)
        const [provideCategory, setProvideCategory] = useState(false)
        const [toProvide, setToProvide] = useState(initialCategory)

        useEffect(() => {
                setCtg(allCategories)
        }, [])

        const handleRemove = () => {}

        const handleClick = (key: ListItem['key']) => {
                if (!isEditing) {
                        const selectedCategory: Category = ctg.filter(
                                (category) => category.name === key
                        )[0]
                        if (selectedCategory) {
                                setIsEditing(true)
                                setProvideCategory(true)
                                setToProvide(selectedCategory)
                        }
                }
        }

        const goBack = () => {
                if (isEditing) {
                        setIsEditing(false)
                        setProvideCategory(false)
                        setToProvide(initialCategory)
                }
        }

        const add = () => {
                if (provideCategory) {
                        setProvideCategory(false)
                }
                setIsEditing(true)
        }

        return (
                <div className="categories">
                        <Icons
                                goBack={goBack}
                                add={add}
                                displayAdd={!isEditing}
                        />
                        <h1>Categories</h1>
                        {isEditing ? (
                                <CategoryEditor
                                        goBack={goBack}
                                        category={toProvide}
                                        providedCategory={provideCategory}
                                        // allCategories={allCategories}
                                        allBrands={allBrands}
                                />
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

export default Categories
