import React, { useState, useEffect } from 'react'

import { Product } from 'ts/interfaces/product'
import Select from 'components/select'
import './styles.scss'
import { difference } from 'lib/helper'

interface Props {
        // allProducts: Product[]
        headerText: string
        products: Product[]
        available: Product[]
        handleChange: (vars: Product[]) => void
}

const Variations: React.FC<Props> = ({
        // allProducts,
        headerText,
        products,
        available,
        handleChange: dispatchVarsToParent,
}) => {
        // const [available, setAvailable] = useState<Product[]>(allProducts)

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const items: Product[] = available.filter(
                        (product) => product.name === event.target.value
                )
                if (items.length > 0) {
                        // setAvailable(
                        //         available.filter(
                        //                 (product) =>
                        //                         product.name !== items[0].name
                        //         )
                        // )

                        dispatchVarsToParent([...products, items[0]])
                }
        }

        const handleRemove = (key: any) => {
                const items: Product[] = products.filter(
                        (product) => product.name === key
                )
                if (items.length > 0) {
                        // setAvailable([...available, items[0]])
                        dispatchVarsToParent(
                                products.filter(
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
                        selected={products}
                        handleChange={handleChange}
                        handleRemove={handleRemove}
                />
        )
}

export default Variations
