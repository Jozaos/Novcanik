import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import IncomeService from '../../services/IncomeService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {RoutesNames} from '../../constants'


export default function Incomes(){
    const [incomes, setIncomes] = useState();
    const navigate = useNavigate();


    async function getIncomes(){
        await AccountService.get()
        .then((odg)=>{
            setIncomes(odg.poruka);
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    useEffect(()=>{
        getIncomes();
    },[]);

    async function obrisiAsync(id){
        const odgovor = await IncomesService._delete(id);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        getIncomes();
    }

    function obrisi(id){
        obrisiAsync(id);
    }

    return(
        <>
           <Container>
            <Button>
                <Link to={RoutesNames.INCOME_ADD} style={{textDecoration:'none', color:'black'}}> Add </Link>
            </Button>
            <p>

            </p>
            
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>ID Number</th>
                            <th>Balance (€)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes && incomes.map((incomes,index)=>(
                            <tr key={index}>
                                <td>{incomes.username}</td>
                                <td>{incomes.owner_name}</td>
                                <td>{incomes.surname}</td>
                                <td>{incomes.id_num}</td>
                                <td>{incomes.balance}</td>
                                <td>
                                    <Button 
                                    onClick={()=>obrisi(incomes.id)}
                                    variant='danger'
                                    >
                                        Delete
                                    </Button>
                                    {' '}

                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/incomes/${incomes.id}`)}} 
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