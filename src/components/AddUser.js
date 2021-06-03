import React, {useRef, useState} from 'react'
import {Button, Card, Form, Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {API_URL} from '../config.js'

const AddUser = (props) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const axios = require('axios').default

    function getAllUsers() {
        var users
        fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then(json => users = json.items)
        return users
    }

    function incrementId(users){
        if(users.length === 0){
            return 0
        }
        else{
            const lastUser = users[users.length - 1]
            return lastUser.id + 1
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setLoading(true)
            setError('')
            axios({
                method: 'post',
                url: `${API_URL}/users/register`,
                data: {
                    id: incrementId(getAllUsers()),
                    email: emailRef,
                    password: passwordRef
                }
              }).then(response => console.log(response))
            history.push("/")
        }
        catch{
            setError()
        }

        setLoading(false)
    }
    
    return(
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Ajouter un utilisateur</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mt-3">
                            <Form.Control 
                                type="email"
                                placeholder="Email"
                                ref={emailRef}
                                required>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group id="password" className="mt-3">
                        <Form.Control 
                            type="password"
                            placeholder="Mot de passe"
                            ref={passwordRef}
                            required>
                        </Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        Ajouter
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default connect()(AddUser)