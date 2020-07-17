import React from 'react'
import {
        Input,
        Label,
        InputGroup,
        FormGroup,
        InputGroupAddon,
        InputGroupText,
} from 'reactstrap'

interface Props {
        price: number
        headerText: string
        placeholderText: string
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Price: React.FC<Props> = ({
        price,
        headerText,
        placeholderText,
        handleChange,
}) => {
        return (
                <FormGroup>
                        <Label for="price">{headerText}</Label>
                        <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Rp. </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                        value={price}
                                        id="price"
                                        type="number"
                                        onChange={handleChange}
                                        placeholder={placeholderText}
                                />
                        </InputGroup>
                </FormGroup>
        )
}

export default Price
