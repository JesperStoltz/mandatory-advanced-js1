import React, { Component } from 'react'
import Linkify from "react-linkify";
import Emoji from 'react-emojione';
import "./Message.css"



class Message extends Component {

    render() {
        let chatroom = this.props.users.map(message => {
            return (
                <div className="chat-client__chatroom-container__messageKey" key={message.id} > 
                    <p className="chat-client__chatroom-container__messageUser">{message.username}</p>
                    <p className="chat-client__chatroom-container__messageContent">
                    <Linkify>
                    <Emoji>{message.content}</Emoji>
                    </Linkify>
                    </p>
                </div>
            )
        })
        return (
            <>
                {chatroom}
            </>
        )
    }
}

export default Message;