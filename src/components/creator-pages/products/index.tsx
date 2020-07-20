import React, { useState, useEffect } from 'react'

import { Brand } from 'ts/interfaces/brand'
import { Product } from 'ts/interfaces/product'
import { initialBrand } from '../brands'
import List, { ListItem } from 'components/list'
import Icons from '../icons'
import ProductEditor from './editor'

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
        brand: initialBrand,
}

interface TimestampObjectFirestore {
        seconds: number
        miliseconds: number
}

interface Props {
        allBrands: Brand[]
        allProducts: Product[]
        doRerender: () => void
}

const Products: React.FC<Props> = ({ allBrands, allProducts, doRerender }) => {
        const [isEditing, setIsEditing] = useState(false)
        const [prd, setPrd] = useState<Product[]>([])
        const [provideProduct, setProvideProduct] = useState(false)
        const [toProvide, setToProvide] = useState<Product>(initialProduct)

        useEffect(() => {
                setPrd(allProducts)
        }, [])

        const handleRemove = (key: any) => {}

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
