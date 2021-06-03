import {ACTION_TYPES} from '../actions/user'

const initialState = {
    users: []
}

export const user = (state = initialState, action) => {
    switch(action.type){
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                users: [...action.payload]
            }
        
        default: 
            return state
    }
}