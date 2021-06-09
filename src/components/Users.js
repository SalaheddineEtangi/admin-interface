import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, ButtonGroup, withStyles } from "@material-ui/core"
import React, {useEffect, useState} from "react"
import {connect} from 'react-redux'
import * as actions from '../actions/user' 
import useForm from './useForm'
import UserForm from './UserForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const initialFieldValues = {
    email: '',
    password: ''
}

const Users = ({classes, ...props}) => {
    const [currentId, setCurrentId] = useState(0)

    const {
      onSuccess
    } = useForm(initialFieldValues, props.setCurrentId)

    useEffect(() => {
        props.fetchAllUsers()
    }, [])

    const onDelete = id => {
        if(window.confirm('Voulez vous vraiment supprimer ce compte utilisateur ?')){
            props.deleteUser(id, onSuccess('Supprimé', 'error'))
        }
}

    return(
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <UserForm {...({currentId, setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Liste des utilisateurs</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.usersList.map((user, index) => {
                                        return(<TableRow key={index}>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary" onClick={() => {setCurrentId(user.id)}} /></Button>
                                                    <Button><DeleteIcon color="error" onClick={() => {onDelete(user.id)}}/></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => ({
        usersList: state.user.users
    })

const mapActionToProps = {
    fetchAllUsers: actions.fetchAll,
    deleteUser: actions.remove
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Users))