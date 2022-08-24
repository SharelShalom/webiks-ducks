import { duck } from '../Interfaces/duckInterface';
import * as actions from './ActionTypes';


export const duckAdded = (duck: duck) => ({
    type: actions.DUCK_ADDED,
    payload: {
        duck,
    }
})

export const duckDeleted = (id: string) => ({
    type: actions.DUCK_DELETED,
    payload: {
        id,
    }
})

export const duckUpdated = (duck: duck) => ({
    type: actions.DUCK_UPDATED,
    payload: {
        duck,
    }
})

export const ducksFetched = (ducks: duck[]) => ({
    type: actions.DUCKS_FETCHED,
    payload: {
        ducks,
    }
})