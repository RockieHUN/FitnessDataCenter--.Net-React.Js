import React, { useEffect, useState}  from 'react';
import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';




function NewClientComponent(props){

    const [showExtra, toggle] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(false);
    
    let formInfo = {
        client :{
            Name: "",
            Email: "",
            Telephone: "",
            Address:"",
            CNP:""
        },
        ticket : {
            ValidDays: 0,
            MaxUsages : 0,
            UsesPerDay: 0,
            RoomId : 0
        }
    };

    
    useEffect( () =>{
        console.log("request");

        requestRooms();

        async function requestRooms(){
            const response = await fetch('https://localhost:44312/api/Room/ListRooms');
                if(!response.ok) setError(true);
                else{
                    let data = await response.json();
                    setRooms(data);
                }
          }
    },[]);


    function saveFormInfo(){
        console.log(formInfo);
    }
    
    

    let exFileds;
    if (showExtra) exFileds = extraFields(rooms);

    if (!props.show) return (<div></div>)
    else
    return(
        <div>
            <Form>

            <Form.Group as={Row} controlId="name_input">
            <Form.Label column sm="2"> Name </Form.Label>
            <Col sm="10">
                <Form.Control placeholder="Tony Stark"
                 onChange = { event =>{
                    formInfo.client.Name = event.target.value
                 }} 
                 />
            </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="email_input">
            <Form.Label column sm="2"> Email </Form.Label>
            <Col sm="10">
                <Form.Control type='email' placeholder="email@example.com" 
                onChange = { event =>{
                    formInfo.client.Email = event.target.value
                 }}
                 />
            </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="telephone_input">
            <Form.Label column sm="2"> Telephone </Form.Label>
            <Col sm="10">
                <Form.Control placeholder="07401112345611" 
                onChange = { event =>{
                    formInfo.client.Telephone = event.target.value
                 }}
                 />
            </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="address_input">
            <Form.Label column sm="2"> Address </Form.Label>
            <Col sm="10">
                <Form.Control placeholder="Tg. Mures, 234" 
                onChange = { event =>{
                    formInfo.client.Address = event.target.value
                 }}
                 />
            </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="cnp_input">
            <Form.Label column sm="2"> CNP </Form.Label>
            <Col sm="10">
                <Form.Control placeholder="2938183740539"
                onChange = { event =>{
                    formInfo.client.CNP = event.target.value
                 }}
                  />
            </Col>
            </Form.Group>

            <Form.Check 
            onClick={ () => toggle(!showExtra)}
            type='checkbox'
            label='AddTicket'
            />
            </Form>
            {exFileds}

            <Button onClick = {saveFormInfo}> Save </Button>
        </div>
        
    )
}





function extraFields(rooms){
    return(
        <Form>
            <Form.Group as={Row} controlId="validDays_input">
                <Form.Label column sm="2"> Valid days </Form.Label>
                <Col sm="10">
                    <Form.Control type='number' placeholder="1" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="numOfUsages_input">
                <Form.Label column sm="2"> Number of usages </Form.Label>
                <Col sm="10">
                    <Form.Control type='number'placeholder="1" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="numOfUsagesPerDay_input">
                <Form.Label column sm="2"> Number of usages per day </Form.Label>
                <Col sm="10">
                    <Form.Control type='number' placeholder="1" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="room_input">
                <Form.Label column sm="2"> Room </Form.Label>
                <Col>
                    <Form.Control as="select">
                       {rooms.map(room =>
                           <option key={room.id}> {room.name} </option>
                       )}
                    </Form.Control>
                </Col>
            </Form.Group>
        </Form>   
    )
}

export default NewClientComponent;