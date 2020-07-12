import { Product } from './product'
import { Category } from './category'

/**
 * Brand interface to illustrate how it works on firestore.
 * Used to categorize products based on its brand.
 */
export interface Brand {
        name: string
        products: Product[]
        category: Category
}
