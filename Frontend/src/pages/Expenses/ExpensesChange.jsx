import { useEffect, useState } from "react";
import {  Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/ExpenseService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Action from "../../components/Action";
import moment from "moment";

export default function ExpensesChange(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [expense,setExpense] = useState({});

    async function getExpense(){
        const odgovor = await Service.getBySifra('Expense',routeParams.id)
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            navigate(RoutesNames.EXPENSE_OVERVIEW);
            return;
        }
        odgovor.podaci.expense_date = moment.utc(odgovor.podaci.expense_date).format('yyyy-MM-DD')
        setExpense(odgovor.podaci);
    }

    useEffect(()=>{
        getExpense();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function changeExpense(expense){
        const odgovor = await Service.promjeni('Expense',routeParams.id,expense);
        if(odgovor.ok){
          navigate(RoutesNames.EXPENSE_OVERVIEW);
          return;
        }
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    }

    
    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        changeExpense({
            expense_date: podaci.get('expense_date'),
            expense_sum: parseFloat(podaci.get('expense_sum')),
            expense_shared: podaci.get('expense_shared') 
        });
    }

    // const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));

    return (
        <Container>
           <Form onSubmit={handleSubmit}>
                <Form.Group controlId="expense_date">
                    <Form.Label>Expense date</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="expense_date"
                    defaultValue={expense.expense_date}
                    />
                </Form.Group> 

                <FormGroup controlId='expense_sum'>
                    <FormLabel>Expense sum (use decimal point '.')</FormLabel>
                    <FormControl type="text" value={expense.expenses_sum} name="expense_sum" />
                </FormGroup>

                <FormGroup controlId='expense_shared'>
                    <FormLabel>Expense shared (use decimal point '.')</FormLabel>
                    <FormControl type="text" value={expense.expenses_shared} name="expense_shared" />
                </FormGroup>


                    <Action odustani={RoutesNames.EXPENSE_OVERVIEW} akcija='Change expense' />
             </Form>
             </Container>
    );

}