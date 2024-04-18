import { useEffect, useState } from "react";
import {  Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/ExpenseService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Action from "../../components/Action";


export default function ExpensesChange(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [expense,setExpense] = useState({});

    async function getExpense(){
        const odgovor = await Service.getBySifra('Expense',routeParams.sifra)
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            navigate(RoutesNames.EXPENSE_OVERVIEW);
            return;
        }
        setExpense(odgovor.podaci);
    }

    useEffect(()=>{
        getExpense();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function changeExpense(expense){
        const odgovor = await Service.promjeni('Expense',routeParams.sifra,expense);
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
            expense_date: "2024-05-25",
            expense_sum: parseFloat(podaci.get('expense_sum')),
            expense_shared: podaci.get('expense_shared') 
        });
    }



    return (
        <Container>
           <Form onSubmit={handleSubmit}>
                    <InputText atribut='expense_date' vrijednost={expense.expense_date} />
                    <InputText atribut='expense_sum' vrijednost={expense.expense_sum} />
                    <InputText atribut='expense_shared' vrijednost={expense.expense_shared} />
                    <Action odustani={RoutesNames.EXPENSE_OVERVIEW} akcija='Change expense' />
             </Form>
             </Container>
    );

}