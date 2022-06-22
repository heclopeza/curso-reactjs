import {Navbar, Container,Nav,NavDropdown} from 'react-bootstrap'

const Header = ()=>{
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">BrandLink</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/books/all">Libros</Nav.Link>
                <Nav.Link href="/users/all">Usuarios</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
