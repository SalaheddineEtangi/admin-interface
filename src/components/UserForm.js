import React, {useEffect} from 'react'
import {Grid, TextField, Button, withStyles} from '@material-ui/core'
import useForm from './useForm'
import {connect} from 'react-redux'
import * as actions from '../actions/user' 
import {useToasts} from 'react-toast-notifications'

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

    //toast msg
    const {addToast} = useToasts()

    const {
        values,
        setValues,
        handleInputChange,
        errors, 
        setErrors,
        validate,
        resetForm
    } = useForm(initialFieldValues, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            const onSuccess = () => addToast('Modifié avec succès', {appearance: 'success'})
            if(props.currentId === 0){
                props.createUser(props.usersList, values, () => window.alert('ajouté !'))
            }
            else{
                props.updateUser(props.currentId, props.usersList, values, onSuccess)
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
        <div className={classes.smMargin}>Ajouter un utilisateur</div>
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