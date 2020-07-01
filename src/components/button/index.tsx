import React from 'react'
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from 'reactfire'

interface Props {
        text: string
}

const Button: React.FC<Props> = ({ text }) => {
        const nutellaRef = useFirestore().collection('brand').doc('nutella')
        const randomRef = useFirestore().collection('product').doc('blbl')
        const nutella = useFirestoreDoc(nutellaRef)

        console.log(nutella.data())

        const handleClick = () => {
                nutellaRef.set({
                        name: ';',
                        products: randomRef,
                })
        }

        return <button onClick={handleClick}>{text}</button>
}

export default Button
