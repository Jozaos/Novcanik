import { Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useState } from "react";
import Service from "../../services/ExpenseService";
import InputText from "../../components/InputText";
import Action from "../../components/Action"
<<<<<<< HEAD
import moment from "moment";
=======
import moment from 'moment'


>>>>>>> Tu-je-radilo


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

<<<<<<< HEAD

    function handleSubmit(e) {
        e.preventDefault();
    
        const podaci = new FormData(e.target);
    
        if (podaci.get("expense_date") == "" && podaci.get("vrijeme") != "") {
          alert("Date is required");
          return;
        }
        let expense_date = null;
        if (podaci.get("expense_date") != "") {
          if (podaci.get("vrijeme") != "") {
            expense_date = moment.utc(podaci.get("expense_date") + " " + podaci.get("vrijeme"));
          } else {
            expense_date = moment.utc(podaci.get("expense_date"));
          }
        }
        addExpense({
            expense_date:podaci.get("expense_date"),
=======
    
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
>>>>>>> Tu-je-radilo
            expense_sum: parseFloat(podaci.get('expense_sum')),
            expense_shared: podaci.get('expense_shared')  
        });
<<<<<<< HEAD
      }
    

=======
    }
    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
>>>>>>> Tu-je-radilo
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
                    <FormLabel>Expense sum</FormLabel>
                    <FormControl type="text" name="expense_sum" />
                </FormGroup>

                <FormGroup controlId='expense_shared'>
                    <FormLabel>Expense shared</FormLabel>
                    <FormControl type="text" name="expense_shared" />
                </FormGroup>

                <Action odustani={RoutesNames.EXPENSE_OVERVIEW} akcija='Add expense' />
           </Form>
        </Container>

    );
    }
