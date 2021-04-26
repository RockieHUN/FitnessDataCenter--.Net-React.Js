import React, {useState}  from 'react';
import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

function SearchComponent(){

    const [searched, setSearched] = useState(false);
    const [searchResult, setSearchResult] = useState({});
    let searchterm = 0;

    let output;
    if (searched){
        output = showResults();
    }

    async function searchClient(){
        const response = await fetch('https://localhost:44312/api/Client/SearchClient/'+searchterm,{
                    method: 'GET'
                });

        if (response.ok){
            let data = await response.json()
            setSearchResult(data);
            setSearched(true);
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
                         value={searchResult.name}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "email">
                    <Form.Label column sm="2"> Email: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResult.email}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "telephone">
                    <Form.Label column sm="2"> Telephone: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResult.telephone}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "address">
                    <Form.Label column sm="2"> Address: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResult.address}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "cnp">
                    <Form.Label column sm="2"> CNP: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResult.cnp}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "barcode">
                    <Form.Label column sm="2"> Barcode: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResult.barCode}/>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} controlId = "registration_date">
                    <Form.Label column sm="2"> Registration Date: </Form.Label>
                    <Col sm="5">
                        <Form.Control  readOnly
                        value={searchResult.registrationDate}/>
                    </Col> 
                </Form.Group>
            </Form>
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