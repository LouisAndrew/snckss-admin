import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import arrowBack from '@iconify/icons-mdi/arrow-back'
import { useFirestore } from 'reactfire'

import './styles.scss'
import Editor from './editor'
import List, { ListItem } from '../../list'
import { Category } from '../../../interfaces/category'

const initialCategories: Category[] = []
const initialCategory: Category = {
        name: '',
        brands: [],
}

const Categories: React.FC = () => {
        const [isEditing, setIsEditing] = useState(true)
        const [ctg, setCtg] = useState(initialCategories)
        const [provideCategory, setProvideCategory] = useState(false)
        const [toProvide, setToProvide] = useState(initialCategory)

        const categories = useFirestore().collection('categories')

        useEffect(() => {
                categories.get().then((docs) => {
                        docs.forEach((doc) => {
                                const category = doc.data() as Category
                                setCtg([...ctg, category])
                        })
                })
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

        return (
                <div className="categories">
                        <div className="back" onClick={goBack}>
                                <Icon icon={arrowBack} />
                        </div>
                        <h1>Categories</h1>
                        {isEditing ? (
                                <Editor
                                        goBack={goBack}
                                        category={toProvide}
                                        providedCategory={provideCategory}
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
