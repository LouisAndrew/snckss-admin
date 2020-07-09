import React from 'react'
import { Input, Label, FormGroup } from 'reactstrap'

interface NameProps {
        name: string
        headerText: string
        placeholderText: string
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Name: React.FC<NameProps> = ({
        name,
        headerText,
        placeholderText,
        handleChange,
}) => (
        <FormGroup>
                <Label for="name">{headerText}</Label>
                <Input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        placeholder={placeholderText}
                        value={name}
                />
        </FormGroup>
)

export default Name
