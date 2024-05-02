import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import Service from "../../services/IncomeService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Incomes(){
    const [incomes,setIncomes] = useState();
    const navigate = useNavigate();
    async function getIncomes(){
        const odgovor = await Service.get('Income');
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setIncomes(odgovor.podaci);
    }

    async function deleteIncome(id){
        const odgovor = await Service.obrisi('Income',id);
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            getIncomes();
        }
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        getIncomes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    function verified(income){
        if (income.income_type==null) return 'gray';
        if(income.income_type) return 'green';
        return 'red';
    }

    function verifiedTitle(income){
        if (income.income_type==null) return 'Not defined';
        if(income.income_type) return 'Expected';
        return 'Not expected';
    }
    
    return (

        <Container>
            <Link to={RoutesNames.INCOME_NEW} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Add
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Expected income?</th>
                        <th>Value</th>
                        <th>Account</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {incomes && incomes.map((income,index)=>(
                        <tr key={index}>
                            
                            <td className="sredina">
                            <GrValidate 
                            size={30} 
                            color={verified(income)}
                            title={verifiedTitle(income)}
                            />
                            </td>
                                <td>
                                <NumericFormat 
                                    value={income.income_value}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                </td>

                                <td>{income.accountid}</td>

                                <td className="sredina">
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/income/${income.id}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>deleteIncome(income.id)}
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