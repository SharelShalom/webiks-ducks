import { duck } from "../Interfaces/duckInterface";
import * as actionTypes from '../redux/ActionTypes';

export const addDuckRedux = (createDuck: duck) => {
    return (dispatch: any) => {
        dispatch({
            type: actionTypes.DUCK_ADDED,
            payload: {
                duck: createDuck
            },
        })
    }
}

export const updateDuckRedux = (updateDuck: duck) => {
    return (dispatch: any) => {
            dispatch({
                type: actionTypes.DUCK_UPDATED,
                payload: {
                    duck: updateDuck,
                }
            })
    }
}

export const deleteDuckRedux = (id: string) => {
    return (dispatch: any) => {
        dispatch({
            type: actionTypes.DUCK_DELETED,
            payload: {
                id
            }
        })
    }
}

export const fetchDucks = (ducks: duck[]) => {
    return (dispatch: any) => {
        dispatch({
            type: actionTypes.DUCKS_FETCHED,
            payload: {
                ducks
            }
        });
    }
}