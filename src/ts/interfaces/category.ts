import { Product } from './product'

/**
 * interface to illustrate how Category works on firestore db.
 * used to organize products and brands based on its category e.g snack and chocolate.
 */
export interface Category {
        name: string
        products: Product[]
}
