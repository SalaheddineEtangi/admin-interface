import React, {useState} from 'react';
import {Navbar, NavbarBrand, Container, Button} from 'reactstrap';
import {Alert} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const Heading = () => {
    const {currentUser, logout} = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()

    async function handleLogOut() {   
        setError('') 

        try{
            await logout()
            history.push('/login')
        }
        catch{
            setError('Déconnexion échouée')
        }
    }

    return(
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand href="/">Liste des utilisateurs</NavbarBrand>
                    <strong>{currentUser.email}</strong>
                    <Link to="/add-user">
                        <button type="button" className="float-end btn btn-primary">Ajouter un utilisateur</button>
                    </Link>
                    <Button className="float-end btn btn-danger" onClick={() => handleLogOut()}>Déconnexion</Button>
                </Container>
            </Navbar> 
        </>
    )
};

export default Heading;