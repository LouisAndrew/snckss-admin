import React from 'react'
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from 'reactfire'
import firebase from 'firebase'

import { Product } from '../../interfaces/product'

interface Props {
        text: string
}

const Button: React.FC<Props> = ({ text }) => {
        const randomProduct: Product = {
                name: 'bliblbil',
                desc: 'wadkakd',
                imgs: ['1'],
                PID: '123',
                price: 24,
                available: true,
                arrivingAt: new Date(),
                timesPurchased: 0,
                multipleVars: false,
                vars: [],
        }

        const randomRef = useFirestore()
                .collection('product')
                .doc(randomProduct.name)

        const handleClick = () => {
                randomRef.set({
                        ...randomProduct,
                        arrivingAt: firebase.firestore.Timestamp.fromDate(
                                randomProduct.arrivingAt
                        ),
                })
        }

        return <button onClick={handleClick}>{text}</button>
}

export default Button
