import axios from 'axios'

const baseUrl = "http://localhost:52935/"

export default {
    user(url = baseUrl + 'users/'){
        return{
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newUser => axios.post(url + 'register', newUser),
            update: (id, updatedUser) => axios.put(url + 'set-new-password/' + id, updatedUser),
            delete: id => axios.delete(url + id)
        }
    }
}