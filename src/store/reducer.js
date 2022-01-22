import {SAVE_DATA, SUBMIT_DATA} from './actionType'

export const saveReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_DATA:
            return action.payload;
        default:
            return state;
    }
}

export const submitReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBMIT_DATA:
            return action.payload;
        default:
            return state;
    }
}
