import React, {useState}  from 'react';
import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

function SearchComponent(){

    const [searched, setSearched] = useState(false);
    const [searchResultClient, setSearchResultClient] = useState({});
    const [searchResultTickets, setSearchResultTickets] = useState([]);

    let searchterm = 0;

    let output;
    if (searched){
        output = showResults();
    }

    async function searchClient(){
        let response = await fetch('https://localhost:44312/api/Client/SearchClient/'+searchterm,{
                    method: 'GET'
                });

        if (response.ok){
            let data = await response.json()
            setSearchResultClient(data);
            setSearched(true);

            response = await fetch('https://localhost:44312/api/Ticket/ListClientTickets/'+data.id,{
                method: 'GET'
            });

            if (response.ok){
                setSearchResultTickets( await response.json());
            }
        }
        else{
            setSearched(false);
        }  

        
        
    }

    function showResults(){
        return(
        <div>
            <Form>
                <Form.Group as={Row} controlId = "name">
                    <Form.Label column sm="2"> Name: </Form.Label>
                    <Col sm="5">
                        <Form.Control readOnly
                         value={searchResultClient.name}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "email">
                    <Form.Label column sm="2"> Email: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResultClient.email}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "telephone">
                    <Form.Label column sm="2"> Telephone: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResultClient.telephone}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "address">
                    <Form.Label column sm="2"> Address: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResultClient.address}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "cnp">
                    <Form.Label column sm="2"> CNP: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResultClient.cnp}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "barcode">
                    <Form.Label column sm="2"> Barcode: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResultClient.barCode}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "registration_date">
                    <Form.Label column sm="2"> Registration Date: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResultClient.registrationDate}/>
                    </Col> 
                </Form.Group>
            </Form>

            <h2>Tickets</h2>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Price</th>
                        <th>Valid Days</th>
                        <th>Max Usages</th>
                        <th>Uses per Day</th>
                        <th>Used Counter</th>
                        <th>Purchase Date</th>
                        <th>Valid Until</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {searchResultTickets.map(ticket =>
                    <tr key={ticket.id}>
                        <td>{ticket.roomName}</td>
                        <td>{ticket.price}</td>
                        <td>{ticket.validDays}</td>
                        <td>{ticket.maxUsages}</td>
                        <td>{ticket.usesPerDay}</td>
                        <td>{ticket.usedCounter}</td>
                        <td>{ticket.purchaseDate}</td>
                        <td>{ticket.validUntil}</td>
                        <td><Button id = {ticket.id}> USE </Button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        )  
    }

    return(
        <div>
            <Form>
                <Form.Group as={Row} controlId="searchTerm_input">
                    <Form.Label column sm="1"> Search </Form.Label>
                    <Col >
                        <Form.Control placeholder="Barcode"
                        type = "number"
                        onChange={ (event) =>{
                            searchterm = event.target.value
                        }}
                        />
                    </Col>
                    <Col >
                        <Button onClick={searchClient}> Search </Button>
                    </Col>
                </Form.Group>
            </Form>
            {output}
        </div>
        
    )
}



export default SearchComponent;