import React from 'react';
import {
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {API_URL} from '../config';

const deleteUser = id => {
    fetch(`${API_URL}/users/delete/${id}`, { method: 'DELETE' })
    window.location.reload()
}

const UsersListItem = props => {
    return(
        <ListGroup className="mt-4">
            <ListGroupItem>
                <strong>{props.users.email}</strong>
                <Button 
                    color="danger" 
                    className="float-end"
                    onClick={() => deleteUser(props.users.id)}>
                    Supprimer
                </Button>
            </ListGroupItem>
        </ListGroup>
    )
};

const UsersList = props => {
    return(
        <ListGroup className="mt-4">
            {props.list.map(users => (
                <UsersListItem users={users} key={users.id}/>
            ))}
        </ListGroup>
    )
};

export default UsersList;