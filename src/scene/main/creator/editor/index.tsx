import React, { useState, useEffect } from 'react'
import { useFirestore } from 'reactfire'

import { Creations } from '..'
import Categories from '../../../../components/creator-pages/categories'
import Brands from '../../../../components/creator-pages/brands'
import { Category } from 'ts/interfaces/category'
import { Brand } from 'ts/interfaces/brand'
import { Product } from 'ts/interfaces/product'

import './styles.scss'
import Products from 'components/creator-pages/products'

interface Props {
        nowCreating: Creations
}

// TODO: fetch new data everytime success is called
const MainEditor: React.FC<Props> = ({ nowCreating }) => {
        const [allCategories, setAllCategories] = useState<Category[]>([])
        const [allBrands, setAllBrands] = useState<Brand[]>([])
        const [allProducts, setAllProducts] = useState<Product[]>([])
        const [rerender, setRerender] = useState(false)

        const fs = useFirestore()
        const categoriesRef = fs.collection('categories')
        const brandsRef = fs.collection('brand')
        const productsRef = fs.collection('product')

        useEffect(() => {
                fetchAllCtgs()
                fetchAllBrds()
                fetchAllProds()
        }, [])

        useEffect(() => {
                if (rerender) {
                        setRerender(false)
                }
        }, [rerender])

        const fetchAllCtgs = () => {
                categoriesRef.onSnapshot((docs) => {
                        let total: Category[] = []
                        docs.forEach((doc) => {
                                const data: Category = doc.data() as Category
                                total = [...total, data]
                        })
                        setAllCategories(total)
                })
        }

        const fetchAllBrds = () => {
                brandsRef.onSnapshot((docs) => {
                        let total: Brand[] = []
                        docs.forEach((doc) => {
                                const data: Brand = doc.data() as Brand
                                total = [...total, data]
                        })
                        setAllBrands(total)
                })
        }

        const fetchAllProds = () => {
                productsRef.onSnapshot((docs) => {
                        let total: Product[] = []
                        docs.forEach((doc) => {
                                const data: Product = doc.data() as Product
                                total = [...total, data]
                        })
                        setAllProducts(total)
                })
        }

        const doRerender = () => {
                setRerender(true)
        }

        return (
                <>
                        {!rerender && nowCreating === Creations.CATEGORIES && (
                                <Categories
                                        allCategories={allCategories}
                                        allBrands={allBrands}
                                        doRerender={doRerender}
                                        allProducts={allProducts}
                                />
                        )}
                        {!rerender && nowCreating === Creations.BRAND && (
                                <Brands
                                        allBrands={allBrands}
                                        allProducts={allProducts}
                                        doRerender={doRerender}
                                />
                        )}
                        {!rerender && nowCreating === Creations.PRODUCT && (
                                <Products
                                        allCategories={allCategories}
                                        allBrands={allBrands}
                                        allProducts={allProducts}
                                        doRerender={doRerender}
                                />
                        )}
                </>
        )
}

export default MainEditor
