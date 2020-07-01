/**
 * Product interface -> product object to illustrate the real product on the firestore.
 * vars -> would contain ref to firestore doc.
 */
export interface Product {
        name: string
        desc: string
        PID: string
        price: string
        imgs: string[]
        available: boolean
        arrivingAt: Date
        timesPurchased: number
        multipleVars: boolean
        vars: Product[]
}
