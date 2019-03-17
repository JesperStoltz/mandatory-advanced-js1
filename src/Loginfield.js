import React, { Component } from 'react';
import './Loginfield.css';

//============2. LOGIN================
class Loginfield extends Component {
    render(){
        return (
            <div className="chat-client__login-container"> {/* Container for the entire Login */}
                <form className="chat-client__login-container__loginForm" onSubmit={this.props.onSubmit}> {/* The form-container for the entire login to use onSubmit. */}
                    <h3 className="chat-client__login-container__title">Please input your username</h3> {/* The title to instruct the user */}
                    <input // The inputfield where the user types in his or her username 
                        type="text"
                        className="chat-client__login-container__loginForm__input"
                        minLength="1" //The minimum allowed length of the username. Doesn't work, set right by 1.1. in App.js. Find out why.
                        maxLength="12" //The maximum allowed length of username. Works. Could be checked in 1.1. Beneficial?
                        pattern="[-_ a-zA-Z0-9]+$" //Pattern allowed for the username. Could be checked in 1.1. Beneficial?
                        onChange = {this.props.onChange} //Sets the onChange to the onChange decided in App.js 
                    />
                    <button className="chat-client__login-container__loginButton"> {/* Button serving as a submitButton */}
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default Loginfield;