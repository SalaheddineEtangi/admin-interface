import { Grid, Paper, 
         TableContainer, Table, TableHead, TableRow, TableCell, TableBody,  
         Button, ButtonGroup, 
         withStyles } from "@material-ui/core"
import {Navbar, NavbarBrand, Container} from 'reactstrap'
import React, {useEffect, useState} from "react"
import {connect} from 'react-redux'
import * as actions from '../actions/user' 
import useForm from './useForm'
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
        <div>
            <Navbar color="light" light>
                <Container>
                    <NavbarBrand>Tableau de bord</NavbarBrand>
                </Container>
            </Navbar> 
            <Paper className={classes.paper} elevation={3}>
                <Grid container>
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
            </Paper>
        </div>
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