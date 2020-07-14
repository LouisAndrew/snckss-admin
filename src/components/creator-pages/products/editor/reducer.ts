import { Product } from 'ts/interfaces/product'
import { initialProduct } from '..'
import { initialBrand } from 'components/creator-pages/brands'

export interface State extends Product {
        success: boolean
}

interface Action {
        type: Actions
        payload: {
                name?: string
                desc?: string
                success?: boolean
        }
}

export enum Actions {
        SET_SUCCESS,
        SET_NAME,
        SET_DESC,
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
                case Actions.SET_NAME:
                        const {
                                payload: { name },
                        } = action
                        if (name) {
                                return {
                                        ...state,
                                        name,
                                }
                        }
                case Actions.SET_DESC:
                        const {
                                payload: { desc },
                        } = action
                        if (desc) {
                                return {
                                        ...state,
                                        desc,
                                }
                        }
                case Actions.SET_SUCCESS:
                        const {
                                payload: { success },
                        } = action
                        if (success) {
                                return {
                                        ...state,
                                        success,
                                }
                        }
                default:
                        return state
        }
}
