import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

interface Props {
        headerText: string
        placeholderText: string
        desc: string
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Desc: React.FC<Props> = ({
        headerText,
        placeholderText,
        desc,
        handleChange,
}) => {
        return (
                <FormGroup>
                        <Label for="desc">{headerText}</Label>
                        <Input
                                type="textarea"
                                id="desc"
                                onChange={handleChange}
                                placeholder={placeholderText}
                                value={desc}
                        />
                </FormGroup>
        )
}

export default Desc
