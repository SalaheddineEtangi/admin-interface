import React, {useRef, useState} from 'react'
import {Button, Card, Form, Alert} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

export function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const {login} = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setLoading(true)
            setError('')
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch{
            setError('Connexion échouée !')
        }

        setLoading(false)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Connexion</h2>
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
                            Connexion
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Vous êtes nouveau ? <Link to="/signup">Créer un compte</Link>
            </div>
        </>
    )
}
