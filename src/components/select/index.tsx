import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

import List, { ListItem } from '../list'
import { Category } from '../../interfaces/category'
import { Brand } from '../../interfaces/brand'
import { Product } from '../../interfaces/product'

import './styles.scss'

type Collection = Category[] | Brand[] | Product[]

interface Props {
        available: any[]
        selected: any[]
        headerText: string
        single?: boolean
        selectedText?: string
        className?: string
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
        handleRemove: (key: ListItem['key']) => void
}

const Select: React.FC<Props> = ({
        available,
        selected,
        headerText,
        single,
        selectedText,
        className,
        handleChange,
        handleRemove,
}) => {
        // this variable serves as a bridge. whenever single var is there -> the formgroup won't render if one of the options is selected.
        // Instead of having a bulky conditional render on return statement, I use this variable to do the job.
        const req: boolean = single ? selected.length > 0 === false : true
        return (
                <>
                        {req && (
                                <FormGroup className={className}>
                                        <Label for="select">{headerText}</Label>
                                        <Input
                                                type="select"
                                                id="select"
                                                name="select"
                                                onChange={handleChange}
                                                value=""
                                        >
                                                <option
                                                        key="default"
                                                        value="default"
                                                >
                                                        {single
                                                                ? 'Select one'
                                                                : 'Select multiple'}
                                                </option>
                                                {available.map((item) => (
                                                        <option
                                                                key={`option-${item.name}`}
                                                                value={
                                                                        item.name
                                                                }
                                                        >
                                                                {item.name}
                                                        </option>
                                                ))}
                                        </Input>
                                </FormGroup>
                        )}
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
                                        headerText={
                                                selectedText
                                                        ? selectedText
                                                        : 'Selected Items'
                                        }
                                        handleRemove={handleRemove}
                                />
                        )}
                </>
        )
}

export default Select
