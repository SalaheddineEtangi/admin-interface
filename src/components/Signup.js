import React, {useRef, useState} from 'react'
import {Button, Card, Form, Alert} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

export function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const {signup} = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('La confirmation de mot de passe est différente de celle préalablement saisie.')
        }

        try{
            setLoading(true)
            setError('')
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/login")
        }
        catch{
            setError('Création du compte échouée !')
        }

        setLoading(false)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Créer un compte</h2>
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
                        <Form.Group id="password-confirm" className="mt-3">
                            <Form.Control 
                                type="password"
                                placeholder="Confirmer mot de passe"
                                ref={passwordConfirmRef}
                                required>
                            </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">
                            Créer un compte
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
            </div>
        </>
    )
}
