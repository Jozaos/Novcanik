import { Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useState } from "react";
import Service from "../../services/ExpenseService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Action from "../../components/Action"
import moment from 'moment'




export default function ExpensesAdd(){
    const navigate = useNavigate();

    async function addExpense(expense){
        const odgovor = await Service.dodaj('Expense',expense);
        if(odgovor.ok){
          navigate(RoutesNames.EXPENSE_OVERVIEW);
          return
        }
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    }

    
    function handleSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        let expense_date=null;

        if(podaci.get('expense_date')!=''){
            expense_date = moment.utc(podaci.get('expense_date'));
        }else{
            expense_date=null;
        }


        addExpense({
            expense_date:expense_date,
            expense_sum: parseFloat(podaci.get('expense_sum')),
            expense_shared: podaci.get('expense_shared')           
        });
    }
    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
    return (

        <Container>
           <Form onSubmit={handleSubmit}>
                <FormGroup controlId="expense_date">
                    <FormLabel>Expense date</FormLabel>
                    <Form.Control
                        type="date"
                        name="expense_date"
                        value={startDate}
                        onChange={(date) => setStartDate(date.target.value)}
                    />
                </FormGroup>

                <FormGroup controlId='expense_sum'>
                    <FormLabel>Expense sum (use decimal point '.')</FormLabel>
                    <FormControl type="text" name="expense_sum" />
                </FormGroup>

                <FormGroup controlId='expense_shared'>
                    <FormLabel>Expense shared (use decimal point '.')</FormLabel>
                    <FormControl type="text" name="expense_shared" />
                </FormGroup>

                <Action odustani={RoutesNames.EXPENSE_OVERVIEW} akcija='Add expense' />
           </Form>
        </Container>

    );

}