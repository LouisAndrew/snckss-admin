import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

import List, { ListItem } from '../list'
import { Category } from '../../interfaces/category'
import { Brand } from '../../interfaces/brand'
import { Product } from '../../interfaces/product'

type Collection = Category[] | Brand[] | Product[]

interface Props {
        available: any[]
        selected: any[]
        headerText: string
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
        handleRemove: (key: ListItem['key']) => void
}

const Select: React.FC<Props> = ({
        available,
        selected,
        headerText,
        handleChange,
        handleRemove,
}) => {
        return (
                <>
                        <FormGroup>
                                <Label for="select">{headerText}</Label>
                                <Input
                                        type="select"
                                        id="select"
                                        name="select"
                                        onChange={handleChange}
                                        value=""
                                >
                                        <option key="default" value="default">
                                                Select multiple
                                        </option>
                                        {available.map((item) => (
                                                <option
                                                        key={`option-${item.name}`}
                                                        value={item.name}
                                                >
                                                        {item.name}
                                                </option>
                                        ))}
                                </Input>
                        </FormGroup>
                        {selected.length > 0 && (
                                <List
                                        items={selected.map((item) => {
                                                const { name } = item
                                                const listItem = {
                                                        text: name,
                                                        key: name,
                                                } as ListItem

                                                return listItem
                                        })}
                                        headerText="Selected Items"
                                        handleRemove={handleRemove}
                                />
                        )}
                </>
        )
}

export default Select
