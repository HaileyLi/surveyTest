import {SAVE_DATA, SUBMIT_DATA} from "./actionType"

export const doSaveData = (data) => {
    return {
        type: SAVE_DATA,
        payload: data
    }
}

export const doSubmitData = (data) => {
    return {
        type: SUBMIT_DATA,
        payload: data
    }
}