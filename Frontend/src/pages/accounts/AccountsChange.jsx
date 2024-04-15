import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import AccountService from "../../services/AccountService";
import { useEffect, useState } from "react";


export default function AccountsChange(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [account, setAccount] = useState({});

   async function getAccount(){
        const o = await AccountService.getById(routeParams.id);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setAccount(o.poruka);
   }

   async function promjeni(account){
    const odgovor = await AccountService.put(routeParams.id,account);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.ACCOUNT_OVERVIEW);
}

   useEffect(()=>{
    getAccount();
   },[]);

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem expense');

        const podaci = new FormData(e.target);

        const account = {
            username:podaci.get('username'),
            owner_name:podaci.get('owner_name'),
            surname:podaci.get('surname'),
            id_num:podaci.get('id_num'),
            balance: parseFloat(podaci.get('balance')),             
        };
        //console.log(routeParams.id);
        //console.log(expense);
        promjeni(account);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    
                    name="username" 
                    defaultValue={account.username}
                    required />
                </Form.Group>

                <Form.Group controlId="owner_name">
                    <Form.Label>First name</Form.Label>
                    <Form.Control 
                    
                    name="owner_name" 
                    defaultValue={account.owner_name}
                    required />
                </Form.Group>

                <Form.Group controlId="surname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control 
                    
                    name="surname" 
                    defaultValue={account.surname}
                    required />
                </Form.Group>

                <Form.Group controlId="id_num">
                    <Form.Label>ID Number</Form.Label>
                    <Form.Control 
                    
                    name="id_num" 
                    defaultValue={account.id_num}
                    required />
                </Form.Group>

                <Form.Group controlId="balance">
                    <Form.Label>Balance</Form.Label>
                    <Form.Control type="text" name="balance" defaultValue={account.balance} />
                </Form.Group>

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.EXPENSE_OVERVIEW}>
                            Cancel
                        </Link>
                    </Col>
                    <Col>
                        <Button className="siroko" variant="primary" type="submit">
                            Change
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}