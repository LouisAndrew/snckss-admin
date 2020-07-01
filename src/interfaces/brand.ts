import { Product } from './product'

/**
 * Brand interface to illustrate how it works on firestore.
 * Used to categorize products based on its brand.
 */
export interface Brand {
        name: string
        products: Product[]
}
