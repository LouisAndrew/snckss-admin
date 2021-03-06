import { Product } from 'ts/interfaces/product'
import { Brand } from 'ts/interfaces/brand'

import { initialBrand } from 'components/creator-pages/brands'
import { initialCategory } from 'components/creator-pages/categories'
import { Category } from 'ts/interfaces/category'
import { stat } from 'fs'

export interface State extends Product {
        success: boolean
}

interface Action {
        type: Actions
        payload: {
                name?: string
                desc?: string
                success?: boolean
                imgs?: string[]
                available?: boolean
                arrivingAt?: Date
                vars?: Product[]
                brand?: Brand
                multipleVars?: boolean
                timesPurchased?: number
                price?: number
                allProducts?: Product[]
                allBrands?: Brand[]
                toFullfil?: number
                purchaseLimit?: number
                category?: Category
                weight?: number
                allCategories?: Category[]
        }
}

export enum Actions {
        SET_SUCCESS,
        SET_NAME,
        SET_DESC,
        SET_BRAND,
        SET_IMGS,
        SET_AVAILABLE,
        SET_ARRIVING_AT,
        SET_VARS,
        SET_ALL,
        SET_PRICE,
        SET_WEIGHT,
        SET_CATEGORY,
}

export const initialState: State = {
        name: '',
        desc: '',
        PID: '',
        price: 0,
        imgs: [],
        available: false,
        arrivingAt: new Date(),
        timesPurchased: 0,
        multipleVars: false,
        vars: [],
        brand: initialBrand,
        success: false,
        toFullfil: 0,
        purchaseLimit: 0,
        category: initialCategory,
        weight: 0,
}

export const reducer: React.Reducer<State, Action> = (state, action): State => {
        const { type } = action
        switch (type) {
                case Actions.SET_NAME: {
                        const {
                                payload: { name },
                        } = action
                        if (name !== undefined) {
                                return {
                                        ...state,
                                        name,
                                }
                        }
                }

                case Actions.SET_DESC: {
                        const {
                                payload: { desc },
                        } = action
                        if (desc !== undefined) {
                                return {
                                        ...state,
                                        desc,
                                }
                        }
                }

                case Actions.SET_BRAND: {
                        const {
                                payload: { brand },
                        } = action
                        if (brand) {
                                return {
                                        ...state,
                                        brand,
                                }
                        }
                }

                case Actions.SET_SUCCESS: {
                        const {
                                payload: { success },
                        } = action
                        if (success !== undefined) {
                                return {
                                        ...state,
                                        success,
                                }
                        }
                }

                case Actions.SET_IMGS: {
                        const {
                                payload: { imgs },
                        } = action
                        if (imgs !== undefined) {
                                return {
                                        ...state,
                                        imgs,
                                }
                        }
                }

                case Actions.SET_AVAILABLE: {
                        const {
                                payload: { available },
                        } = action
                        if (available !== undefined) {
                                return {
                                        ...state,
                                        available,
                                }
                        }
                }

                case Actions.SET_ARRIVING_AT: {
                        const {
                                payload: { arrivingAt },
                        } = action
                        if (arrivingAt) {
                                return {
                                        ...state,
                                        arrivingAt,
                                }
                        }
                }

                case Actions.SET_VARS: {
                        const {
                                payload: { vars },
                        } = action
                        if (vars !== undefined) {
                                const toReturn: State = {
                                        ...state,
                                        vars,
                                }
                                if (vars.length > 0 && !state.multipleVars) {
                                        return {
                                                ...toReturn,
                                                multipleVars: true,
                                        }
                                } else if (
                                        vars.length === 0 &&
                                        state.multipleVars
                                ) {
                                        return {
                                                ...toReturn,
                                                multipleVars: false,
                                        }
                                } else {
                                        return toReturn
                                }
                        }
                }

                case Actions.SET_PRICE: {
                        const {
                                payload: { price },
                        } = action
                        if (price !== undefined) {
                                return {
                                        ...state,
                                        price,
                                }
                        }
                }

                case Actions.SET_WEIGHT: {
                        const {
                                payload: { weight },
                        } = action
                        if (weight !== undefined) {
                                return {
                                        ...state,
                                        weight,
                                }
                        }
                }

                case Actions.SET_CATEGORY: {
                        const {
                                payload: { category },
                        } = action
                        if (category !== undefined) {
                                return {
                                        ...state,
                                        category,
                                }
                        }
                }

                case Actions.SET_ALL: {
                        const {
                                payload: {
                                        name,
                                        desc,
                                        brand,
                                        imgs,
                                        available,
                                        arrivingAt,
                                        vars,
                                        multipleVars,
                                        timesPurchased,
                                        price,
                                        toFullfil,
                                        allProducts,
                                        allBrands,
                                        purchaseLimit,
                                        weight,
                                        category,
                                        allCategories,
                                },
                        } = action
                        // just to make sure all of the attributes is not undefined.
                        if (allProducts && allBrands && allCategories) {
                                return {
                                        ...state,
                                        name:
                                                name !== undefined
                                                        ? name
                                                        : initialState.name,
                                        desc:
                                                desc !== undefined
                                                        ? desc
                                                        : initialState.desc,
                                        brand: brand
                                                ? allBrands.filter(
                                                          (brandName) =>
                                                                  brandName.name ===
                                                                  ((brand as unknown) as string)
                                                  )[0]
                                                : initialBrand,
                                        imgs:
                                                imgs !== undefined
                                                        ? imgs
                                                        : initialState.imgs,
                                        available:
                                                available !== undefined
                                                        ? available
                                                        : initialState.available,
                                        arrivingAt:
                                                arrivingAt !== undefined
                                                        ? arrivingAt
                                                        : initialState.arrivingAt,
                                        vars:
                                                // when passed from fs, vars is just an array of string.
                                                // so what we need to do here is cast the string into a product obj and find the product obj from the allproducts
                                                // collection
                                                vars !== undefined
                                                        ? vars.map(
                                                                  (
                                                                          variationName
                                                                  ) =>
                                                                          allProducts.filter(
                                                                                  (
                                                                                          product
                                                                                  ) =>
                                                                                          product.name ===
                                                                                          ((variationName as unknown) as string)
                                                                          )[0]
                                                          )
                                                        : initialState.vars,
                                        multipleVars:
                                                multipleVars !== undefined
                                                        ? multipleVars
                                                        : initialState.multipleVars,
                                        timesPurchased:
                                                timesPurchased !== undefined
                                                        ? timesPurchased
                                                        : initialState.timesPurchased,
                                        price:
                                                price !== undefined
                                                        ? price
                                                        : initialState.price,
                                        toFullfil:
                                                toFullfil !== undefined
                                                        ? toFullfil
                                                        : initialState.toFullfil,
                                        purchaseLimit:
                                                purchaseLimit !== undefined
                                                        ? purchaseLimit
                                                        : initialState.purchaseLimit,
                                        category: category
                                                ? allCategories.filter(
                                                          (categoryName) =>
                                                                  categoryName.name ===
                                                                  ((category as unknown) as string)
                                                  )[0]
                                                : initialCategory,
                                        weight:
                                                weight !== undefined
                                                        ? weight
                                                        : initialState.weight,
                                }
                        }
                }

                default:
                        return state
        }
}
