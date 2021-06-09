import {useState} from 'react'
import {useToasts} from 'react-toast-notifications'

const useForm = (initialFieldValues, setCurrentId) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    //toast msg
    const {addToast} = useToasts()

    const handleInputChange = e => {
        const {name, value} = e.target
        const fieldValue = {[name]: value}
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const onSuccess = (action, correspondingAppearance) => () => addToast(action + ' avec succès', {appearance: correspondingAppearance})

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }

    const validate = (fieldValues = values) => {
        let temp = {}
        if('email' in fieldValues){
            temp.emailRequired = fieldValues.email ? '' : 'Veuillez entrer un e-mail.'
            temp.emailFormat = (/^$|.+@.+..+/).test(fieldValues.email) ? '' : 'Veuillez entrer un e-mail valide.'
        }
        if('password' in fieldValues){
            temp.passwordRequired = fieldValues.password ? '' : 'Veuillez entrer un mot de passe.'
        }
        setErrors({
            ...temp
        })

        if(fieldValues === values){
            return Object.values(temp).every(x => x === '')
        }
    }

    return{
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors, 
        validate,
        resetForm,
        onSuccess
    }
}

export default useForm