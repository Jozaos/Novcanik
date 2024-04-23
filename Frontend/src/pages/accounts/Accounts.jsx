import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import Service from "../../services/AccountService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import moment from "moment";


export default function Accounts(){
    const [accounts,setAccounts] = useState();
    const navigate = useNavigate();
    async function getAccounts(){
        const odgovor = await Service.get('Account');
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setAccounts(odgovor.podaci);
    }

    async function deleteAccount(id){
        const odgovor = await Service.obrisi('Account',id);
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            getAccounts();
        }
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        getAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (

        <Container>
            <Link to={RoutesNames.ACCOUNT_NEW} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Add
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>ID Number</th>
                        <th>Balance</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts && accounts.map((account,index)=>(
                        <tr key={index}>

                                <td>{account.username}</td>

                                <td>{account.owner_name}</td>

                                <td>{account.surname}</td>

                                <td>{account.id_num}</td>

                                <td>
                                <NumericFormat 
                                    value={account.balance}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                </td>

                            <td className="sredina">
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/account/${account.id}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>deleteAccount(account.id)}
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