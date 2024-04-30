import { useEffect, useState } from "react";
import {  Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/IncomeService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Action from "../../components/Action";
import moment from "moment";

export default function IncomesChange(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [income,setIncome] = useState({});

    async function getIncome(){
        const odgovor = await Service.getBySifra('Income',routeParams.id)
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            navigate(RoutesNames.INCOME_OVERVIEW);
            return;
        }
    }

    useEffect(()=>{
        getIncome();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function changeIncome(income){
        const odgovor = await Service.promjeni('Income',routeParams.id,income);
        if(odgovor.ok){
          navigate(RoutesNames.INCOME_OVERVIEW);
          return;
        }
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    }

    
    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        changeIncome({
            income_type:podaci.get('verified')=='on' ? true: false,
            income_value: parseFloat(podaci.get('income_value')),
            accountid:podaci.get('accountid')  
        });
    }

    // const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));

    return (
        <Container>
        <Form onSubmit={handleSubmit}>
        <InputCheckbox atribut='verified' vrijednost={false} />

             <FormGroup controlId='income_value'>
                 <FormLabel>Value (use decimal point '.')</FormLabel>
                 <FormControl type="text" name="income_value" />
             </FormGroup>

             <FormGroup controlId='accountid'>
                 <FormLabel>Account</FormLabel>
                 <FormControl type="text" name="accountid" />
             </FormGroup>

             <Action odustani={RoutesNames.INCOME_OVERVIEW} akcija='Change income' />
        </Form>
     </Container>
    );

}