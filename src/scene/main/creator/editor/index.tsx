import React, { useState, useEffect } from 'react'
import { useFirestore } from 'reactfire'

import { Creations } from '..'
import Categories from '../../../../components/creator-pages/categories'
import Brands from '../../../../components/creator-pages/brands'
import { Brand } from '../../../../interfaces/brand'
import { Category } from '../../../../interfaces/category'
import { Product } from '../../../../interfaces/product'

import './styles.scss'

interface Props {
        nowCreating: Creations
}

const MainEditor: React.FC<Props> = ({ nowCreating }) => {
        const [allCategories, setAllCategories] = useState<Category[]>([])
        const [allBrands, setAllBrands] = useState<Brand[]>([])
        const [allProducts, setAllProducts] = useState<Product[]>([])

        const fs = useFirestore()
        const categoriesRef = fs.collection('categories')
        const brandsRef = fs.collection('brand')
        const productsRef = fs.collection('product')

        useEffect(() => {
                fetchAllCtgs()
                fetchAllBrds()
                fetchAllProds()
        }, [])

        const fetchAllCtgs = () => {
                categoriesRef.get().then((docs) => {
                        let total: Category[] = []
                        docs.forEach((doc) => {
                                const data: Category = doc.data() as Category
                                total = [...total, data]
                        })
                        setAllCategories(total)
                })
        }

        const fetchAllBrds = () => {
                brandsRef.get().then((docs) => {
                        let total: Brand[] = []
                        docs.forEach((doc) => {
                                const data: Brand = doc.data() as Brand
                                total = [...total, data]
                        })
                        setAllBrands(total)
                })
        }

        const fetchAllProds = () => {
                productsRef.get().then((docs) => {
                        let total: Product[] = []
                        docs.forEach((doc) => {
                                const data: Product = doc.data() as Product
                                total = [...total, data]
                        })
                        setAllProducts(total)
                })
        }

        return (
                <>
                        {nowCreating === Creations.CATEGORIES && (
                                <Categories
                                        allCategories={allCategories}
                                        allBrands={allBrands}
                                />
                        )}
                        {nowCreating === Creations.BRAND && (
                                <Brands
                                        allCategories={allCategories}
                                        allBrands={allBrands}
                                        allProducts={allProducts}
                                />
                        )}
                </>
        )
}

export default MainEditor
