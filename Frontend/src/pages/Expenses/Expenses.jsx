
import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import Service from "../../services/ExpenseService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Expenses(){
    const [expenses,setExpenses] = useState();
    const navigate = useNavigate();

    async function dohvatiSmjerove(){
        const odgovor = await Service.get('Expense');
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setExpenses(odgovor.podaci);
    }

    async function obrisiSmjer(id){
        const odgovor = await Service.obrisi('Expense',id);
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            dohvatiSmjerove();
        }
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiSmjerove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    function verificiran(expense){
        if (expense.verificiran==null) return 'gray';
        if(expense.verificiran) return 'green';
        return 'red';
    }

    function verificiranTitle(expense){
        if (expense.verificiran==null) return 'Nije definirano';
        if(expense.verificiran) return 'Verificiran';
        return 'NIJE verificiran';
    }

    return (

        <Container>
            <Link to={RoutesNames.EXPENSE_NEW} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
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
                            <td className="desno">{expense.expense_sum}
                            {expense.expense_sum==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={expense.expense_sum}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }</td>
                            <td className={expense.expense_shared==null ? 'sredina' : 'desno'}>
                                {expense.expense_shared==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={expense.expense_shared}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className="sredina">
                            <GrValidate 
                            size={30} 
                            color={verificiran(expense)}
                            title={verificiranTitle(expense)}
                            />
                            </td>
                            <td className="sredina">
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/expenses/${expense.id}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiSmjer(expense.id)}
                                >
                                    <FaTrash  
                                    size={25}
                                    />
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}