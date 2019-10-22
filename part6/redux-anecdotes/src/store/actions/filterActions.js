import * as actionTypes from './actionTypes';

export const applyFilter = (filter, array) => {
    return {
        type: actionTypes.FILTER,
        payload: {
            filter: filter, array: array
        }
    }
}