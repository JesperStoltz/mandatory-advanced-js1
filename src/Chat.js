import React, { Component } from 'react';
import io from "socket.io-client"
import Message from "./Message";
import './Chat.css';

//================3. CHAT CHATROOM/CHATMESSAGES ===============

class Chat extends Component {

    constructor(props){
        super(props);
        this.state = {
            messages: "", //state to contain the message being sent from the client
            chatroom: [] //The usernames and messages sent to the chatroom
        }
        this.socket = io("http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000/"); //Sets the socket to the correct server.
    }
    componentDidMount(){ //Activates once the component has been rendered.
        this.socket.on("messages", this.chatRoomSetup); //When calling upon the messages of the socket, it runs the function that pushes them to the chatroom.
        this.socket.on("new_message", this.addNewMessage) //When a new message comes along, the function that pushes it into the pre-existing chatroom-array is run.
    }
    componentDidUpdate(){
        this.scrollBottom()
    }
    componentWillUnmount(){  //When the component is unrendered the socket is cleared. Might be unnessecary/degradary when there's only one socket-connection planned? 
        this.socket = null 
    }
    scrollBottom = () => {
        let element = document.querySelector(".chat-client__chatroom-container");
        element.scrollTop = element.scrollHeight;
    } 
    chatRoomSetup = (messages) =>{ //Pushes all the current-existing messages into the array "chatroom".
        this.setState({
            chatroom: messages
        })
    }
    addNewMessage = (newMessage) =>{ //Adds the new message to the array "chatroom" with a spread a spread.
        this.setState({
            chatroom: [...this.state.chatroom, newMessage] //Spread. Pushes the second argument into the first argument-array, after the content in the first argument-array.
        })
    }
    setMessage = (e) => { //Turns the current message into what is currently typed into the inputform. Is live-updated and pushed to the array first when Send is pressed.
        this.setState({
            messages: e.target.value,
        })
        
    }
    sendMessage = (e) => { 
        e.preventDefault();
        this.socket.emit("message", {
            username: this.props.username,
            content: this.state.messages
        }, (response => {
            this.addNewMessage(response.data.newMessage) 
        }));
        this.setState({messages: ""})
    }
    render(){
        return (
            <>
            <div className="chat-client__chatroom-container">
                <Message message={this.state.messages} users={this.state.chatroom} />
            </div>
            <div className="chat-client__chatroom-container__form">
                <form onSubmit={this.sendMessage}>
                <input
                    type="text"
                    className="chat-client__chatroom-container__input"
                    minLength="1"
                    maxLength="200"
                    placeholder="Type your message"
                    value={this.state.messages}
                    onChange={this.setMessage}
                    />
                    <button className="chat-client__chatroom-container__sendButton">Send</button>
                </form>
            </div>
            </>
        )
    }
}

export default Chat;