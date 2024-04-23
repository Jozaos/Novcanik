import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';


export default function NavBar(){

    const navigate = useNavigate();

    return(
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className='navbar'
                onClick={()=>navigate(RoutesNames.HOME)}
                >W A L L E T</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto" >
                    <Nav.Link 
                    href="https://wallet.runasp.net/swagger/index.html"
                    target='_blank'>API</Nav.Link>
                    
                    <NavDropdown title="Menu" id="collapsible-nav-dropdown" className='menu'>

                    <NavDropdown.Item 
                    onClick={()=>navigate(RoutesNames.ACCOUNT_OVERVIEW)}
                    >Accounts</NavDropdown.Item>

                    <NavDropdown.Item 
                    onClick={()=>navigate(RoutesNames.EXPENSE_OVERVIEW)}
                    >Expenses</NavDropdown.Item>
                    
                    <NavDropdown.Item 
                    onClick={()=>navigate(RoutesNames.INCOME_OVERVIEW)}
                    >Income</NavDropdown.Item>
                      
                    </NavDropdown>
                </Nav>
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}