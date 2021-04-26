import React, { useEffect, useState}  from 'react';
import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

let formInfo = {
    client :{
        Name: "",
        Email: "",
        Telephone: "",
        Address:"",
        CNP:""
    },
    ticket : {
        Price : 50,
        ValidDays: 0,
        MaxUsages : 0,
        UsesPerDay: 0,
        RoomId : 0,
        ValidUntil :""
    }
};

let addTicket = false;

function NewClientComponent(props){

    const [showExtra, toggle] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(false);
    const [reloadUsers, reloadRequest] = useState(false);
    
    
    useEffect( () =>{
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

    async function saveFormInfo(){
        console.log(formInfo);
    
        if (inputsAreValid()){
            if (!showExtra){
                let response = await fetch('https://localhost:44312/api/Client/RegisterClient', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formInfo['client'])
                });
        
                if (!response.ok){
                    alert("Error: Couldn't save client info!");
                    return;
                }
            }
           
            
            if (showExtra){
                let response = await fetch('https://localhost:44312/api/Client/RegisterClientWithTicket',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formInfo)
                });
        
                if (!response.ok){
                    alert("Error: Coulnd't save ticket info!");
                    console.log(response.body);
                    return;
                }
            }
           
        }    
        else{
            alert("Invalid fields!");
        }
    
        props.requestUsers();    
    }
    

    let exFileds;
    if (showExtra) exFileds = extraFields(rooms, formInfo);

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
            onClick={ () => {
                toggle(!showExtra);
                addTicket = !addTicket;
            }
            }
            type='checkbox'
            label='AddTicket'
            />
            </Form>
            {exFileds}

            <Button onClick = {saveFormInfo}> Save </Button>
        </div>
        
    )
}



function inputsAreValid(){
    let keys = Object.keys(formInfo['client']);

    for (let i = 0; i < keys.length; i++){
        if (formInfo['client'][keys[i]] === ""){
            return false;
        } 
    }

    if (addTicket){
        keys = Object.keys(formInfo['ticket']);
        for (let i = 0; i < keys.length; i++){
            if (formInfo['ticket'][keys[i]] === ""){
                return false;
            }
        }
    }

    return true;
}


function extraFields(rooms,formInfo){
    return(
        <Form>
            <Form.Group as={Row} controlId="validDays_input">
                <Form.Label column sm="2"> Valid days </Form.Label>
                <Col sm="10">
                    <Form.Control type='number' placeholder="1" 
                     onChange = { event =>{
                        formInfo.ticket.ValidDays = event.target.value
                     }}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="numOfUsages_input">
                <Form.Label column sm="2"> Max usages </Form.Label>
                <Col sm="10">
                    <Form.Control type='number'placeholder="1"
                     onChange = { event =>{
                        formInfo.ticket.MaxUsages = event.target.value
                     }}
                      />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="numOfUsagesPerDay_input">
                <Form.Label column sm="2"> Number of usages per day </Form.Label>
                <Col sm="10">
                    <Form.Control type='number' placeholder="1"
                     onChange = { event =>{
                        formInfo.ticket.UsesPerDay = event.target.value
                     }} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="room_input">
                <Form.Label column sm="2"> Room </Form.Label>
                <Col>
                    <Form.Control as="select"
                     onChange = { event =>{
                        formInfo.ticket.RoomId = event.target.options[event.target.selectedIndex].id
                     }}
                    >
                        <option></option>
                       {rooms.map(room =>
                           <option key={room.id} id={room.id}> {room.name} </option>
                       )}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="numOfUsagesPerDay_input">
                <Form.Label column sm="2"> Valid until </Form.Label>
                <Col sm="10">
                    <Form.Control type='date'
                     onChange = { event =>{
                        formInfo.ticket.ValidUntil =  new Date(event.target.value + 'T00:00');
                     }} />
                </Col>
            </Form.Group>
        </Form>   
    )
}

function dateToDateTime(value){
    let date = Date.parse(value);
    var day = date.getDate();       
    var month = date.getMonth() + 1;  
    var year = date.getFullYear(); 
    var hour = date.getHours();   
    var minute = date.getMinutes(); 
    var second = date.getSeconds(); 

    var time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second; 
}

export default NewClientComponent;