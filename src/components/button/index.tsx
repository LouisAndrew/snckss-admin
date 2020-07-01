import React from 'react'
import { useFirestore } from 'reactfire'

interface Props {
        text: string
}

const Button: React.FC<Props> = ({ text }) => {
        const fs = useFirestore()
        console.log(fs)

        return <button>{text}</button>
}

export default Button
