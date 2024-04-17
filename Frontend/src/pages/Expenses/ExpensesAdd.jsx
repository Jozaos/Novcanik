import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/ExpenseService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Action from "../../components/Action"

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
        addExpense({
            expense_date:"2024-05-25",
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