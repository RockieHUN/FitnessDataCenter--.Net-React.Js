import React, { useState}  from 'react';
import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


function NewClientComponent(show){

    const [showExtra, toggle] = useState(false);

    if (!show) return (<div></div>)
    else
    return(
        <Form>

             <Form.Group as={Row} controlId="name_input">
                <Form.Label column sm="2"> Name </Form.Label>
                <Col sm="10">
                    <Form.Control placeholder="Tony Stark" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="email_input">
                <Form.Label column sm="2"> Email </Form.Label>
                <Col sm="10">
                    <Form.Control placeholder="email@example.com" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="telephone_input">
                <Form.Label column sm="2"> Telephone </Form.Label>
                <Col sm="10">
                    <Form.Control placeholder="07401112345611" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="address_input">
                <Form.Label column sm="2"> Address </Form.Label>
                <Col sm="10">
                    <Form.Control placeholder="Tg. Mures, 234" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="cnp_input">
                <Form.Label column sm="2"> CNP </Form.Label>
                <Col sm="10">
                    <Form.Control placeholder="2938183740539" />
                </Col>
            </Form.Group>

            <Form.Check 
                onClick={ () => toggle(!showExtra)}
                type='checkbox'
                label='AddTicket'
            />

            <Button> Save </Button>
            
        </Form>
    )
}

export default NewClientComponent;