import React, { useState, useEffect } from 'react'
import { useFirestore } from 'reactfire'

import './styles.scss'
import List, { ListItem } from '../../list'
import { Category } from 'ts/interfaces/category'
import Icons from '../icons'
import CategoryEditor from './editor'
import { Brand } from 'ts/interfaces/brand'
import useSureQuestion from 'hooks/useSureQuestion'
import { Product } from 'ts/interfaces/product'

const initialCategories: Category[] = []
export const initialCategory: Category = {
        name: '',
        // brands: [],
        products: [],
}

interface Props {
        allCategories: Category[]
        allBrands: Brand[]
        allProducts: Product[]
        doRerender: () => void
}

const Categories: React.FC<Props> = ({
        allCategories,
        allBrands,
        allProducts,
        doRerender,
}) => {
        const [isEditing, setIsEditing] = useState(false)
        const [ctg, setCtg] = useState(initialCategories)
        const [provideCategory, setProvideCategory] = useState(false)
        const [toProvide, setToProvide] = useState(initialCategory)

        const categories = useFirestore().collection('categories')
        const products = useFirestore().collection('product')
        const question = useSureQuestion()

        useEffect(() => {
                setCtg(allCategories)
        }, [])

        const createNameDuplicate = (name: string): string => {
                let i = 1
                const names: string[] = ctg.map((category) => category.name)
                while (names.includes(`${name}-${i}`)) {
                        i++
                }

                return `${name}-${i}`
        }

        const handleRemove = (key: any) => {
                const isKeyExists: boolean = allCategories.some(
                        (ctg) => ctg.name === key
                )
                if (isKeyExists) {
                        const categoryRef = categories.doc(key)
                        const toDelete = allCategories.filter(
                                (category) => category.name === key
                        )[0]

                        const deleteCategoryFromProducts = (
                                productName: string
                        ) => {
                                products.doc(productName).update({
                                        category: '',
                                })
                        }

                        const deleteCategory = () => {
                                toDelete.products.forEach((product) => {
                                        const productName = (product as unknown) as string
                                        if (productName) {
                                                deleteCategoryFromProducts(
                                                        productName
                                                )
                                        }
                                })

                                categoryRef.delete().then(() => {
                                        doRerender()
                                })
                        }

                        question.apply(
                                `Are you sure you want to delete ${key}`,
                                'categories-creator',
                                deleteCategory,
                                () => {}
                        )
                }
        }

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

        const handleEdit = (key: ListItem['key']) => {
                if (!isEditing) {
                        const selectedCategory: Category = ctg.filter(
                                (category) => category.name === key
                        )[0]

                        if (selectedCategory) {
                                setIsEditing(true)
                                setProvideCategory(true)
                                setToProvide({
                                        ...selectedCategory,
                                        name: createNameDuplicate(
                                                selectedCategory.name
                                        ),
                                })
                        }
                }
        }

        const goBack = () => {
                if (isEditing) {
                        setIsEditing(false)
                        setProvideCategory(false)
                        setToProvide(initialCategory)
                        doRerender()
                }
        }

        const add = () => {
                if (provideCategory) {
                        setProvideCategory(false)
                }
                setIsEditing(true)
        }

        return (
                <div className="categories-creator creator">
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
                                        allProducts={allProducts}
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
                                        handleEdit={handleEdit}
                                />
                        )}
                </div>
        )
}

export default Categories
