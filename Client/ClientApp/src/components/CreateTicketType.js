import React, {Component} from 'react'
import {Form} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export class CreateTicketType extends Component{
    static displayName = CreateTicketType.name;

    constructor(props) {
        super(props);

        this.formInfo ={
            TicketName : "",
            RoomId : "",
            RoomName : "",
            Price : 0,
            ValidDays : 0,
            MaxUsages : 0,
            UsagesPerDay : 0
        };

        this.inputsAreValid = this.inputsAreValid.bind(this);

        this.state = { rooms : []};

        this.requestRooms = async () =>{
            const response = await fetch('https://localhost:44312/api/Room/ListRooms');
            if(response.ok) {
                let data = await response.json();
                this.setState({rooms: data});
            }
        }

        this.saveTicketType = async () =>{
            console.log(this.formInfo);
    
            if (this.inputsAreValid()){
    
                let response = await fetch('https://localhost:44312/api/Ticket/CreateTicketType',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.formInfo)
                    });
                    
                if (response.ok){
                    alert("Save succesfull!");
                }
                else{
                    alert("Save failed!");
                }   
            }
            else{
                alert("Invalid fields!");
            }
            
        }
      }

      
    inputsAreValid(){
        let keys = Object.keys(this.formInfo);
    
        for (let i = 0; i < keys.length; i++){
            if (this.formInfo[keys[i]] === ""){
                return false;
            } 
        }
    
        return true;
    }

      render(){

          this.requestRooms();
          return(
              <div>
                <h2>Create Ticket Type</h2> 
                <br></br>
                <Form>
                    <Form.Group as={Row} controlId="ticketName_input">
                        <Form.Label column sm="2"> Ticket Name </Form.Label>
                        <Col sm="10">
                            <Form.Control type='text' placeholder="Ticket name" 
                            onChange = { event =>{
                                this.formInfo.TicketName = event.target.value
                            }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="room_input">
                        <Form.Label column sm="2"> Room </Form.Label>
                        <Col>
                            <Form.Control as="select"
                            onChange = { event =>{
                                this.formInfo.RoomId = event.target.options[event.target.selectedIndex].id;
                                this.formInfo.RoomName = event.target.value;
                            }}
                            >
                                <option></option>
                            {this.state.rooms.map(room =>
                                <option key={room.id} id={room.id}> {room.name} </option>
                            )}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="price_input">
                        <Form.Label column sm="2"> Price </Form.Label>
                        <Col sm="10">
                            <Form.Control type='number'
                            placeholder="0"
                            onChange = { event =>{
                                this.formInfo.Price =  event.target.value;
                            }} />
                        </Col>
                    </Form.Group>

                    
                    <Form.Group as={Row} controlId="validDays_input">
                        <Form.Label column sm="2"> Valid Days </Form.Label>
                        <Col sm="10">
                            <Form.Control type='number'placeholder="1"
                            onChange = { event =>{
                                this.formInfo.ValidDays = event.target.value;
                            }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="maxUsages_input">
                        <Form.Label column sm="2"> Max usages </Form.Label>
                        <Col sm="10">
                            <Form.Control type='number'placeholder="1"
                            onChange = { event =>{
                                this.formInfo.MaxUsages = event.target.value;
                            }}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="usagesPerDay_input">
                        <Form.Label column sm="2"> Usages per day </Form.Label>
                        <Col sm="10">
                            <Form.Control type='number' placeholder="1"
                            onChange = { event =>{
                                this.formInfo.UsagesPerDay = event.target.value;
                            }} />
                        </Col>
                    </Form.Group>
                </Form>   

                <Button onClick={this.saveTicketType}>Save</Button>
              </div>
          )
      }
    
}