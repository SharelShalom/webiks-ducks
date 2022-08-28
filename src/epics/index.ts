import { gql } from '@apollo/client';
import { Action } from 'redux';
import { combineEpics, StateObservable } from 'redux-observable';
import { filter, map, mergeMap, Observable } from 'rxjs';
import client from '../client';
import * as actionTypes from '../redux/ActionTypes';
import * as actions from '../redux/Actions';

const QUERY_ALL_DUCKS = gql`
    query getDucks{
        ducks {
            color
            name
            _id
        }
    }
`;

const CREATE_DUCK_MUTATION = gql`
    mutation CreateDuck($input: CreateDuckInput!) {
        createDuck(input: $input) {
            _id
            name
            color
        }
    }
`

const UPDATE_DUCK_MUTATION = gql`
    mutation UpdateDuck($input: UpdateDuckInput!) {
        updateDuck(input: $input) {
            _id
            name
            color
        }
    }
`

const DELETE_DUCK_MUTATION = gql`
    mutation DeleteDuck($id: ID!) {
        deleteDuck(_id: $id) {
            _id
        }
    }
`

const epicFetchingDucks = (action$: Observable<Action>, state$: StateObservable<void>): any => action$.pipe(
    filter(action => action.type === actionTypes.DUCKS_FETCHED_EPIC),
    mergeMap((action) => {
        return client.query({ query: QUERY_ALL_DUCKS });
    }),
    map((result: any) => {
        return ({
            type: actionTypes.DUCKS_FETCHED,
            payload: {
                ducks: result.data.ducks
            }
        })
    })
);

const epicAddition = (action$: Observable<any>, state$: StateObservable<void>): any => action$.pipe(
    filter(action => action.type === actionTypes.DUCK_ADDED_EPIC),
    mergeMap((action) => {
        return client.mutate({
            mutation: CREATE_DUCK_MUTATION,
            variables: {input: {name: action.payload.name, color: action.payload.color}},
          //   refetchQueries: [ {query: CREATE_DUCK_MUTATION}],
          })
    }),
    map((result: any) => {
        if(result.data.createDuck) {
            return actions.duckAdded(result.data.createDuck)
        }
        return{type: null};
    })
);

const epicUpdating = (action$: Observable<any>, state$: StateObservable<void>): any => action$.pipe(
    filter(action => action.type === actionTypes.DUCK_UPDATED_EPIC),
    mergeMap((action) => {
        return client.mutate({
            mutation: UPDATE_DUCK_MUTATION,
            variables: {input: {name: action.payload.name, color: action.payload.color, _id: action.payload._id}},
          })
    }),
    map((result: any) => {
        return ({
            type: actionTypes.DUCK_UPDATED,
            payload: {
                duck: result.data.updateDuck
            }
        })
    })
);

const epicDeleteing = (action$: Observable<any>, state$: StateObservable<void>): any => action$.pipe(
    filter(action => action.type === actionTypes.DUCK_DELETED_EPIC),
    mergeMap((action) => {
        return client.mutate({
            mutation: DELETE_DUCK_MUTATION,
            variables: {id: action.payload.id}
        })
    }),
    map((result: any) => {
        return ({
            type: actionTypes.DUCK_DELETED,
            payload: {
               id: result.data.deleteDuck._id
            }
        })
    })
);

export default combineEpics(epicFetchingDucks, epicAddition, epicUpdating, epicDeleteing);