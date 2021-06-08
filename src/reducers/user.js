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

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
            }
        
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            }

        default: 
            return state
    }
}