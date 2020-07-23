import { Brand } from './brand'
import { Category } from './category'

/**
 * Product interface -> product object to illustrate the real product on the firestore.
 * vars -> would contain ref to firestore doc.
 */
export interface Product {
        name: string
        desc: string
        PID: string
        price: number
        imgs: string[]
        available: boolean
        arrivingAt: Date
        timesPurchased: number
        multipleVars: boolean
        vars: Product[]
        brand: Brand
        toFullfil: number
        purchaseLimit: number
        weight: number
        category: Category
}
