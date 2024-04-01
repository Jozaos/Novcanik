import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ExpenseService from "../../services/ExpenseService";


export default function ExpensesAdd(){
    const navigate = useNavigate();

    async function add(expense){
        const odgovor = await ExpenseService.post(expense);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.EXPENSE_OVERVIEW);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem smjer');

        const podaci = new FormData(e.target);

        const expense = {
            
            date: date(podaci.get('date')), //na backend je int
            value: parseFloat(podaci.get('value')),
            shared: podaci.get('shared')=='on' ? true : false            
        };

        //console.log(smjer);
        dodaj(expense);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" />
                </Form.Group>

                <Form.Group controlId="value">
                    <Form.Label>Value</Form.Label>
                    <Form.Control type="number.m" name="value" />
                </Form.Group>

                <Form.Group controlId="shared">
                    <Form.Check label="Shared" name="shared" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.SMJER_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
                        <Button className="siroko" variant="primary" type="submit">
                            Dodaj
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}