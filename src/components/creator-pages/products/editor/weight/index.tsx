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
        weight: number
        headerText: string
        placeholderText: string
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Weight: React.FC<Props> = ({
        weight,
        headerText,
        placeholderText,
        handleChange,
}) => {
        return (
                <FormGroup>
                        <Label for="weight">{headerText}</Label>
                        <InputGroup>
                                <Input
                                        value={weight}
                                        id="weight"
                                        type="number"
                                        onChange={handleChange}
                                        placeholder={placeholderText}
                                />
                                <InputGroupAddon addonType="append">
                                        <InputGroupText>gram </InputGroupText>
                                </InputGroupAddon>
                        </InputGroup>
                </FormGroup>
        )
}

export default Weight
