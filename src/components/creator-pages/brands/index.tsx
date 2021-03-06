import React, { useState, useEffect } from 'react'
import { useFirestore } from 'reactfire'

import List, { ListItem } from '../../list'
import Icons from '../icons'
import './styles.scss'
import BrandEditor from './editor'
import { Category } from 'ts/interfaces/category'
import { Product } from 'ts/interfaces/product'
import { Brand } from 'ts/interfaces/brand'
import useSureQuestion from 'hooks/useSureQuestion'

export const initialBrand: Brand = {
        name: '',
        products: [],
        // category: {
        //         name: '',
        //         brands: [],
        // },
}

interface Props {
        allBrands: Brand[]
        allProducts: Product[]
        doRerender: () => void
}

/**
 * Almost the same structure as Categoties. Do I need to combine them just as one reusable component?
 * but if yes -> It's going to be a lot of if statements inside on component....
 */
const Brands: React.FC<Props> = ({ allBrands, allProducts, doRerender }) => {
        const [isEditing, setIsEditing] = useState(false)
        const [brd, setBrd] = useState<Brand[]>([])
        const [provideBrand, setProvideBrand] = useState(false)
        const [toProvide, setToProvide] = useState<Brand>(initialBrand)

        const brands = useFirestore().collection('brand')
        const products = useFirestore().collection('product')
        const question = useSureQuestion()

        // fetch all categories from firestore.
        useEffect(() => {
                setBrd(allBrands)
        }, [])

        const createNameDuplicate = (name: string): string => {
                let i = 1
                const names: string[] = brd.map((brand) => brand.name)
                while (names.includes(`${name}-${i}`)) {
                        i++
                }

                return `${name}-${i}`
        }

        const handleRemove = (key: any) => {
                const isKeyExists: boolean = allBrands.some(
                        (brd) => brd.name === key
                )
                if (isKeyExists) {
                        const brandRef = brands.doc(key)
                        const toDeleteBrand: Brand = allBrands.filter(
                                (brand) => brand.name === key
                        )[0]

                        const deleteProductRef = (productName: string) => {
                                products.doc(productName).update({
                                        brand: '',
                                })
                        }

                        const deleteBrand = () => {
                                toDeleteBrand.products.forEach((product) => {
                                        const productName = (product as unknown) as string
                                        if (productName) {
                                                deleteProductRef(productName)
                                        }
                                })

                                brandRef.delete().then(() => {
                                        doRerender()
                                })
                        }

                        question.apply(
                                `Are you sure you want to delete ${key}`,
                                'brands-creator',
                                deleteBrand,
                                () => {}
                        )
                }
        }

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

        const handleEdit = (key: ListItem['key']) => {
                if (!isEditing) {
                        const selectedBrand: Brand = brd.filter(
                                (brand) => brand.name === key
                        )[0]
                        if (selectedBrand) {
                                setIsEditing(true)
                                setProvideBrand(true)
                                setToProvide({
                                        ...selectedBrand,
                                        name: createNameDuplicate(
                                                selectedBrand.name
                                        ),
                                })
                        }
                }
        }

        const goBack = () => {
                if (isEditing) {
                        setIsEditing(false)
                        setProvideBrand(false)
                        setToProvide(initialBrand)
                        doRerender()
                }
        }

        const add = () => {
                if (provideBrand) {
                        setProvideBrand(false)
                }
                setIsEditing(true)
        }

        return (
                <div className="brands-creator creator">
                        <Icons
                                goBack={goBack}
                                add={add}
                                displayAdd={!isEditing}
                        />
                        <h1>Brands</h1>
                        {isEditing ? (
                                <BrandEditor
                                        brand={toProvide}
                                        providedBrand={provideBrand}
                                        goBack={goBack}
                                        allProducts={allProducts}
                                />
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
                                        handleEdit={handleEdit}
                                />
                        )}
                </div>
        )
}

export default Brands
