import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ExpenseService from "../../services/ExpenseService";
import { useEffect, useState } from "react";


export default function ExpensesChange(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [expense, setExpense] = useState({});

   async function getExpenses(){
        const o = await ExpenseService.getById(routeParams.id);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setExpense(o.poruka);
   }

   async function change(expense){
    const odgovor = await ExpenseService.put(routeParams.id,expense);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.EXPENSE_OVERVIEW);
}

   useEffect(()=>{
    getExpenses();
   },[]);

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem smjer');

        const podaci = new FormData(e.target);

        const expense = {
            naziv: podaci.get('naziv'),  // 'naziv' je name atribut u Form.Control
            trajanje: parseInt(podaci.get('trajanje')), //na backend je int
            cijena: parseFloat(podaci.get('cijena')),
            verificiran: podaci.get('verificiran')=='on' ? true : false            
        };
        //console.log(routeParams.sifra);
        //console.log(smjer);
        change(expense);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="naziv" 
                    defaultValue={smjer.naziv}
                    required />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="trajanje"
                    defaultValue={smjer.trajanje}
                     />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="text" name="cijena" defaultValue={smjer.cijena} />
                </Form.Group>

                <Form.Group controlId="verificiran">
                    <Form.Check label="Verificiran" name="verificiran" defaultChecked={smjer.verificiran   } />
                </Form.Group>

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.SMJER_PREGLED}>
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