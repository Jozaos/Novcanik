import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/ExpenseService";
import InputText from "../../components/InputText";
import Action from "../../components/Action"
import moment from "moment";


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
            expense_sum: parseFloat(podaci.get('expense_sum')),
            expense_shared: podaci.get('expense_shared')  
        });
      }
    

    return (

        <Container>
           <Form onSubmit={handleSubmit}>
                <InputText atribut='expense_date' vrijednost='' />
                <InputText atribut='expense_sum' vrijednost='' />
                <InputText atribut='expense_shared' vrijednost='' />
                <Action odustani={RoutesNames.EXPENSE_OVERVIEW} akcija='Add expense' />
           </Form>
        </Container>

    );
    }
