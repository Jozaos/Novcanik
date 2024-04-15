import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import AccountService from "../../services/AccountService";


export default function AccountAdd(){
    const navigate = useNavigate();

    async function dodaj(account){
        const odgovor = await AccountService.post(account);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.ACCOUNT_OVERVIEW);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem smjer');

        const podaci = new FormData(e.target);

        const account = {
            username:podaci.get('username'),
            owner_name:podaci.get('owner_name'),
            surname:podaci.get('surname'),
            id_num:podaci.get('id_num'),
            balance: parseFloat(podaci.get('balance')),         
        };

        //console.log(expense);
        dodaj(account);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" required />
                    
                </Form.Group>

                <Form.Group controlId="owner_name">
                <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="owner_name" />
                </Form.Group>

                <Form.Group controlId="surname">
                <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="surname" />
                </Form.Group>

                <Form.Group controlId="id_num">
                <Form.Label>ID Number</Form.Label>
                    <Form.Control type="text" name="id_num" />
                </Form.Group>


                <Form.Group controlId="balance">
                    <Form.Label>Balance</Form.Label>
                    <Form.Control type="decimal" name="balance" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.ACCOUNT_OVERVIEW}>
                            Cancel
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
                        <Button className="siroko" variant="primary" type="submit">
                            Add
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}