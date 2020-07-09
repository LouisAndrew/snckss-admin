import React from 'react'
import { State } from './editor'

export const reducer: React.Reducer<State, any> = (state, action): State => {
        return state
}

export enum Actions {
        SET_NAME,
        ADD_SELECTION_CTG,
        REMOVE_SELECTION_DTG,
        ADD_SELECTION_PROD,
        REMOVE_SELECTION_PROD,
        SET_SUCCESS,
}
