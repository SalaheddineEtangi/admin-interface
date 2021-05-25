import React, {Component} from 'react';
import UsersList from '../components/UsersList';
import { API_URL } from '../config';

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then(json => this.setState(
            {
                users: json.items,
            }));
    }

    render(){
        const {users} = this.state

        return(
            <div className="text-center mt-4">
                {users.length > 0 && <UsersList list={this.state.users}/>}
                {users.length === 0 && <strong>Aucun utilisateur à afficher</strong>}
            </div>
        )
    }
}

export default Users;