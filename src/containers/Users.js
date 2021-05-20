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
        return(
            <div>
                <UsersList list={this.state.users}/>
            </div>
        )
    }
}

export default Users;