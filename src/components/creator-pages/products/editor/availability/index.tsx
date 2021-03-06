import React from 'react'
import { Input, Label, FormGroup } from 'reactstrap'

import './styles.scss'

interface Props {
        isAvailable: boolean
        headerText: string
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Availabilty: React.FC<Props> = ({
        isAvailable,
        headerText,
        handleChange,
}) => (
        <FormGroup className="available">
                <Label for="available">{headerText}</Label>
                <Input
                        id="available"
                        name="available"
                        type="checkbox"
                        onChange={handleChange}
                        checked={isAvailable}
                />
        </FormGroup>
)

export default Availabilty
