import { ADD_QUERY, REMOVE_QUERY } from '../constants'

export function addQuery(query) {
    return {
        type: ADD_QUERY,
        payload: query
    }
}

export function removeQuery(query) {
    return {
        type: REMOVE_QUERY,
        payload: query
    }
}