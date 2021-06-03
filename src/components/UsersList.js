import React from 'react';
import {
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {API_URL} from '../config';
import {useEffect} from "react"
import {connect} from 'react-redux'
import * as actions from '../actions/user' 

const deleteUser = id => {
    fetch(`${API_URL}/users/delete/${id}`, { method: 'DELETE' })
    window.location.reload()
}

const UsersListItem = props => {
    return(
        <ListGroup className="mt-4">
            <ListGroupItem>
                <strong>{props.user.email}</strong>
                <Button 
                    color="danger" 
                    className="float-end"
                    onClick={() => deleteUser(props.user.id)}>
                    Supprimer
                </Button>
            </ListGroupItem>
        </ListGroup>
    )
};

const UsersList = props => {

    useEffect(() => {
        props.fetchAllUsers()
    }, [])

    return(
        <ListGroup className="mt-4">
            {props.usersList.map((user, index) => (
                <UsersListItem user={user} key={index}/>
            ))}
        </ListGroup>
    )
};

const mapStateToProps = state => ({
    usersList: state.user.users
})

const mapActionToProps = {
    fetchAllUsers: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(UsersList)