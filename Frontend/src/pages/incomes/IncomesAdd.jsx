import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import IncomeService from "../../services/IncomeService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";

export default function IncomesAdd(){
    const navigate = useNavigate();

    async function dodajIncome(income){
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
        dodajIncome({
            accountid: parseFloat(podaci.get('accountid')),
            income_type: podaci.get('income_type')=='on' ? true: false,
            income_value:parseFloat(podaci.get('income_value'))
        });
    }

    return (

        <Container>
           <Form onSubmit={handleSubmit}>
                <InputText atribut='trajanje' vrijednost='' />
                <InputCheckbox atribut='verificiran' vrijednost={false} />
                <Akcije odustani={RoutesNames.INCOME_OVERVIEW} akcija='Dodaj income' />
           </Form>
        </Container>

    );

}