import React, {useRef, useState} from 'react'
import {Button, Card, Form, Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

export function ForgotPassword() {
    const emailRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const {resetPassword} = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setMessage('')
            setLoading(true)
            setError('')
            await resetPassword(emailRef.current.value)
            setMessage(`Nous venons d'envoyer un mail à l'adresse ${emailRef.current.value}`)
        }
        catch{
            setError(`L'adresse e-mail n'est pas reconnue ou a été archivée. Nous vous invitons à vérifier l'orthographe ou à créer un compte.`)
        }

        setLoading(false)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Modifer mot de passe</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form className="mb-4" onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mt-3">
                                <Form.Control 
                                    type="email"
                                    placeholder="Email"
                                    ref={emailRef}
                                    required>
                                </Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">
                            Modifier mot de passe
                        </Button>
                    </Form>
                    <div className="text-center"><Link to="/login">Retour à la connexion</Link></div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Vous êtes nouveau ? <Link to="/signup">Créer un compte</Link>
            </div>
        </>
    )
}