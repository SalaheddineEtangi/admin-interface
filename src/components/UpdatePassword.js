import React, {useRef, useState} from 'react'
import {Button, Card, Form, Alert} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

export function UpdatePassword() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const {currentUser, updatePassword, updateEmail} = useAuth()

    function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('La confirmation de mot de passe est différente de celle préalablement saisie.')
        }

        const promises = []
        setLoading(true)
        setError('')

        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError(`L'adresse e-mail n'est pas reconnue ou a été archivée. Nous vous invitons à vérifier l'orthographe ou à créer un compte`)
        }).finally(() => {
            setLoading(false)
        })
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Réinitialiser mot de passe</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mt-3">
                                <Form.Control 
                                    type="email"
                                    placeholder={currentUser.email}
                                    ref={emailRef}
                                    required
                                >
                                </Form.Control>
                        </Form.Group>
                        <Form.Group id="password" className="mt-3">
                            <Form.Control 
                                type="password"
                                placeholder="Nouveau mot de passe"
                                ref={passwordRef}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mt-3">
                            <Form.Control 
                                type="password"
                                placeholder="Confirmer le nouveau mot de passe"
                                ref={passwordConfirmRef}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">
                            Réinitialiser mot de passe
                        </Button>
                        <Link to='/'>
                            <Button className="w-100 mt-3">
                                Quitter
                            </Button>
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}