import { useEffect, useState } from "react";
import {  Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/AccountService";
import { RoutesNames } from "../../constants";
import riddler from "../../assets/riddler.png"
import Action from "../../components/Action";

export default function AccountsChange(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [account,setAccount] = useState({});

    async function getAccount(){
        const odgovor = await Service.getBySifra('Account',routeParams.id)
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            navigate(RoutesNames.ACCOUNT_OVERVIEW);
            return;
        }
        setAccount(odgovor.podaci);

        setAccount(odgovor.podaci);
    //Date.now je zbog toga što se src na image komponenti cache-ira
    //pa kad promjenimo sliku url ostane isti i trenutna slika se ne updatea
    if(odgovor.podaci.slika!=null){
      setTrenutnaSlika(App.URL + odgovor.podaci.slika + `?${Date.now()}`);
    }else{
      setTrenutnaSlika(riddler);
    }
    }

    useEffect(()=>{
        getAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function changeAccount(account){
        const odgovor = await Service.promjeni('Account',routeParams.id,account);
        if(odgovor.ok){
          navigate(RoutesNames.ACCOUNT_OVERVIEW);
          return;
        }
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    }

    
    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        changeAccount({
            username:podaci.get('username'),
            owner_name:podaci.get('owner_name'),
            surname:podaci.get('surname'),
            id_num:podaci.get('id_num'), 
            balance: parseFloat(podaci.get('balance')),
            slika:''
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
                        defaultValue={account.username}
                    />
                </FormGroup>

                <FormGroup controlId='owner_name'>
                    <FormLabel>First name</FormLabel>
                    <FormControl type="text" defaultValue={account.owner_name} name="owner_name" />
                </FormGroup>

                <FormGroup controlId='surname'>
                    <FormLabel>Last name</FormLabel>
                    <FormControl type="text" defaultValue={account.surname} name="surname" />
                </FormGroup>

                <FormGroup controlId='id_num'>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl type="text" defaultValue={account.id_num} name="id_num" />
                </FormGroup>

                <FormGroup controlId='balance'>
                    <FormLabel>Balance (use decimal point '.')</FormLabel>
                    <FormControl type="text" defaultValue={account.balance} name="balance" />
                </FormGroup>


                    <Action odustani={RoutesNames.ACCOUNT_OVERVIEW} akcija='Change account' />
             </Form>
             </Container>
    );

}