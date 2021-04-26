import React, { Component } from 'react';
import NewClientComponent from './NewClientComponent';
import SearchComponent from './SearchComponent';
import {Button} from 'react-bootstrap';
import './styles.css';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props);
    this.state = { loading : true , error:"", clients : [], showNewClientForm: false};

    //bindings
    this.toggleNewClientForm = this.toggleNewClientForm.bind(this);
    this.requestUsers = this.requestUsers.bind(this);
    this.saveToXlsx = this.saveToXlsx.bind(this);
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
    this.setState({showNewClientForm : !this.state.showNewClientForm});  
  }

  saveToXlsx(){
    const fileName = "export";
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(this.state.clients);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  createUserTable(clients){
    return (
      <div>
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
      <Button onClick={this.saveToXlsx}>Save to xlsx</Button>
      </div>
      
    )
  }

  render () {
    let clientList = this.state.loading
      ? <p> Loading ... </p>
      : this.createUserTable(this.state.clients);

    

    return (
      <div>
        <h1 align="center"> Fitness Data Center</h1>
        <br></br>
        <SearchComponent id="searchComponent"/>

        <br></br><br></br>
        <div> 
          <Button onClick = {this.toggleNewClientForm}> New Client</Button>
        </div>
        <NewClientComponent show={this.state.showNewClientForm} requestUsers={this.requestUsers} />
        
        <div>
          {clientList}
        </div>
      </div>
    );
  }
}


