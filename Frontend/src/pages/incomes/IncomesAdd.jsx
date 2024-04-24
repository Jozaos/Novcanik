import { Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/IncomeService";
import InputCheckbox from "../../components/InputCheckbox";
import Action from "../../components/Action"





export default function IncomesAdd(){
    const navigate = useNavigate();

    async function addIncome(income){
        const odgovor = await Service.dodaj('Income',income);
        if(odgovor.ok){
          navigate(RoutesNames.INCOME_OVERVIEW);
          return
        }
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
    }

    
    function handleSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);


        addIncome({
            income_type:podaci.get('verified')=='on' ? true: false,
            income_value: parseFloat(podaci.get('income_value')),
            accountid:podaci.get('accountid')           
        });
    }


    return (

        <Container>
           <Form onSubmit={handleSubmit}>
           <InputCheckbox atribut='verified' vrijednost={false} />

                <FormGroup controlId='income_value'>
                    <FormLabel>Value</FormLabel>
                    <FormControl type="text" name="income_value" />
                </FormGroup>

                <FormGroup controlId='accountid'>
                    <FormLabel>Account</FormLabel>
                    <FormControl type="text" name="accountid" />
                </FormGroup>

                <Action odustani={RoutesNames.INCOME_OVERVIEW} akcija='Add income' />
           </Form>
        </Container>

    );

}