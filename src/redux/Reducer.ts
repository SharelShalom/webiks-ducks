import { duck } from '../Interfaces/duckInterface';
import { action } from '../Interfaces/reduxInterfaces';
import * as actionType from './ActionTypes';

export default function reducer(state:{ducks: duck[]} = {ducks: []}, currentAction: action) {
    switch (currentAction.type) {
        case actionType.DUCKS_FETCHED:
            return {
                ...state,
                ducks: currentAction.payload.ducks,
            }
        case actionType.DUCK_ADDED:
            return {
                ...state,
                ducks: [...state?.ducks, currentAction.payload.duck]
            }
        case actionType.DUCK_UPDATED:
            const ducksWithoutUpdateDuck = state.ducks.filter((currentDuck: duck) => currentDuck._id != currentAction.payload.duck._id);
            return {
                ...state,
                ducks: [...ducksWithoutUpdateDuck, currentAction.payload.duck]
            }
        case actionType.DUCK_DELETED:
            return {
                ...state,
                ducks: state.ducks.filter((currentDuck: duck) => currentDuck._id != currentAction.payload.id),
            }
        default:
            return state;
    }
}