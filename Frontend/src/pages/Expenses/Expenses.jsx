import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ExpenseService from '../../services/ExpenseService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {RoutesNames} from '../../constants'


export default function Expenses(){
    const [expenses, setExpenses] = useState();
    const navigate = useNavigate();


    async function getExpenses(){
        await ExpenseService.get()
        .then((odg)=>{
            setExpenses(odg);
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    useEffect(()=>{
        getExpenses();
    },[]);

    async function obrisiAsync(id){
        const odgovor = await ExpenseService._delete(id);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        getExpenses();
    }

    function obrisi(id){
        obrisiAsync(id);
    }

    return(
        <>
           <Container>
            <Link to={RoutesNames.EXPENSE_ADD}> Add </Link>
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Value</th>
                            <th>Shared</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses && ((expense,index)=>(
                            <tr key={index}>
                                <td>{expense.date}</td>
                                <td>{expense.value}</td>
                                <td>
                                    <Button 
                                    onClick={()=>obrisi(expense.id)}
                                    variant='danger'
                                    >
                                        Obriši
                                    </Button>
                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/expenses/${expense.id}`)}} 
                                    >
                                        Promjeni
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </Table>
           </Container>
        </>
    );
}