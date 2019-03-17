import React, { Component } from 'react';
import Loginfield from "./Loginfield";
import Chat from "./Chat";
import './App.css';

//===================1. APP - BASE COMPONENT======================
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: "frontPage", //Sets the state of the page-state to the first page the user sees when entering the chat-application
      username: "", //When the user enters the chat-application the username-state is empty.
    }
  };
  //=========================1.1 CHANGE TO CHAT============================
  changeToChat = (e) => { //Is called upon when the user clicks the loginbutton on the frontPage.
    e.preventDefault(); //Pre-cancels the submission to the form
    if (this.state.username.length >= 1) { //Checks if the chosen username is longer than one character.
      this.setState({ //Sets the new page-state to chatPage, inciting the rendering of the chatPage.
      page: "chatPage" 
      })
    }
  };
  //=========================1.2. CHANGE TO LOGIN===========================
  changeToLogin = () => { //Is called upon when the user clicks the logoutbutton on the chatPage.
    this.setState ({ //Sets the new page-state to frontPage, inciting the rendering of the frontPage, while also clearing out the username.
      page: "frontPage", 
      username: ""
    })
  };
  //==========================1.3 ONLOGIN (SET THE USERNAME)=================================
  onLogin = (e) => { //Is called upon whenever the inputfield for the username is changed.
    this.setState({ //Sets the username to the current value of the inputfield, regardless whether the user is still or has finished typing.
      username: e.target.value
    })
  };
//==================1.4 RENDER DEPENDING ON THE STATE OF PAGE=================
  render() {
    if (this.state.page === "frontPage") { //Checks the state of the page and if frontPage, renders the frontPage.
      return (
        <div className="chat-client">  {/* Main-div to contain all the other components */}
          <div className="chat-client__header"> {/* Header of the chat-client */}
            <p className="chat-client__header__title">Chatclient</p>
          </div> 
          <Loginfield username={this.state.username} onChange={this.onLogin} onSubmit={this.changeToChat}/> {/* Loginfield from Loginfield.js */}
        </div>
      )
    } 
    else if (this.state.page === "chatPage") { //Checks the state of the page and if chatPage, renders the chatPage.
      return (
        <div className="chat-client"> {/* Main-div to contain all the other components */}
          <div className="chat-client__header"> {/* Header of the chat-client */}
            <p className="chat-client__header__title">Chatclient</p>
            <button 
            className="chat-client__header__logout" 
            onClick={this.changeToLogin}>
            X
            </button>
          </div> 
          <Chat username={this.state.username}/> {/* chatPage of the chat-client */}
        </div>
      )
    }
  }
}

export default App;
