import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ownerName: "",
      percentage: 0,
      owners: {},
      isValid: false,
      totalPercentage: 100
    }
    
    this.changeState = this.changeState.bind(this);
    this.addOwner = this.addOwner.bind(this);
    this.deleteOwner = this.deleteOwner.bind(this);

 
  }
  
    changeState(event){
    let val = event.target.value;
    let id = event.target.id;
    if(this.state.ownerName === "" || this.state.percentage <= 0){
      this.state.isValid = false;
    } else{
      this.state.isValid = true;
    }
    if(id === "owner"){
        if(val.length < 3){
          this.state
        }
        this.setState({ownerName:val});
    }else{
        this.setState({percentage: val});
    }
    }

  
  addOwner(){
    let ownerName = this.state.ownerName;
          if(this.state.percentage > this.state.totalPercentage){
              alert("You can not own more then " + this.state.totalPercentage + "% of what's left of the company.")
      }else if(ownerName in this.state.owners){
          alert(ownerName + " already is an owner.");
      }
      else{
        let ownerList = this.state.owners;
        
        let percent = this.state.percentage;
        ownerList[ownerName] = percent;
        this.setState({totalPercentage: this.state.totalPercentage - this.state.percentage, owners: ownerList, ownerName: "", percentage: 0, isValid:false});
      }
    }
  deleteOwner(event){
    let ownerList = this.state.owners;
    let name = event.target.value;
    let percent = parseInt(ownerList[name]);
    delete ownerList[name];
    this.setState({ownerList:ownerList, totalPercentage: this.state.totalPercentage + percent});


  }    

  
  
  render() {
    return (
      <div id="body">
        <h1 className="title">Welcome to (insert company name here)</h1>
        <h3>Please join us as a beneficiary owner!</h3>
        <form>
          <div>
            <label className="labels" for="owner" >Name of Owner:</label>
            <input type="text" value={this.state.ownerName} onChange={this.changeState} id="owner"  name= "owner" />          
          </div>
          <div>
            <label className="labels" for="percentage">Percentage Owned:</label>
              <input type="number" value={this.state.percentage} onChange={this.changeState} id="percentage" name="percentage" />%
          </div>
          <button type="button" className="buttons" onClick={this.addOwner} onChange={this.changeState} disabled={!this.state.isValid}>Submit</button>
        </form>
        
        <div>
          <h2>List of Owners</h2>
          <ul className="ownerList">
            <li>Percentage of Company Left : {this.state.totalPercentage}%</li>
            {Object.keys(this.state.owners).map( (owner) =>{
              return(
                <li key={owner}>{owner}: {this.state.owners[owner]}% <button className="buttons" value={owner} onClick={this.deleteOwner}>Delete</button></li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}




export default App;
