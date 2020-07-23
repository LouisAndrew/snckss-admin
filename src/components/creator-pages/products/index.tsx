import React, { useState, useEffect } from 'react'
import { useFirestore } from 'reactfire'

import { Brand } from 'ts/interfaces/brand'
import { Product } from 'ts/interfaces/product'
import List, { ListItem } from 'components/list'
import Icons from '../icons'
import ProductEditor from './editor'
import useSureQuestion from 'hooks/useSureQuestion'
import { Category } from 'ts/interfaces/category'
import { initialCategory } from '../categories'

export const initialProduct: Product = {
        name: '',
        desc: '',
        PID: '',
        price: 0,
        imgs: [],
        available: false,
        arrivingAt: new Date(),
        timesPurchased: 0,
        multipleVars: false,
        vars: [],
        brand: ('' as unknown) as Brand,
        toFullfil: 0,
        purchaseLimit: 0,
        category: ('' as unknown) as Category,
        weight: 0,
}

interface TimestampObjectFirestore {
        seconds: number
        miliseconds: number
}

interface Props {
        allBrands: Brand[]
        allProducts: Product[]
        allCategories: Category[]
        doRerender: () => void
}

const Products: React.FC<Props> = ({
        allBrands,
        allProducts,
        allCategories,
        doRerender,
}) => {
        const [isEditing, setIsEditing] = useState(false)
        const [prd, setPrd] = useState<Product[]>([])
        const [provideProduct, setProvideProduct] = useState(false)
        const [toProvide, setToProvide] = useState<Product>(initialProduct)

        const products = useFirestore().collection('product')
        const brands = useFirestore().collection('brand')
        const categories = useFirestore().collection('categories')
        const arrayRemove = useFirestore.FieldValue.arrayRemove

        const question = useSureQuestion()

        useEffect(() => {
                setPrd(allProducts)
        }, [])

        const handleRemove = (key: any) => {
                const isKeyExists: boolean = allProducts.some(
                        (product) => product.name === key
                )

                if (isKeyExists) {
                        const productRef = products.doc(key)

                        const toDeleteProduct: Product = allProducts.filter(
                                (product) => product.name === key
                        )[0]

                        const removeVariantRefs = (productName: string) => {
                                products.doc(productName).update({
                                        vars: arrayRemove(key),
                                })
                        }

                        const removeBrandRef = (brandName: string) => {
                                brands.doc(brandName).update({
                                        products: arrayRemove(key),
                                })
                        }

                        const removeCategoryRef = (categoryName: string) => {
                                categories.doc(categoryName).update({
                                        products: arrayRemove(key),
                                })
                        }

                        const deleteProduct = () => {
                                toDeleteProduct.vars.forEach((variant) => {
                                        const variantName = (variant as unknown) as string
                                        if (variantName) {
                                                removeVariantRefs(variantName)
                                        }
                                })

                                const brandName = (toDeleteProduct.brand as unknown) as string
                                const categoryName = (toDeleteProduct.category as unknown) as string

                                if (brandName) {
                                        removeBrandRef(brandName)
                                }

                                if (categoryName) {
                                        removeCategoryRef(categoryName)
                                }

                                productRef.delete().then(() => {
                                        doRerender()
                                })
                        }

                        question.apply(
                                `Are you sure you want to delete ${key}?`,
                                'products-creator',
                                deleteProduct,
                                () => {}
                        )
                }
        }

        const handleClick = (key: ListItem['key']) => {
                if (!isEditing) {
                        const selectedProduct: Product = prd.filter(
                                (product) => product.name === key
                        )[0]
                        if (selectedProduct) {
                                setIsEditing(true)
                                setProvideProduct(true)
                                setToProvide({
                                        ...selectedProduct,
                                        arrivingAt: new Date(
                                                ((selectedProduct.arrivingAt as unknown) as TimestampObjectFirestore)
                                                        .seconds * 1000
                                        ),
                                })
                        }
                }
        }

        const goBack = () => {
                if (isEditing) {
                        setIsEditing(false)
                        setProvideProduct(false)
                        setToProvide(initialProduct)
                        doRerender()
                }
        }

        const add = () => {
                if (provideProduct) {
                        setProvideProduct(false)
                        setToProvide(initialProduct)
                }
                setIsEditing(true)
        }

        return (
                <div className="products-creator creator">
                        <Icons
                                goBack={goBack}
                                add={add}
                                displayAdd={!isEditing}
                        />
                        <h1>Products</h1>
                        {isEditing ? (
                                <ProductEditor
                                        providedProduct={true}
                                        product={toProvide}
                                        allBrands={allBrands}
                                        allProducts={allProducts}
                                        allCategories={allCategories}
                                        goBack={goBack}
                                />
                        ) : (
                                <List
                                        headerText=""
                                        items={prd.map((product) => {
                                                const { name } = product
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

export default Products
