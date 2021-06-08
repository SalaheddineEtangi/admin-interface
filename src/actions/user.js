import api from './api'

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formatData = (usersList, data) => ({
    id: usersList.length === 0 ? 1 : usersList[usersList.length - 1].id + 1,
    ...data
})

export const fetchAll = () => dispatch => {
    api.user().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data.items
            })
        })
        .catch(err => console.log(err))
}

export const create = (usersList, data, onSuccess) => dispatch => {
    data = formatData(usersList, data)
    api.user().create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, usersList, data, onSuccess) => dispatch => {
    data = formatData(usersList, data)
    api.user().update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: {id, ...data}
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const remove = (id, onSuccess) => dispatch => {
    api.user().delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}