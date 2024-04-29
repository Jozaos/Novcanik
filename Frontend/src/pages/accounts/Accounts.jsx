import { useEffect, useState } from "react";
import {  Button, Container, Table, Col, Card,Row } from "react-bootstrap";
import Service from "../../services/AccountService";
import { NumericFormat } from "react-number-format";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import riddler from "../../assets/riddler.png"


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

    function slika(polaznik){
        if(polaznik.slika!=null){
            return App.URL + polaznik.slika+ `?${Date.now()}`;
        }
        return riddler;
      }
    
    return (

        <Container>
            <Link to={RoutesNames.ACCOUNT_NEW} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Add
            </Link>
            <Table striped bordered hover responsive>
                
                <Row>
                    {accounts && accounts.map((account)=>(

                            <Col key={account.id} sm={12} lg={3} md={3} >
              <Card style={{ marginTop: '1rem', textAlign: 'center', display: '',  paddingTop: '1rem' }}>
              <Card.Img variant="top" src={slika(account)} className="slika"/>
                <Card.Body>
                  <Card.Title>{account.owner_name} {account.surname}</Card.Title>
                  <Card.Text>
                    {account.username}
                  </Card.Text>
                  <Card.Text>
                    ID Num: {account.id_num}
                  </Card.Text>
                  <Card.Text>
                  <NumericFormat 
                                    value={account.balance}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb siroko" to={`/account/${account.id}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb siroko"  onClick={() => deleteAccount(account.id)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>

                    ))}
                </Row>
            </Table>
        </Container>

    );

}