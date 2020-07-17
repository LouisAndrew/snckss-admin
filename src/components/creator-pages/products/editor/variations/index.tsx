import React, { useState, useEffect } from 'react'

import { Product } from 'ts/interfaces/product'
import Select from 'components/select'
import './styles.scss'
import { difference } from 'lib/helper'

interface Props {
        allProducts: Product[]
        headerText: string
        products: Product[]
        handleChange: (vars: Product[]) => void
}

const Variations: React.FC<Props> = ({
        allProducts,
        headerText,
        products,
        handleChange: dispatchVarsToParent,
}) => {
        const [available, setAvailable] = useState<Product[]>(allProducts)
        const [selected, setSelected] = useState<Product[]>([])

        useEffect(() => {
                // products is the default product variants passed by its parent.
                if (products.length > 0) {
                        // set available to an array of elements, that are within available but aren't contained inside products
                        setAvailable(difference(available, products))
                        setSelected(products)
                }
        }, [])

        useEffect(() => {
                dispatchVarsToParent(selected)
        }, [selected])

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const items: Product[] = available.filter(
                        (product) => product.name === event.target.value
                )
                if (items.length > 0) {
                        setAvailable(
                                available.filter(
                                        (product) =>
                                                product.name !== items[0].name
                                )
                        )
                        setSelected([...selected, items[0]])
                }
        }
        const handleRemove = (key: any) => {
                const items: Product[] = selected.filter(
                        (product) => product.name === key
                )
                if (items.length > 0) {
                        setAvailable([...available, items[0]])
                        setSelected(
                                selected.filter(
                                        (product) =>
                                                product.name !== items[0].name
                                )
                        )
                }
        }

        return (
                <Select
                        headerText={headerText}
                        available={available}
                        selected={selected}
                        handleChange={handleChange}
                        handleRemove={handleRemove}
                />
        )
}

export default Variations
