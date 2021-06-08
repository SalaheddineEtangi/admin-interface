import React, {useEffect} from 'react';
import UsersList from '../components/UsersList';
import {connect} from 'react-redux'
import * as actions from '../actions/user' 

const Users = props => {

    useEffect(() => {
        props.fetchAllUsers()
    }, [])

        return(
            <div className="text-center mt-4">
                {props.usersList.length > 0 && <UsersList/>}
                {props.usersList.length === 0 && <strong>Aucun utilisateur à afficher</strong>}
            </div>
        )
}

const mapStateToProps = state => ({
    usersList: state.user.users
})

const mapActionToProps = {
    fetchAllUsers: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(Users);