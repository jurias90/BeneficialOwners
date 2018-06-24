import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ownerName: "",
      percentage: 0,
      owners: [],
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
    if(this.state.ownerName == "" || this.state.percentage <= 0){
      this.state.isValid = false;
    } else{
      this.state.isValid = true;
    }
    if(id === "owner"){
        this.setState({ownerName:val});
    }else{
        this.setState({percentage: val});
    }
    }

  
  addOwner(){
          if(this.state.percentage > this.state.totalPercentage){
              alert("You can not own more then " + this.state.totalPercentage + "% of what's left of the company.")
      }else{
        let ownerList = this.state.owners;
        let ownerName = this.state.ownerName;
        let percent = this.state.percentage;
        ownerList.push((ownerName,percent));
        this.setState({totalPercentage: this.state.totalPercentage - this.state.percentage, owners: ownerList, ownerName: "", percentage: 0, isValid:false});
      }
    }
  deleteOwner(event){
    let ownerList = this.state.owners;
    let index = event.target.value;
    let percent = parseInt(ownerList[index][1]);
    ownerList.splice(index,1)
    this.setState({ownerList:ownerList, totalPercentage: this.state.totalPercentage + percent});


  }    

  
  
  render() {
    return (
            <div>
          <form>
 
            <div>
            <label for="owner" >Name of Owner:</label>
               <input type="text" value={this.state.ownerName} onChange={this.changeState} id="owner"  name= "owner" />          
          </div>
          <div>
                  <label for="percentage">Percentage Owned:(in whole numbers)</label>
                  <input type="number" value={this.state.percentage} onChange={this.changeState} id="percentage" name="percentage" />
          </div>
               
        </form>
        <button onClick={this.addOwner} onChange={this.changeState} disabled={!this.state.isValid}>Submit</button>
        <div>
                <h2>List of Owners</h2>
            <ul>
              <li>totalPercentage : {this.state.totalPercentage}</li>
              {this.state.owners}
              {Object.keys(this.state.owners).map( (owner, index) =>{
                return(
                  <li key={owner}>{owner}: {owner}% <button value={index} onClick={this.deleteOwner}>Delete</button></li>
                )
              })}
            </ul>
        </div>
      </div>
    )
  }
}





export default App;
