import React, {useEffect} from 'react'
import {Grid, TextField, Button, withStyles} from '@material-ui/core'
import useForm from './useForm'
import {connect} from 'react-redux'
import * as actions from '../actions/user' 

const styles = theme => ({
    root: {'& .MuiTextField-root': {
        margin: theme.spacing(1),
        minWidth: 300
    }},
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    email: '',
    password: ''
}

const UserForm = ({classes, ...props}) => {

    const {
        values,
        setValues,
        handleInputChange,
        errors, 
        setErrors,
        validate,
        onSuccess,
        resetForm
    } = useForm(initialFieldValues, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            if(props.currentId === 0){
                props.createUser(props.usersList, values, onSuccess('Ajouté', 'success'))
                resetForm()
            }
            else{
                props.updateUser(props.currentId, props.usersList, values, onSuccess('Modifié', 'success'))
                resetForm()
            }
        }
    }

    useEffect(() => {
        if(props.currentId !== 0){
            setValues({
                ...props.usersList.find(user => user.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const emailErrors = errors.emailRequired || errors.emailFormat

    return(
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <TextField
                type="email"
                name="email"
                variant="outlined"
                label="Email"
                value={values.email}
                onChange={handleInputChange}
                {...(emailErrors && {error:true, helperText: emailErrors})}
                />
                <TextField
                type="password"
                name="password"
                variant="outlined"
                label="Mot de passe"
                value={values.password}
                onChange={handleInputChange}
                {...(errors.passwordRequired && {error:true, helperText: errors.passwordRequired})}
                />
                <div>
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.smMargin}
                    >
                        Sauvegarder
                    </Button>            
                </div>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => ({
    usersList: state.user.users
})

const mapActionToProps = {
    createUser: actions.create,
    updateUser: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserForm))