import React, { useState, useEffect } from 'react'

import { Product } from 'ts/interfaces/product'
import Select from 'components/select'
import './styles.scss'

interface Props {
        allProducts: Product[]
        headerText: string
        handleChange: (vars: Product[]) => void
}

const Variations: React.FC<Props> = ({
        allProducts,
        headerText,
        handleChange: dispatchVarsToParent,
}) => {
        const [available, setAvailable] = useState<Product[]>(allProducts)
        const [selected, setSelected] = useState<Product[]>([])

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
