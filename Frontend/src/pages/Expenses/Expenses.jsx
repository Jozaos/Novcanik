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
            setExpenses(odg.poruka);
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
            <Button>
                <Link to={RoutesNames.EXPENSE_ADD} style={{textDecoration:'none', color:'black'}}> Add </Link>
            </Button>
            <p>

            </p>
            
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Value (€)</th>
                            <th>Shared (€)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses && expenses.map((expense,index)=>(
                            <tr key={index}>
                                <td>{expense.expense_date}</td>
                                <td>{expense.expense_sum}</td>
                                <td>{expense.expense_shared}</td>
                                <td>
                                    <Button 
                                    onClick={()=>obrisi(expense.id)}
                                    variant='danger'
                                    >
                                        Delete
                                    </Button>
                                    {' '}

                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/expenses/${expense.id}`)}} 
                                    >
                                        Change
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