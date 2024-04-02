import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ExpenseService from "../../services/ExpenseService";
import { useEffect, useState } from "react";


export default function ExpenseoviPromjena(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [expense, setExpense] = useState({});

   async function getExpense(){
        const o = await ExpenseService.getById(routeParams.id);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setExpense(o.poruka);
   }

   async function promjeni(expense){
    const odgovor = await ExpenseService.put(routeParams.id,expense);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.EXPENSE_OVERVIEW);
}

   useEffect(()=>{
    getExpense();
   },[]);

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem expense');

        const podaci = new FormData(e.target);

        const expense = {
            date: 2024-5-20,
            value: parseFloat(podaci.get('expense_sum')),
            shared: podaci.get('expense_shared')=='on' ? true : false            
        };
        //console.log(routeParams.id);
        //console.log(expense);
        promjeni(expense);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                    
                    name="date" 
                    defaultValue={expense.date}
                    required />
                </Form.Group>

                

                <Form.Group controlId="expense_sum">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="text" name="expense_sum" defaultValue={expense.expense_sum} />
                </Form.Group>

                <Form.Group controlId="shared">
                    <Form.Check label="Shared" name="shared" defaultChecked={expense.shared   } />
                </Form.Group>

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.EXPENSE_OVERVIEW}>
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button className="siroko" variant="primary" type="submit">
                            Promjeni
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}