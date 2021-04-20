import React, { Component } from 'react';
import NewClientComponent from './newClientComponent';
import {Button} from 'react-bootstrap';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props);
    this.state = { loading : true , error:"", clients : [], showNewClientForm: false};

    //bindings
    this.toggleNewClientForm = this.toggleNewClientForm.bind(this);
  }

  componentDidMount(){
    this.requestUsers();
  }

  async requestUsers(){
    const response = await fetch('https://localhost:44312/api/Client/ListClients');
        if(!response.ok) this.setState({ error: "Failed to load clients", loading: false});
        else{
            let data = await response.json();
            this.setState({ clients: data, loading: false});
        }
  }

  toggleNewClientForm(){
    this.setState({newClientButton : !this.state.showNewClientForm});  
  }

  createUserTable(clients){
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>RegistrationDate</th>
            <th>CNP</th>
            <th>Address</th>
            <th>BarCode</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client =>
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.telephone}</td>
              <td>{client.registrationDate}</td>
              <td>{client.cnp}</td>
              <td>{client.address}</td>
              <td>{client.barCode}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  render () {
    let clientList = this.state.loading
      ? <p> Loading ... </p>
      : this.createUserTable(this.state.clients);

    let NewClientForm = NewClientComponent(this.state.showNewClientForm);

    return (
      <div>
        <h1> Fitness Data Center</h1>
        <div> 
          <Button onClick = {this.toggleNewClientForm}> New Client</Button>
          <Button> Add </Button>
        </div>

        {NewClientForm}
        
        <div>
          {clientList}
        </div>
        
      </div>
    );
  }
}


