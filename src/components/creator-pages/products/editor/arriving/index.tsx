import React from 'react'
import { Input, Label, FormGroup } from 'reactstrap'

interface Props {
        headerText: string
        date: Date
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ArrivingAt: React.FC<Props> = ({ date, headerText, handleChange }) => {
        const year: number = date.getFullYear()
        const month: number = date.getMonth() + 1
        const defDate: number = date.getDate()

        const dateInString: string = `${year}-${
                month < 10 ? `0${month}` : month
        }-${defDate < 10 ? `0${defDate}` : defDate}`

        return (
                <FormGroup>
                        <Label for="date">{headerText}</Label>
                        <Input
                                type="date"
                                id="date"
                                onChange={handleChange}
                                value={dateInString}
                        />
                </FormGroup>
        )
}

export default ArrivingAt
