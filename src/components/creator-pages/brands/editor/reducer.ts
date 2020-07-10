import React from 'react'
import { State } from '.'

export const reducer: React.Reducer<State, any> = (state, action): State => {
        const { type } = action
        switch (type) {
                case Actions.SET_NAME:
                        return {
                                ...state,
                                name: action.payload.name,
                        }
                case Actions.SET_AVAILABLE_PROD:
                        return {
                                ...state,
                                availableProd: action.payload.data,
                        }
        }
        return state
}

export enum Actions {
        SET_NAME,
        SET_AVAILABLE_CTG,
        SET_SELECTION_CTG,
        SET_AVAILABLE_PROD,
        SET_SELECTION_PROD,
        SET_SUCCESS,
}
