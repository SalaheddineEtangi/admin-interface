import api from './api'

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formatData = data => ({
    id: 1,
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

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data)
    api.user().create(data)
        .then(response => {
            console.log(response)
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data)
    api.user().update(id, data)
        .then(() => {
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
        .then(() => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}