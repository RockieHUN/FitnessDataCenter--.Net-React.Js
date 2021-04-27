import React, {useState, useEffect}  from 'react';
import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

function SearchComponent(props){

    const [searched, setSearched] = useState(false);
    const [searchResultClient, setSearchResultClient] = useState({});
    const [searchResultTickets, setSearchResultTickets] = useState([]);
    const [ticketTypes, setTicketTypes] = useState([]);

    useEffect( () =>{
        requestTicketTypes();
    },[]);

    let searchterm = 0;
    let newTicketTypeId = 0;

    let output;
    if (searched){
        output = showResults();
    }

    async function requestTicketTypes(){
        const response = await fetch('https://localhost:44312/api/Ticket/ListTicketTypes');
            if(response.ok) {
                let data = await response.json();
                setTicketTypes(data);
            }
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

    async function addNewTicket(){
        let response = await fetch('https://localhost:44312/api/Ticket/RegisterTicket/'+searchResultClient.id+"/"+newTicketTypeId,{
                    method: 'GET'
                });
        if (!response.ok) alert("Failed to add ticket!");
        else{
            alert("Ticket added succesfully!");
            requestTicketTypes();
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
            <Form>
                <Form.Group as={Row} controlId = "newTicket_input">
                    <Form.Label column sm="2"> Add new ticket: </Form.Label>
                    <Col sm="5">
                    <Form.Control as="select"
                        onChange = { event =>{
                            newTicketTypeId = event.target.options[event.target.selectedIndex].id;
                        }}
                        >
                        <option></option>
                        {ticketTypes.map(ticketType =>
                            <option key={ticketType.id} id={ticketType.id}> {ticketType.ticketName} </option>
                        )}
                    </Form.Control>
                    </Col>
                    <Button onClick={addNewTicket}> Add ticket</Button>
                </Form.Group>
            </Form>
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