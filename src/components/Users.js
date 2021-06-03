import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import React, {useState, useEffect} from "react"
import {connect} from 'react-redux'
import * as actions from '../actions/user' 
import UserForm from './UserForm'

const Users = (props) => {

    useEffect(() => {
        props.fetchAllUsers()
    }, [])

    return(
        <Paper>
            <Grid container>
                <Grid item xs={6}>
                    <UserForm />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.usersList.map((user, index) => {
                                        return(<TableRow key={index}>
                                            <TableCell>{user.email}</TableCell>
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
    fetchAllUsers: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(Users)