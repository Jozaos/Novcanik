import { Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useState } from "react";
import Service from "../../services/AccountService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Action from "../../components/Action"




export default function AccountsAdd(){
    const navigate = useNavigate();

    async function addAccount(account){
        const odgovor = await Service.dodaj('Account',account);
        if(odgovor.ok){
          navigate(RoutesNames.ACCOUNT_OVERVIEW);
          return
        }
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    }

    
    function handleSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);


        addAccount({
            username:podaci.get('username'),
            owner_name:podaci.get('owner_name'),
            surname:podaci.get('surname'),
            id_num:podaci.get('id_num'), 
            balance: parseFloat(podaci.get('balance'))         
        });
    }

    return (

        <Container>
           <Form onSubmit={handleSubmit}>
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <Form.Control
                        type="text"
                        name="username"
                    />
                </FormGroup>

                <FormGroup controlId='owner_name'>
                    <FormLabel>First name</FormLabel>
                    <FormControl type="text" name="owner_name" />
                </FormGroup>

                <FormGroup controlId='surname'>
                    <FormLabel>Last name</FormLabel>
                    <FormControl type="text" name="surname" />
                </FormGroup>

                <FormGroup controlId='id_num'>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl type="text" name="id_num" />
                </FormGroup>

                <FormGroup controlId='balance'>
                    <FormLabel>Balance</FormLabel>
                    <FormControl type="text" name="balance" />
                </FormGroup>

                <Action odustani={RoutesNames.ACCOUNT_OVERVIEW} akcija='Add account' />
           </Form>
        </Container>

    );

}