import { Product } from './product'

/**
 * interface to illustrate how Order works on firestore.
 * Used to view orders from customer and therefore proccess it.
 */
export interface Order {
        UID: string
        products: Product[]
        orderID: string
        timeOrdered: Date
}
