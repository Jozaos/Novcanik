import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import AccountService from '../../services/AccountService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {RoutesNames} from '../../constants'


export default function Accounts(){
    const [accounts, setAccounts] = useState();
    const navigate = useNavigate();


    async function getAccounts(){
        await AccountService.get()
        .then((odg)=>{
            setAccounts(odg.poruka);
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    useEffect(()=>{
        getAccounts();
    },[]);

    async function obrisiAsync(id){
        const odgovor = await AccountsService._delete(id);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        getAccounts();
    }

    function obrisi(id){
        obrisiAsync(id);
    }

    return(
        <>
           <Container>
            <Button>
                <Link to={RoutesNames.ACCOUNT_ADD} style={{textDecoration:'none', color:'black'}}> Add </Link>
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
                        {accounts && accounts.map((accounts,index)=>(
                            <tr key={index}>
                                <td>{accounts.username}</td>
                                <td>{accounts.owner_name}</td>
                                <td>{accounts.surname}</td>
                                <td>{accounts.id_num}</td>
                                <td>{accounts.balance}</td>
                                <td>
                                    <Button 
                                    onClick={()=>obrisi(accounts.id)}
                                    variant='danger'
                                    >
                                        Delete
                                    </Button>
                                    {' '}

                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/accounts/${accounts.id}`)}} 
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