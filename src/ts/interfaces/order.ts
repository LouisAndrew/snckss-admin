import { Product } from './product'

export enum PaymentMethod {
        BCA = 1,
        Mandiri = 2,
}

/**
 * interface to illustrate how Order works on firestore.
 * Used to view orders from customer and therefore proccess it.
 */
export interface Order {
        // automated fields based on order
        UID: string
        products: Product[]
        orderID: string
        paymentMethod: PaymentMethod

        // user info starts here
        name: string
        telephoneNum: string
        address: string
        timeOrdered: Date

        // should be confirmed by admin
        sent: boolean
        paid: boolean
        trackingNum: string
}
