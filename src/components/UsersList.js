import React from 'react';
import {
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';

const UsersListItem = props => {
    return(
        <ListGroup className="mt-4">
            <ListGroupItem>
                <strong>{props.users.email}</strong>
                <Button color="danger" className="float-end">Supprimer</Button>
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