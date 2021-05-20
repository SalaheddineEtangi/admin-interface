import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Container
} from 'reactstrap';

const Heading = () => {
    return(
        <Navbar color="dark" dark>
            <Container>
                <NavbarBrand href="/">Liste des utilisateurs</NavbarBrand>
            </Container>
        </Navbar> 
    )
};

export default Heading;