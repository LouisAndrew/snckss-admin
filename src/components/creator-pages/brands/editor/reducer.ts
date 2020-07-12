import React from 'react'
import { State } from '.'
import { Category } from 'ts/interfaces/category'
import { Product } from 'ts/interfaces/product'

interface IAction {
        type: Actions
        payload: {
                name?: string
                success?: boolean
                availableCtg?: Category[]
                selectedCtg?: Category[]
                availableProd?: Product[]
                selectedProd?: Product[]
        }
}

export const reducer: React.Reducer<State, IAction> = (
        state,
        action
): State => {
        const { type } = action
        switch (type) {
                case Actions.SET_NAME:
                        const {
                                payload: { name },
                        } = action
                        if (name) {
                                return {
                                        ...state,
                                        name: name,
                                }
                        } else return state
                case Actions.SET_CTG:
                        const {
                                payload: { selectedCtg, availableCtg },
                        } = action
                        if (selectedCtg && availableCtg) {
                                return {
                                        ...state,
                                        availableCtg: availableCtg,
                                        selectedCtg: selectedCtg,
                                }
                        } else return state
                case Actions.SET_PROD:
                        const {
                                payload: { selectedProd, availableProd },
                        } = action
                        if (selectedProd && availableProd) {
                                return {
                                        ...state,
                                        availableProd: availableProd,
                                        selectedProd: selectedProd,
                                }
                        } else return state
                case Actions.SET_SUCCESS:
                        const {
                                payload: { success },
                        } = action
                        if (success !== undefined) {
                                return {
                                        ...state,
                                        success: success,
                                }
                        } else return state
                default:
                        return state
        }
        return state
}

export enum Actions {
        SET_NAME,
        SET_CTG,
        SET_PROD,
        SET_SUCCESS,
}
