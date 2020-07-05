import React, { useContext, useState } from 'react'
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from 'reactfire'

import { Product } from '../../interfaces/product'
import { UserContext } from '../../lib/user.context'

interface Props {
        text: string
}

const Button: React.FC<Props> = ({ text }) => {
        // const randomProduct: Product = {
        //         name: 'bliblbil',
        //         desc: 'wadkakd',
        //         imgs: ['1'],
        //         PID: '123',
        //         price: 24,
        //         available: true,
        //         arrivingAt: new Date(),
        //         timesPurchased: 0,
        //         multipleVars: false,
        //         vars: [],
        // }

        // const { user, changeUser } = useContext(UserContext)
        // const [counter, setCounter] = useState(0)

        // const randomRef = useFirestore()
        //         .collection('product')
        //         .doc(randomProduct.name)

        // const handleClick = () => {
        //         const mockUser = {
        //                 name: 'bllblb',
        //                 uid: '1234',
        //         }

        //         if (changeUser) {
        //                 if (counter % 2 === 0) {
        //                         changeUser()
        //                 } else {
        //                         changeUser(mockUser)
        //                 }
        //                 setCounter(counter + 1)
        //         }
        // }

        // console.log(user)
        // // console.log(changeUser)

        return <button>{text}</button>
}

export default Button
