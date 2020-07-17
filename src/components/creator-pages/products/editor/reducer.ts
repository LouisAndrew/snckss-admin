import { Product } from 'ts/interfaces/product'
import { initialProduct } from '..'
import { initialBrand } from 'components/creator-pages/brands'
import { Brand } from 'ts/interfaces/brand'

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
                                },
                        } = action
                        // just to make sure all of the attributes is not undefined.
                        if (
                                name !== undefined &&
                                desc !== undefined &&
                                brand &&
                                imgs !== undefined &&
                                arrivingAt &&
                                vars !== undefined &&
                                timesPurchased &&
                                multipleVars !== undefined &&
                                available !== undefined &&
                                price !== undefined
                        ) {
                                return {
                                        ...state,
                                        brand,
                                        desc,
                                        name,
                                        imgs,
                                        arrivingAt,
                                        vars,
                                        available,
                                        price,
                                }
                        }
                }

                default:
                        return state
        }
}
